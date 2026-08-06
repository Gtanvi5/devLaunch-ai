import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import crypto from "crypto";

export const maxDuration = 60;

function hashKey(key: string) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is misconfigured: Missing GEMINI_API_KEY" },
        { status: 500 },
      );
    }

    let userId: string | null = null;
    const authHeader = req.headers.get("authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const hashedToken = hashKey(token);

      const apiKeyRecord = await prisma.apiKey.findUnique({
        where: { hashedKey: hashedToken },
      });

      if (apiKeyRecord) {
        userId = apiKeyRecord.userId;

        prisma.apiKey
          .update({
            where: { id: apiKeyRecord.id },
            data: { lastUsed: new Date() },
          })
          .catch((err) => console.error("Failed to update lastUsed", err));
      } else {
        return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });
      }
    }

    if (!userId) {
      const clerkAuth = await auth();
      userId = clerkAuth.userId;
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      const clerkUser = await currentUser();
      const email = clerkUser?.emailAddresses[0]?.emailAddress;

      if (!email) {
        return NextResponse.json(
          { error: "Email required for account creation" },
          { status: 400 },
        );
      }

      try {
        user = await prisma.user.create({
          data: {
            id: userId,
            email: email,
            credits: 10,
          },
        });
      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002"
        ) {
          user = await prisma.user.findUnique({
            where: { id: userId },
          });
        } else {
          throw e;
        }
      }
    }

    let body: { prompt?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { prompt } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "A valid prompt is required" },
        { status: 400 },
      );
    }

    try {
      await prisma.user.update({
        where: {
          id: userId,
          credits: { gte: 1 },
        },
        data: {
          credits: { decrement: 1 },
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2025"
      ) {
        return NextResponse.json(
          { error: "Insufficient credits. Please upgrade your plan." },
          { status: 403 },
        );
      }
      throw e;
    }

    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
        systemInstruction:
          "You are an elite VC and startup analyst. Validate the startup idea provided by the user with rigorous, objective data.",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: SchemaType.OBJECT,
            properties: {
              title: { type: SchemaType.STRING },
              score: { type: SchemaType.INTEGER },
              executiveSummary: {
                type: SchemaType.OBJECT,
                properties: {
                  viabilityVerdict: { type: SchemaType.STRING },
                  targetAudience: { type: SchemaType.STRING },
                  estArr: { type: SchemaType.STRING },
                  strengths: {
                    type: SchemaType.ARRAY,
                    items: { type: SchemaType.STRING },
                  },
                  risks: {
                    type: SchemaType.ARRAY,
                    items: { type: SchemaType.STRING },
                  },
                  aiRecommendation: { type: SchemaType.STRING },
                },
                required: [
                  "viabilityVerdict",
                  "targetAudience",
                  "estArr",
                  "strengths",
                  "risks",
                  "aiRecommendation",
                ],
              },
              marketAnalysis: {
                type: SchemaType.OBJECT,
                properties: {
                  tamDescription: { type: SchemaType.STRING },
                },
                required: ["tamDescription"],
              },
            },
            required: ["title", "score", "executiveSummary", "marketAnalysis"],
          },
        },
      });

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      if (!responseText) throw new Error("Empty response from AI");

      let reportData;
      try {
        reportData = JSON.parse(responseText.trim());
      } catch (parseError) {
        throw new Error("AI returned malformed data structure.");
      }

      const savedReport = await prisma.report.create({
        data: {
          userId: userId,
          prompt: prompt,
          title: reportData.title || prompt.substring(0, 50) + "...",
          score: reportData.score,
          status: "COMPLETED",
          executiveSummary: reportData.executiveSummary,
          marketAnalysis: reportData.marketAnalysis,
        },
      });

      return NextResponse.json({ report: savedReport }, { status: 200 });
    } catch (generationError) {
      await prisma.user.update({
        where: { id: userId },
        data: { credits: { increment: 1 } },
      });

      console.error("Generation Error:", generationError);
      return NextResponse.json(
        { error: "Failed to generate report. Credit refunded." },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ReportSchema } from "@/lib/schemas";
import crypto from "crypto";

export const maxDuration = 60;

function hashKey(key: string) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    let finalUserId = userId;

    if (!finalUserId) {
      const authHeader = req.headers.get("Authorization");
      if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        const hashedIncomingToken = hashKey(token);

        const apiKeyRecord = await prisma.apiKey.findUnique({
          where: { hashedKey: hashedIncomingToken },
        });

        if (apiKeyRecord) {
          finalUserId = apiKeyRecord.userId;

          prisma.apiKey
            .update({
              where: { id: apiKeyRecord.id },
              data: { lastUsed: new Date() },
            })
            .catch((err) => console.error("Failed to update lastUsed:", err));
        }
      }
    }

    if (!finalUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: { idea?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 },
      );
    }

    const { idea } = body;

    if (!idea || typeof idea !== "string" || idea.trim().length < 10) {
      return NextResponse.json(
        { error: "Idea is required and must be at least 10 characters." },
        { status: 400 },
      );
    }

    const creditDeduction = await prisma.user.updateMany({
      where: { id: finalUserId, credits: { gte: 1 } },
      data: { credits: { decrement: 1 } },
    });

    if (creditDeduction.count === 0) {
      return NextResponse.json(
        {
          error:
            "Insufficient credits. Please upgrade your plan to generate more reports.",
        },
        { status: 403 },
      );
    }

    try {
      const { object: aiData } = await generateObject({
        model: google("gemini-2.0-flash"),
        system:
          "You are an expert venture capitalist AI evaluating tech pitches. Provide a realistic analysis focusing on market size, competitor threats, and a comprehensive SWOT breakdown.",
        prompt: `Evaluate this pitch: "${idea.trim()}"`,
        schema: ReportSchema,
      });

      const generatedTitle =
        (aiData as { title?: string }).title ||
        (idea.trim().length > 50
          ? `${idea.trim().slice(0, 47)}...`
          : idea.trim());

      const savedReport = await prisma.report.create({
        data: {
          userId: finalUserId,
          title: generatedTitle,
          prompt: idea.trim(),
          score: aiData.score,
          marketAnalysis: aiData,
          status: "COMPLETED",
        },
      });

      return NextResponse.json(savedReport);
    } catch (aiError) {
      await prisma.user.update({
        where: { id: finalUserId },
        data: { credits: { increment: 1 } },
      });

      console.error("AI Generation Failed, credit refunded:", aiError);
      return NextResponse.json(
        { error: "Failed to generate report analysis. Credit refunded." },
        { status: 500 },
      );
    }
  } catch (error: unknown) {
    console.error("AI Analysis Error:", error);

    return NextResponse.json(
      { error: "Failed to process request." },
      { status: 500 },
    );
  }
}

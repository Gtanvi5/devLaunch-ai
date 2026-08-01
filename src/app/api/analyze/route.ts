import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ReportSchema } from "@/lib/schemas";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    let finalUserId = userId;

    if (!finalUserId) {
      const authHeader = req.headers.get("Authorization");
      if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        const apiKeyRecord = await prisma.apiKey.findUnique({
          where: { key: token },
        });

        if (apiKeyRecord) {
          finalUserId = apiKeyRecord.userId;

          await prisma.apiKey.update({
            where: { id: apiKeyRecord.id },
            data: { lastUsed: new Date() },
          });
        }
      }
    }

    if (!finalUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { idea } = body;

    if (!idea || typeof idea !== "string" || idea.trim().length < 10) {
      return NextResponse.json(
        { error: "Idea is required and must be at least 10 characters." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: finalUserId },
      select: { credits: true },
    });
    if (!user || user.credits < 1) {
      return NextResponse.json(
        {
          error:
            "Insufficient credits. Please upgrade to generate more reports.",
        },
        { status: 403 },
      );
    }

    const { object: aiData } = await generateObject({
      model: google("gemini-2.0-flash"),
      system:
        "You are an expert venture capitalist AI evaluating hardware and software tech pitches. Provide a brutal, highly realistic analysis focusing on market size, competitor threats, and a comprehensive SWOT breakdown.",
      prompt: `Evaluate this pitch: "${idea.trim()}"`,
      schema: ReportSchema,
    });

    const [savedReport] = await prisma.$transaction(async (tx) => {
      const updated = await tx.user.updateMany({
        where: { id: finalUserId, credits: { gte: 1 } },
        data: { credits: { decrement: 1 } },
      });

      if (updated.count === 0) throw new Error("INSUFFICIENT_CREDITS");

      const report = await tx.report.create({
        data: {
          userId: finalUserId,
          prompt: idea.trim(),
          score: aiData.score,
          marketSize: aiData.marketSize,
          competitorRisk: aiData.competitorRisk,
          swot: aiData.swot,
          status: "COMPLETED",
        },
      });

      return [updated, report];
    });

    return NextResponse.json(savedReport);
  } catch (error: unknown) {
    console.error("AI Analysis Error:", error);

    if (error instanceof Error && error.message === "INSUFFICIENT_CREDITS") {
      return NextResponse.json(
        { error: "Insufficient credits." },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { error: "Failed to analyze idea." },
      { status: 500 },
    );
  }
}

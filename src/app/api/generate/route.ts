import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Find or create the user in our database
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { id: userId, credits: 10 },
      });
    }

    // 2. Check if they have enough credits
    if (user.credits <= 0) {
      return NextResponse.json(
        { error: "Insufficient credits. Please upgrade your plan." },
        { status: 403 }, // 403 Forbidden
      );
    }

    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    // 3. Generate the report
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are an elite VC and startup analyst. Validate the startup idea provided by the user.
      You MUST return your response in purely valid JSON format based on the following structure:
      {
        "score": 85,
        "executiveSummary": {
          "viabilityVerdict": "Highly Viable",
          "targetAudience": "Indie hackers and SaaS founders",
          "estArr": "$1M - $5M",
          "strengths": ["strength 1", "strength 2", "strength 3"],
          "risks": ["risk 1", "risk 2", "risk 3"],
          "aiRecommendation": "A 3-4 sentence strategic recommendation."
        },
        "marketAnalysis": {
          "tamDescription": "A paragraph explaining the Total Addressable Market."
        }
      }`,
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent(prompt);
    const reportData = JSON.parse(result.response.text());

    // 4. Save the report AND deduct a credit in a single transaction
    const [savedReport] = await prisma.$transaction([
      prisma.report.create({
        data: {
          userId: userId,
          prompt: prompt,
          score: reportData.score,
          executiveSummary: reportData.executiveSummary,
          marketAnalysis: reportData.marketAnalysis,
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { credits: user.credits - 1 },
      }),
    ]);

    return NextResponse.json({ report: savedReport }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate report. Please try again later." },
      { status: 500 },
    );
  }
}

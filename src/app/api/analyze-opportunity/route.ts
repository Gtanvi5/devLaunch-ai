import { NextResponse } from "next/server";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: { prompt?: string; price?: number; breadth?: number };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 },
      );
    }

    const { prompt: industry, price, breadth } = body;

    if (
      !industry ||
      typeof industry !== "string" ||
      typeof price !== "number" ||
      typeof breadth !== "number" ||
      price < 0 ||
      price > 100 ||
      breadth < 0 ||
      breadth > 100
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid input. Industry string, price (0-100), and breadth (0-100) are required.",
        },
        { status: 400 },
      );
    }

    const creditDeduction = await prisma.user.updateMany({
      where: { id: userId, credits: { gte: 1 } },
      data: { credits: { decrement: 1 } },
    });

    if (creditDeduction.count === 0) {
      return NextResponse.json(
        { error: "Insufficient credits. Please upgrade your plan." },
        { status: 403 },
      );
    }

    const result = await streamText({
      model: google("gemini-2.0-flash"),
      system:
        "You are a sharp, insightful startup strategist. Your job is to describe a hypothetical product that perfectly fits a specific gap in the market.",
      prompt: `Analyze the market gap for the "${industry}" industry. 
      
The gap is located at:
- Price Score: ${price}/100 (where 0 is free, 100 is ultra-luxury enterprise)
- Breadth Score: ${breadth}/100 (where 0 is hyper-niche, 100 is an everything-platform)

Write a short, punchy 2-sentence paragraph describing exactly what kind of product would fit in this white space and who the target customer is. Do not use filler introductions.`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Opportunity Analysis Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze opportunity." },
      { status: 500 },
    );
  }
}

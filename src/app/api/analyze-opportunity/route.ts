import { NextResponse } from "next/server";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { prompt: industry, price, breadth } = await req.json();

    if (!industry || price === undefined || breadth === undefined) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
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

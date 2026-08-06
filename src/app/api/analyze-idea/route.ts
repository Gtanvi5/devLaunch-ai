import { NextResponse } from "next/server";
import { streamObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: { industry?: string; region?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 },
      );
    }

    const { industry, region = "Global" } = body;

    if (!industry || typeof industry !== "string" || industry.length < 3) {
      return NextResponse.json(
        { error: "Invalid industry provided." },
        { status: 400 },
      );
    }

    const creditDeduction = await prisma.user.updateMany({
      where: { id: userId, credits: { gte: 1 } },
      data: { credits: { decrement: 1 } },
    });

    if (creditDeduction.count === 0) {
      return NextResponse.json(
        {
          error: "Insufficient credits. Please upgrade your plan.",
        },
        { status: 403 },
      );
    }

    const result = await streamObject({
      model: google("gemini-2.0-flash"),
      system: `You are an expert market analyst and product strategist. Your task is to analyze a given market and plot 4 to 7 key competitors on a 2D market matrix based on two axes: Price and Breadth.

You do not guess numbers randomly. You strictly evaluate each competitor against the rubrics below.

### AXIS 1: PRICE (0 to 100)
- 1-20: Free / Ad-Supported / Ultra-Budget.
- 21-40: Economy / Mass Market. Competes heavily on undercutting competitors.
- 41-60: Mid-Market / Standard. The typical baseline cost for a professional solution.
- 61-85: Premium. Commands a significant markup for brand or superior quality.
- 86-100: Ultra-Luxury / Enterprise. Price is an intentional barrier to entry.

### AXIS 2: BREADTH (0 to 100)
- 1-20: Hyper-Niche / Single-Purpose. Does exactly one thing for a highly specific user.
- 21-40: Focused. A suite of tools for a specific vertical.
- 41-60: Standard / Departmental. Solves a broad problem but has clear boundaries.
- 61-85: Horizontal Platform. Used across varied industries.
- 86-100: Universal / Ecosystem. An "everything app" or foundational infrastructure.

### INSTRUCTIONS
For EACH competitor, you must think step-by-step in this exact order:
1. Provide the priceReasoning (a 1-sentence mapping to the price rubric).
2. Assign the priceScore.
3. Provide the breadthReasoning (a 1-sentence mapping to the breadth rubric).
4. Assign the breadthScore.
5. Assign a distinct hex color code (e.g., '#3B82F6') for the competitor. Do not repeat colors.`,
      schema: z.object({
        competitors: z
          .array(
            z.object({
              id: z.string(),
              name: z.string(),
              priceReasoning: z.string(),
              priceScore: z.number().min(1).max(100),
              breadthReasoning: z.string(),
              breadthScore: z.number().min(1).max(100),
              color: z.string(),
            }),
          )
          .min(4)
          .max(7),
      }),
      prompt: `Analyze the competitive landscape for: "${industry}" in the "${region}" market. Identify the most significant market players and map them on the matrix according to the strict rubrics.`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json(
      { error: "Failed to map the competitive landscape." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export const maxDuration = 60;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { idea } = body;

    if (!idea) {
      return NextResponse.json({ error: "Idea is required" }, { status: 400 });
    }


    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
      systemInstruction:
        "You are an expert venture capitalist AI. Analyze the startup idea.",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            score: {
              type: SchemaType.INTEGER,
              description: "Market viability between 0 and 100",
            },
            marketSize: {
              type: SchemaType.STRING,
              description: "Realistic estimate, e.g., $5.2B",
            },
            competitorRisk: {
              type: SchemaType.STRING,
              format: "enum",
              enum: ["Low", "Medium", "High"],
            },
            swot: {
              type: SchemaType.OBJECT,
              properties: {
                strengths: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                },
                weaknesses: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                },
                opportunities: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                },
                threats: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                },
              },
              required: ["strengths", "weaknesses", "opportunities", "threats"],
            },
          },
          required: ["score", "marketSize", "competitorRisk", "swot"],
        },
      },
    });

    const prompt = `Idea to analyze: "${idea}"`;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    if (!responseText) throw new Error("Empty response from AI");

    const aiData = JSON.parse(responseText);

    aiData.id = "val_" + Math.random().toString(36).substring(7);

    return NextResponse.json(aiData);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze idea. Please try again." },
      { status: 500 },
    );
  }
}

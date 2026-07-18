import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Gen AI SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    // We use gemini-1.5-flash because it's incredibly fast and perfect for this task
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // The system prompt forces Gemini to return structured JSON
    const systemInstruction = `
      You are an elite VC and startup analyst. Validate the following startup idea.
      You MUST return your response in purely valid JSON format. Do not include markdown formatting like \`\`\`json.
      
      Structure the JSON exactly like this:
      {
        "score": number (0-100),
        "executiveSummary": {
          "viabilityVerdict": "Short phrase",
          "targetAudience": "Short phrase",
          "estArr": "Short phrase with $ amount",
          "strengths": ["strength 1", "strength 2", "strength 3"],
          "risks": ["risk 1", "risk 2", "risk 3"],
          "aiRecommendation": "A 3-4 sentence strategic recommendation."
        },
        "marketAnalysis": {
          "tamDescription": "A paragraph explaining the Total Addressable Market."
        }
      }
    `;

    const fullPrompt = `${systemInstruction}\n\nStartup Idea to analyze:\n"${prompt}"`;

    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();

    // Clean up the string in case Gemini wraps it in markdown code blocks
    const cleanedText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const reportData = JSON.parse(cleanedText);

    return NextResponse.json({ report: reportData }, { status: 200 });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 },
    );
  }
}

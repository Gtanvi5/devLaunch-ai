import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { idea } = body;

    if (!idea) {
      return NextResponse.json({ error: "Idea is required" }, { status: 400 });
    }

    // We use Gemini 1.5 Flash - it is insanely fast and free
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // The Prompt Engine: We explicitly demand strict JSON
    const prompt = `
      You are an expert venture capitalist AI. Analyze the following startup idea. 
      Return ONLY a valid JSON object with strictly these keys. Do not include markdown formatting, backticks, or extra text: 
      {
        "score": (number between 0 and 100 representing market viability),
        "marketSize": (string, realistic estimate, e.g., "$5.2B"),
        "competitorRisk": (string: "Low", "Medium", or "High"),
        "swot": {
          "strengths": [3 short bullet points as strings],
          "weaknesses": [3 short bullet points as strings],
          "opportunities": [3 short bullet points as strings],
          "threats": [3 short bullet points as strings]
        }
      }
      
      Idea to analyze: "${idea}"
    `;

    // Fetch the response from Gemini
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Safety check: Clean up the response just in case the AI wraps it in markdown blocks
    const cleanedText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Parse the AI's text into a real JavaScript object
    const aiData = JSON.parse(cleanedText);

    // Attach a random ID so the frontend can route to /dashboard/report/[id]
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

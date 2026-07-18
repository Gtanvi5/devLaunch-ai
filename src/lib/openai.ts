// src/lib/openai.ts
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the exact shape of the AI response using Zod
export const StartupReportSchema = z.object({
  swotAnalysis: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    opportunities: z.array(z.string()),
    threats: z.array(z.string()),
  }),
  competitors: z.array(
    z.object({
      name: z.string(),
      advantage: z.string(),
      weakness: z.string(),
    }),
  ),
  revenuePrediction: z.array(
    z.object({
      year: z.number(),
      conservative: z.number(),
      optimistic: z.number(),
    }),
  ),
});

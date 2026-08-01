import { z } from "zod";

export const SwotSchema = z.object({
  strengths: z
    .array(z.string())
    .describe(
      "2 to 4 key internal strengths of the idea. Keep them punchy and actionable.",
    ),
  weaknesses: z
    .array(z.string())
    .describe(
      "2 to 4 critical internal weaknesses or technical/operational hurdles.",
    ),
  opportunities: z
    .array(z.string())
    .describe(
      "2 to 4 external market opportunities, trends, or gaps this idea exploits.",
    ),
  threats: z
    .array(z.string())
    .describe(
      "2 to 4 external threats, such as specific competitors, regulations, or market shifts.",
    ),
});

export const ReportSchema = z.object({
  score: z
    .number()
    .int()
    .min(0)
    .max(100)
    .describe(
      "Market viability score between 0 and 100. Be realistic and critical.",
    ),
  marketSize: z
    .string()
    .describe(
      "Estimated Total Addressable Market (TAM) formatted nicely, e.g., '$5.2 Billion' or '$800 Million'.",
    ),
  competitorRisk: z
    .enum(["Low", "Medium", "High", "Extreme"])
    .describe(
      "Level of threat from existing market players. Use 'Extreme' for highly monopolized markets.",
    ),
  swot: SwotSchema,
});

// Since you also have the /api/analyze route, here is the schema for the matrix tool
export const CompetitorMatrixSchema = z.object({
  competitors: z
    .array(
      z.object({
        id: z
          .string()
          .describe(
            "A unique slug for the competitor (e.g., 'stripe', 'paypal')",
          ),
        name: z.string().describe("The formatted name of the competitor"),
        priceReasoning: z
          .string()
          .describe("A 1-sentence explanation mapping to the price rubric"),
        priceScore: z.number().int().min(1).max(100),
        breadthReasoning: z
          .string()
          .describe("A 1-sentence explanation mapping to the breadth rubric"),
        breadthScore: z.number().int().min(1).max(100),
        color: z
          .string()
          .describe(
            "A distinct hex color code (e.g., '#3B82F6'). Do not repeat colors.",
          ),
      }),
    )
    .min(4)
    .max(7),
});

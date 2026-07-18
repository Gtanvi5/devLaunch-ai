"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, ideas, reports } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { openai, StartupReportSchema } from "@/lib/openai";
import { zodResponseFormat } from "openai/helpers/zod";

export async function generateStartupReport(formData: {
  title: string;
  description: string;
}) {
  // 1. Authenticate user using Next.js 15 async auth helper
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 2. Fetch the user's current credit balance
  const userRecord = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!userRecord || userRecord.credits <= 0) {
    throw new Error("Insufficient credits. Please upgrade to Pro.");
  }

  try {
    // 3. Request structured data from OpenAI
    const completion = await openai.chat.completions.parse({
      model: "gpt-4o-mini", // Cost-effective and natively supports structured outputs
      messages: [
        {
          role: "system",
          content:
            "You are an elite startup validator and venture capitalist. Analyze the user's business idea and generate a detailed SWOT analysis, competitor breakdown, and a 3-year revenue projection graph dataset.",
        },
        {
          role: "user",
          content: `Project Name: ${formData.title}\nDescription: ${formData.description}`,
        },
      ],
      response_format: zodResponseFormat(StartupReportSchema, "startup_report"),
    });

    const parsedReport = completion.choices[0].message.parsed;
    if (!parsedReport) throw new Error("Failed to parse AI response.");

    // 4. Run database insertions and credit deduction in a secure transaction
    const newReport = await db.transaction(async (tx) => {
      // Create the idea record
      const [newIdea] = await tx
        .insert(ideas)
        .values({
          userId,
          title: formData.title,
          description: formData.description,
        })
        .returning();

      // Create the report record linked to that idea
      const [finalReport] = await tx
        .insert(reports)
        .values({
          ideaId: newIdea.id,
          userId,
          swotAnalysis: parsedReport.swotAnalysis,
          competitors: parsedReport.competitors,
          revenuePrediction: parsedReport.revenuePrediction,
        })
        .returning();

      // Deduct 1 credit from the user
      await tx
        .update(users)
        .set({ credits: sql`${users.credits} - 1` })
        .where(eq(users.id, userId));

      return finalReport;
    });

    return { success: true, reportId: newReport.id };
  } catch (error) {
    console.error("AI Generation Error:", error);
    return { success: false, error: "Something went wrong during generation." };
  }
}

// lib/db.ts
import { prisma } from "@/lib/prisma";
import { ReportData } from "@/types/report";

export async function getReportById(id: string): Promise<ReportData | null> {
  try {
    const report = await prisma.report.findUnique({
      where: { id },
    });

    if (!report) return null;

    // Map your database model to the ReportData type expected by the UI
    return {
      idea: report.idea,
      score: report.score,
      marketSize: report.marketSize,
      competitorRisk: report.competitorRisk,
      swot: report.swot, // Assuming you store SWOT as a JSON column in Postgres
    };
  } catch (error) {
    console.error("Failed to fetch report:", error);
    return null;
  }
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export type ReportSection = Record<string, unknown> | null;

export interface ReportData {
  id: string;
  idea: string;
  prompt?: string;
  score: number;
  createdAt?: string;
  marketSize?: string;
  competitorRisk?: string;
  swot?: SwotAnalysis;
  executiveSummary?: ReportSection;
  marketAnalysis?: ReportSection;
}

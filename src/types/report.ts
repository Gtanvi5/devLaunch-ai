export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface ReportData {
  idea: string;
  score: number;
  marketSize: string;
  competitorRisk: "Low" | "Medium" | "High" | "Extreme";
  swot: SwotAnalysis;
}

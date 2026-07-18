"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Share2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Users,
  Target,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TABS = [
  "Executive Summary",
  "Market Analysis",
  "Competitor Matrix",
  "Financial Projections",
];

type MarketAnalysisData = {
  tamDescription?: string;
  [key: string]: unknown;
};

type ReportData = ExecutiveSummaryData & {
  score?: number;
  marketAnalysis?: MarketAnalysisData | null;
  executiveSummary?: ExecutiveSummaryData | null;
  [key: string]: unknown;
};

export default function GeneratedReport({
  onBack,
  data,
}: {
  onBack: () => void;
  data?: ReportData | null;
}) {
  const [activeTab, setActiveTab] = useState("Executive Summary");
  const executiveSummaryData = (data?.executiveSummary ?? data) as
    | ExecutiveSummaryData
    | null
    | undefined;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 w-full max-w-6xl mx-auto flex flex-col h-[calc(100vh-4rem)]">
      {/* Report Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <button
            onClick={onBack}
            className="flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
            Report Analysis
            <span className="text-sm font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-600">
              Score: {data?.score || 85}/100
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant="outline"
            className="flex-1 md:flex-none border-zinc-200 dark:border-zinc-700"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button className="flex-1 md:flex-none bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </header>

      {/* Main Content Area Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden mt-6 gap-8 pb-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        {/* Tab Content Area */}
        <main className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "Executive Summary" && (
                <ExecutiveSummaryTab data={data?.executiveSummary || data} />
              )}
              {activeTab === "Market Analysis" && (
                <MarketAnalysisTab data={data?.marketAnalysis} />
              )}

              {/* Placeholder for tabs not yet built out */}
              {(activeTab === "Competitor Matrix" ||
                activeTab === "Financial Projections") && (
                <div className="h-64 flex items-center justify-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-500 bg-zinc-50/50 dark:bg-zinc-900/50">
                  Detailed {activeTab} data would render here.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// --- TAB COMPONENTS ---

type ExecutiveSummaryData = {
  viabilityVerdict?: string;
  targetAudience?: string;
  estArr?: string;
  strengths?: string[];
  weaknesses?: string[];
  risks?: string[];
  aiRecommendation?: string;
  [key: string]: unknown;
};

function ExecutiveSummaryTab({ data }: { data?: ExecutiveSummaryData | null }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          icon={<Target />}
          title="Viability Verdict"
          value={data?.viabilityVerdict || "Pending"}
          trend="Based on AI analysis"
        />
        <MetricCard
          icon={<Users />}
          title="Target Audience"
          value={data?.targetAudience || "B2B / B2C"}
          trend="Identified Demo"
        />
        <MetricCard
          icon={<DollarSign />}
          title="Est. First Year ARR"
          value={data?.estArr || "$0 - $100k"}
          trend="Projected"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Strengths */}
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10">
          <h3 className="flex items-center text-emerald-800 dark:text-emerald-400 font-semibold mb-4 text-lg">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Core Strengths
          </h3>
          <ul className="space-y-3">
            {data?.strengths?.map((strength: string, i: number) => (
              <ListItem key={i}>{strength}</ListItem>
            )) || (
              <span className="text-sm text-emerald-700">
                No strengths identified.
              </span>
            )}
          </ul>
        </div>

        {/* Risks */}
        <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10">
          <h3 className="flex items-center text-amber-800 dark:text-amber-400 font-semibold mb-4 text-lg">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Primary Risks
          </h3>
          <ul className="space-y-3">
            {data?.risks?.map((risk: string, i: number) => (
              <ListItem key={i} type="risk">
                {risk}
              </ListItem>
            )) || (
              <span className="text-sm text-amber-700">
                No risks identified.
              </span>
            )}
          </ul>
        </div>
      </div>

      {/* AI Verdict */}
      <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <h3 className="font-semibold text-lg mb-2">
          AI Strategic Recommendation
        </h3>
        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {data?.aiRecommendation ||
            "Awaiting AI strategy recommendation generation..."}
        </p>
      </div>
    </div>
  );
}

// BUG FIX: Added `data` prop and removed the hardcoded bakery text
function MarketAnalysisTab({ data }: { data?: MarketAnalysisData | null }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Total Addressable Market (TAM)</h2>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {data?.tamDescription ||
          "Market analysis relies on macro-economic trends and specific industry verticals. The AI is currently compiling the fragmented data points into a cohesive market breakdown."}
      </p>

      {/* Placeholder for a chart */}
      <div className="h-72 w-full rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center flex-col">
        <BarChart3 className="w-8 h-8 text-zinc-400 mb-2" />
        <span className="text-zinc-500 text-sm">
          Market Size Visualization Chart (Insert Recharts here)
        </span>
      </div>
    </div>
  );
}

type MetricCardProps = {
  icon: React.ReactNode;
  title: string;
  value?: React.ReactNode;
  trend?: string;
};

function MetricCard({ icon, title, value, trend }: MetricCardProps) {
  return (
    <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="flex items-center gap-3 mb-3 text-zinc-500">
        <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
          {icon}
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="text-2xl font-bold mb-1 truncate">{value}</div>
      <div className="text-sm text-zinc-500 flex items-center">
        <TrendingUp className="w-3 h-3 mr-1 text-emerald-500 shrink-0" />
        <span className="truncate">{trend}</span>
      </div>
    </div>
  );
}

function ListItem({
  children,
  type = "success",
}: {
  children: React.ReactNode;
  type?: "success" | "risk";
}) {
  return (
    <li className="flex items-start gap-3">
      <div
        className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${
          type === "success" ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />
      <span
        className={`text-sm leading-relaxed ${
          type === "success"
            ? "text-emerald-900 dark:text-emerald-100/90"
            : "text-amber-900 dark:text-amber-100/90"
        }`}
      >
        {children}
      </span>
    </li>
  );
}

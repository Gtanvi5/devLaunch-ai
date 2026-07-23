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
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TABS = [
  "Executive Summary",
  "Market Analysis",
  "Competitor Matrix",
  "Financial Projections",
];

type ExecutiveSummary = {
  viabilityVerdict?: string;
  targetAudience?: string;
  estArr?: string;
  strengths?: string[];
  risks?: string[];
  aiRecommendation?: string;
};

type MarketAnalysis = {
  tamDescription?: string;
};

type ReportData = {
  score?: number;
  executiveSummary?: ExecutiveSummary;
  marketAnalysis?: MarketAnalysis;
};

export default function ReportResult({
  onBack,
  data,
}: {
  onBack: () => void;
  data?: ReportData | null;
}) {
  const [activeTab, setActiveTab] = useState("Executive Summary");

  const summary = data?.executiveSummary;
  const market = data?.marketAnalysis;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-[calc(100vh-6rem)] animate-in fade-in zoom-in-95 duration-300">
      {/* Report Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10 shrink-0">
        <div>
          <button
            onClick={onBack}
            className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            Validation Report
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
              Score: {data?.score ?? 85}/100
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant="outline"
            className="flex-1 md:flex-none bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:text-slate-950 font-medium transition-all shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col md:flex-row mt-6 gap-8 pb-6 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-56 shrink-0">
          <nav className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
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
                <div className="space-y-8">
                  {/* Top Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <MetricCard
                      icon={<Target className="w-4 h-4" />}
                      title="Viability Verdict"
                      value={summary?.viabilityVerdict || "Highly Viable"}
                      trend="Based on AI analysis"
                    />
                    <MetricCard
                      icon={<Users className="w-4 h-4" />}
                      title="Target Audience"
                      value={summary?.targetAudience || "N/A"}
                      trend="Identified Demographic"
                    />
                    <MetricCard
                      icon={<DollarSign className="w-4 h-4" />}
                      title="Est. First Year ARR"
                      value={summary?.estArr || "$1M - $5M"}
                      trend="Projected Revenue"
                    />
                  </div>

                  {/* Strengths and Risks Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-500/[0.03] border border-emerald-100 dark:border-emerald-500/10">
                      <h3 className="flex items-center text-emerald-900 dark:text-emerald-400 font-semibold mb-4 text-base tracking-tight">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Core Strengths
                      </h3>
                      <ul className="space-y-3">
                        {summary?.strengths?.map((strength, i) => (
                          <ListItem key={i} type="success">
                            {strength}
                          </ListItem>
                        )) || (
                          <span className="text-sm text-emerald-700 dark:text-emerald-500/80">
                            No strengths identified.
                          </span>
                        )}
                      </ul>
                    </div>

                    {/* Risks */}
                    <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-500/[0.03] border border-amber-100 dark:border-amber-500/10">
                      <h3 className="flex items-center text-amber-900 dark:text-amber-400 font-semibold mb-4 text-base tracking-tight">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Primary Risks
                      </h3>
                      <ul className="space-y-3">
                        {summary?.risks?.map((risk, i) => (
                          <ListItem key={i} type="risk">
                            {risk}
                          </ListItem>
                        )) || (
                          <span className="text-sm text-amber-700 dark:text-amber-500/80">
                            No risks identified.
                          </span>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* AI Strategic Recommendation */}
                  <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111] shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-bl-full translate-x-16 -translate-y-16" />
                    <h3 className="font-semibold text-lg mb-3 text-slate-900 dark:text-white tracking-tight flex items-center gap-2 relative z-10">
                      <Sparkles className="w-5 h-5 text-indigo-500" />
                      AI Strategic Recommendation
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm relative z-10">
                      {summary?.aiRecommendation ||
                        "Awaiting strategic recommendations..."}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "Market Analysis" && (
                <div className="space-y-6">
                  <div className="max-w-3xl">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                      Total Addressable Market (TAM)
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                      {market?.tamDescription ||
                        "Market analysis relies on macro-economic trends and specific industry verticals."}
                    </p>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="h-80 w-full rounded-2xl bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center flex-col">
                    <BarChart3 className="w-8 h-8 text-slate-400 dark:text-slate-600 mb-3" />
                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                      Market Size Visualization Chart
                    </span>
                  </div>
                </div>
              )}

              {(activeTab === "Competitor Matrix" ||
                activeTab === "Financial Projections") && (
                <div className="h-64 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-white/[0.02]">
                  <BarChart3 className="w-8 h-8 mb-3 opacity-50" />
                  <p className="text-sm">
                    Detailed {activeTab} modules coming soon.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
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
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111] shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-3 text-slate-500 dark:text-slate-400">
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
          {icon}
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div>
        <div className="text-2xl font-bold mb-1.5 truncate text-slate-900 dark:text-white tracking-tight">
          {value}
        </div>
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center">
          <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-emerald-500 shrink-0" />
          <span className="truncate">{trend}</span>
        </div>
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
        className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
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

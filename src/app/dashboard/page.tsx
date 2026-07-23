"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  ChevronRight,
  FileText,
  CheckCircle2,
  Sparkles,
  Sliders,
  Globe,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import ReportLoadingState from "@/components/ReportLoadingState";
import GeneratedReport from "@/components/GeneratedReport";

// Define the shape of our database record
type ReportSection = Record<string, unknown> | null;

type DatabaseReport = {
  id: string;
  prompt: string;
  score: number;
  createdAt: string;
  executiveSummary: ReportSection;
  marketAnalysis: ReportSection;
};

export default function DashboardPage() {
  // Generation Flow State
  const [ideaPrompt, setIdeaPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReportReady, setIsReportReady] = useState(false);
  const [reportData, setReportData] = useState<DatabaseReport | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Database Data State
  const [reports, setReports] = useState<DatabaseReport[]>([]);
  const [credits, setCredits] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch past reports AND user credits on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [reportsRes, userRes] = await Promise.all([
          fetch("/api/reports"),
          fetch("/api/user"),
        ]);

        if (reportsRes.ok) {
          const reportsData = await reportsRes.json();
          setReports(reportsData.reports);
        }

        if (userRes.ok) {
          const userData = await userRes.json();
          setCredits(userData.credits);
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Filter reports based on search query
  const filteredReports = useMemo(() => {
    if (!searchQuery.trim()) return reports;
    return reports.filter((report) =>
      report.prompt.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [reports, searchQuery]);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (ideaPrompt.trim().length < 5 || credits === 0) return;

    setIsGenerating(true);
    setIsReportReady(false);
    setReportData(null);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: ideaPrompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          setErrorMsg(
            "You are out of credits. Please upgrade your plan to continue.",
          );
          setIsGenerating(false);
          return;
        }
        throw new Error(data.message || "API request failed");
      }

      setReportData(data.report);

      // Optimistically update the UI to deduct a credit
      if (credits !== null) {
        setCredits((prev) => (prev ? prev - 1 : 0));
      }
    } catch (error) {
      console.error("Failed to fetch report:", error);
      setErrorMsg(
        "Something went wrong while generating your report. Please try again.",
      );
      setIsGenerating(false);
    }
  };

  const handleLoadingComplete = () => {
    if (reportData) {
      setIsGenerating(false);
      setIsReportReady(true);
      setReports((prev) => [reportData, ...prev]);
      setIdeaPrompt(""); // Clear prompt on success
    }
  };

  const handleBackToDashboard = () => {
    setIsReportReady(false);
    setReportData(null);
  };

  return (
    <div className="flex flex-col h-full min-h-screen w-full bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
      {/* Top Header Bar */}
      <header className="h-16 border-b border-slate-200 dark:border-white/10 bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-xl px-6 md:px-8 flex items-center justify-between shrink-0 z-40 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div className="text-sm font-medium flex items-center gap-2 text-slate-500 dark:text-slate-400">
            Workspace
            <ChevronRight className="w-4 h-4 opacity-50" />
            <span className="text-slate-900 dark:text-slate-100 font-semibold tracking-tight">
              Validation Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-xs font-medium flex items-center gap-2 border border-slate-200 dark:border-white/10 transition-all">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                credits === null
                  ? "bg-slate-400 animate-pulse"
                  : credits > 0
                    ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                    : "bg-red-500"
              }`}
            />
            <span className="text-slate-700 dark:text-slate-300">
              {credits !== null ? `${credits} Credits` : "Loading..."}
            </span>
          </div>
        </div>
      </header>

      {/* Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 relative">
        <div className="max-w-5xl w-full mx-auto h-full flex flex-col">
          <AnimatePresence mode="wait">
            {/* STATE 1: The Final Generated Report */}
            {isReportReady && reportData && (
              <motion.div
                key="report"
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full pb-8"
              >
                <GeneratedReport
                  onBack={handleBackToDashboard}
                  data={reportData}
                />
              </motion.div>
            )}

            {/* STATE 2: The Multi-Agent Loading Terminal */}
            {isGenerating && !isReportReady && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex items-center justify-center py-12"
              >
                <ReportLoadingState onComplete={handleLoadingComplete} />
              </motion.div>
            )}

            {/* STATE 3: The Default Dashboard Shell */}
            {!isGenerating && !isReportReady && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-12 pb-12"
              >
                {/* Hero / Generator Block */}
                <div className="flex flex-col gap-6">
                  <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Validate your next idea.
                    </h1>
                    <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl">
                      Describe your startup concept, target market, and core
                      mechanics. Our engine will synthesize a comprehensive
                      viability report.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl p-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/50">
                    <form onSubmit={handleGenerate} className="flex flex-col">
                      <textarea
                        value={ideaPrompt}
                        onChange={(e) => {
                          setIdeaPrompt(e.target.value);
                          if (errorMsg) setErrorMsg(null);
                        }}
                        disabled={isGenerating || credits === 0}
                        placeholder={
                          credits === 0
                            ? "You are out of credits. Please upgrade your plan."
                            : "e.g., 'A real-time B2B dashboard that connects to Stripe and automates SaaS churn recovery...'"
                        }
                        className="w-full min-h-[140px] bg-transparent text-slate-900 dark:text-white p-4 text-base placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none outline-none disabled:opacity-50"
                      />

                      <AnimatePresence>
                        {errorMsg && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-4 pb-2"
                          >
                            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm py-2 px-3 rounded-lg flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 shrink-0" />
                              <p>{errorMsg}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex flex-wrap gap-4 items-center justify-between p-3 bg-slate-50/50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-white/5 rounded-xl m-1">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="px-3 py-1.5 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
                          >
                            <Globe className="w-3.5 h-3.5" /> Global Market
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1.5 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
                          >
                            <Sliders className="w-3.5 h-3.5" /> B2B Focus
                          </button>
                        </div>

                        <Button
                          type="submit"
                          disabled={
                            ideaPrompt.trim().length < 5 ||
                            isGenerating ||
                            credits === 0
                          }
                          className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:text-slate-950 rounded-lg px-6 h-9 font-semibold text-sm transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                          {credits === 0 ? (
                            "Out of Credits"
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" /> Run Analysis
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Historical Runs Grid */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white tracking-tight">
                      Recent Blueprints
                    </h3>
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search past validations..."
                        className="w-full bg-white dark:bg-[#111] text-sm text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg pl-9 pr-4 py-2 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isLoading ? (
                      /* Premium Skeleton Loader */
                      Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={`skeleton-${i}`}
                          className="bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl p-5 flex flex-col gap-4 animate-pulse"
                        >
                          <div className="flex items-start justify-between">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5" />
                            <div className="h-6 w-16 bg-slate-100 dark:bg-white/5 rounded-md" />
                          </div>
                          <div className="space-y-2 mt-2">
                            <div className="h-4 w-3/4 bg-slate-100 dark:bg-white/5 rounded-md" />
                            <div className="h-4 w-1/2 bg-slate-100 dark:bg-white/5 rounded-md" />
                          </div>
                        </div>
                      ))
                    ) : filteredReports.length === 0 ? (
                      /* Empty State */
                      <div className="col-span-full text-center py-16 text-slate-500 dark:text-slate-400 text-sm border border-dashed border-slate-200 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/[0.02]">
                        {searchQuery
                          ? "No blueprints match your search."
                          : "Your architecture history is empty. Start your first validation above."}
                      </div>
                    ) : (
                      /* Loaded Reports (Grid Layout) */
                      filteredReports.map((report) => {
                        const shortName =
                          report.prompt.split(" ").slice(0, 8).join(" ") +
                          (report.prompt.split(" ").length > 8 ? "..." : "");

                        const formattedDate = new Date(
                          report.createdAt,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });

                        const scoreColor =
                          report.score >= 80
                            ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20"
                            : report.score >= 60
                              ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20"
                              : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20";

                        return (
                          <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={report.id}
                            onClick={() => {
                              setReportData(report);
                              setIsReportReady(true);
                            }}
                            className="group bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 rounded-xl p-5 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-bl-full translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-500 ease-out" />

                            <div className="flex items-start justify-between mb-4 relative z-10">
                              <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/5 text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-colors">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div
                                className={`px-2.5 py-1 rounded-md border text-xs font-bold flex items-center gap-1.5 ${scoreColor}`}
                              >
                                {report.score} / 100
                              </div>
                            </div>

                            <div className="relative z-10">
                              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-snug mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                                &quot;{shortName}&quot;
                              </h4>

                              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                  <span>Completed {formattedDate}</span>
                                </div>
                                <span className="flex items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-600 dark:text-indigo-400 font-medium">
                                  View{" "}
                                  <ChevronRight className="w-3 h-3 ml-0.5" />
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

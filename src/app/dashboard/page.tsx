"use client";

import { useState, useEffect } from "react";
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
  Loader2,
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

  // Database Data State
  const [reports, setReports] = useState<DatabaseReport[]>([]);
  const [isLoadingReports, setIsLoadingReports] = useState(true);

  // Fetch past reports on component mount
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("/api/reports");
        if (res.ok) {
          const data = await res.json();
          setReports(data.reports);
        }
      } catch (error) {
        console.error("Failed to load reports", error);
      } finally {
        setIsLoadingReports(false);
      }
    };

    fetchReports();
  }, []);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (ideaPrompt.trim().length < 5) return;

    setIsGenerating(true);
    setIsReportReady(false);
    setReportData(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: ideaPrompt }),
      });

      if (!response.ok) throw new Error("API request failed");
      const data = await response.json();

      // data.report is now the complete database record returned from Prisma
      setReportData(data.report);
    } catch (error) {
      console.error("Failed to fetch report:", error);
      setIsGenerating(false);
    }
  };

  const handleLoadingComplete = () => {
    if (reportData) {
      setIsGenerating(false);
      setIsReportReady(true);
      // Immediately add the newly generated database record to the top of our list
      setReports([reportData, ...reports]);
    }
  };

  const handleBackToDashboard = () => {
    setIsReportReady(false);
    setIdeaPrompt("");
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Top Header Bar */}
      <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-md px-8 flex items-center justify-between shrink-0 z-10">
        <div className="text-sm text-zinc-500 font-medium">
          Workspace /{" "}
          <span className="text-zinc-900 dark:text-white font-semibold">
            Validation Engine
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 text-xs font-semibold flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            8 / 10 Credits Left
          </div>
        </div>
      </header>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
        <div className="max-w-4xl w-full mx-auto h-full flex flex-col">
          <AnimatePresence mode="wait">
            {/* STATE 1: The Final Generated Report */}
            {isReportReady && reportData && (
              <motion.div
                key="report"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-10 pb-12"
              >
                {/* Welcome Announcement Card */}
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1">
                    Welcome back
                  </h1>
                  <p className="text-sm text-zinc-500">
                    What idea are we putting to the test today?
                  </p>
                </div>

                {/* Engine Generator Block */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 blur-3xl rounded-full pointer-events-none" />

                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10 text-zinc-900 dark:text-white">
                    <Sparkles className="w-4 h-4 text-violet-500" /> Start
                    Validation Script
                  </h2>

                  <form
                    onSubmit={handleGenerate}
                    className="space-y-4 relative z-10"
                  >
                    <div className="relative">
                      <textarea
                        value={ideaPrompt}
                        onChange={(e) => setIdeaPrompt(e.target.value)}
                        disabled={isGenerating}
                        placeholder="Describe your startup concept completely (e.g., 'A real-time B2B dashboard helper tool for tracking global supply chain metrics targeting mid-market logistics managers...')"
                        className="w-full min-h-[120px] bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 focus:border-violet-500 dark:focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-2xl p-4 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all resize-none outline-none"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3 items-center justify-between pt-2">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 text-xs text-zinc-500 flex items-center gap-1.5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                        >
                          <Globe className="w-3 h-3" /> Target: US/Global
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 text-xs text-zinc-500 flex items-center gap-1.5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                        >
                          <Sliders className="w-3 h-3" /> Focus: B2B SaaS
                        </button>
                      </div>

                      <Button
                        type="submit"
                        disabled={ideaPrompt.trim().length < 5 || isGenerating}
                        className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl px-6 h-10 font-semibold text-sm shadow-md transition-all disabled:opacity-50 shrink-0"
                      >
                        Run Analysis
                        <Plus className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Historical Runs Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                      Generated Blueprints
                    </h3>
                    <div className="relative w-48 md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="Filter by keyword..."
                        className="w-full bg-white dark:bg-zinc-900/40 text-xs text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-zinc-300 dark:focus:border-zinc-600 rounded-xl pl-9 pr-4 py-2 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {isLoadingReports ? (
                      <div className="flex items-center justify-center py-12 text-zinc-500">
                        <Loader2 className="w-6 h-6 animate-spin" />
                      </div>
                    ) : reports.length === 0 ? (
                      <div className="text-center py-12 text-zinc-500 text-sm border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                        No reports generated yet. Run your first analysis above!
                      </div>
                    ) : (
                      reports.map((report) => {
                        // Generate a short name from the database prompt
                        const shortName =
                          report.prompt.split(" ").slice(0, 5).join(" ") +
                          "...";

                        // Format the PostgreSQL timestamp
                        const formattedDate = new Date(
                          report.createdAt,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });

                        return (
                          <motion.div
                            layout
                            key={report.id}
                            onClick={() => {
                              setReportData(report);
                              setIsReportReady(true);
                            }}
                            className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 hover:border-violet-300 dark:hover:border-violet-700/80 rounded-2xl p-4 flex items-center justify-between transition-all group cursor-pointer shadow-sm hover:shadow-md"
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-100 dark:border-zinc-700/50">
                                <FileText className="w-5 h-5 text-zinc-400 group-hover:text-violet-500 transition-colors" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-sm font-bold truncate text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                  {shortName}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                                  <span>{formattedDate}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500 font-medium">
                                    <CheckCircle2 className="w-3 h-3" />{" "}
                                    Completed
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-6 shrink-0">
                              <div className="text-right hidden sm:block">
                                <div className="text-xs text-zinc-400 font-medium">
                                  Viability Score
                                </div>
                                <div
                                  className={`text-base font-extrabold ${
                                    report.score >= 80
                                      ? "text-emerald-500"
                                      : report.score >= 60
                                        ? "text-amber-500"
                                        : "text-red-500"
                                  }`}
                                >
                                  {report.score}/100
                                </div>
                              </div>
                              <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-violet-50 dark:group-hover:bg-violet-500/10 transition-colors">
                                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all" />
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
      </div>
    </div>
  );
}

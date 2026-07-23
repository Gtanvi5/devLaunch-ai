"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Sparkles, ArrowRight, Lightbulb } from "lucide-react";
import ReportLoadingState from "@/components/ReportLoadingState";
// import ReportResult from "@/components/ReportResult"; // To be implemented
// import ReportInput from "@/components/ReportInput"; // To be implemented

type AppState = "input" | "loading" | "result";

type ReportData = {
  score: number;
  executiveSummary?: {
    viabilityVerdict?: string;
  };
};

export default function DashboardPage() {
  const [appState, setAppState] = useState<AppState>("input");
  const [prompt, setPrompt] = useState("");
  const [reportData, setReportData] = useState<ReportData | null>(null);

  // Clean state syncing
  const [isApiFinished, setIsApiFinished] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync API and Animation completion
  useEffect(() => {
    if (appState === "loading" && isApiFinished && isAnimationComplete) {
      setAppState("result");
    }
  }, [appState, isApiFinished, isAnimationComplete]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsSubmitting(true);
    setAppState("loading");
    setIsApiFinished(false);
    setIsAnimationComplete(false);
    setReportData(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate report");
      }

      setReportData(data.report);
      setIsApiFinished(true);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      toast.error(message);
      setAppState("input");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center selection:bg-indigo-500/30">
      {/* High-end ambient background */}
      <div className="fixed top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-50/50 via-transparent to-transparent dark:from-indigo-900/[0.03] pointer-events-none" />

      {/* --- INPUT STATE --- */}
      {appState === "input" && (
        <div className="w-full max-w-3xl relative z-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-[2.5rem] blur-xl opacity-20 dark:opacity-10" />

          <div className="relative bg-white dark:bg-[#111] p-8 sm:p-10 rounded-[2rem] border border-zinc-200 dark:border-white/10 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
                <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white">
                Describe your startup idea
              </h1>
            </div>

            <div className="relative group">
              <textarea
                className="w-full h-40 p-5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-black/50 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none resize-none transition-all duration-300 text-lg leading-relaxed"
                placeholder="E.g., A smart wearable pin that uses AI to analyze your body odor and deploy custom fragrance micro-bursts..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isSubmitting}
              />
              <div className="absolute bottom-4 right-4 text-xs font-mono text-zinc-400 dark:text-zinc-500">
                {prompt.length} chars
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isSubmitting}
              className="mt-6 w-full h-14 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
            >
              <Sparkles className="w-5 h-5 text-indigo-400 dark:text-indigo-600" />
              Validate Idea (1 Credit)
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* --- LOADING STATE --- */}
      {appState === "loading" && (
        <div className="w-full relative z-10">
          <ReportLoadingState onComplete={() => setIsAnimationComplete(true)} />
        </div>
      )}

      {/* --- RESULT STATE --- */}
      {appState === "result" && reportData && (
        <div className="w-full max-w-4xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
          {/* Note: This is a placeholder until we inject your actual ReportResult component */}
          <div className="bg-white dark:bg-[#111] p-10 rounded-[2rem] border border-zinc-200 dark:border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <div className="text-right">
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
                  Score
                </div>
                <div className="text-4xl font-light text-indigo-600 dark:text-indigo-400">
                  {reportData.score}/100
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-white mb-8">
              Validation Report
            </h2>

            <div className="mb-10">
              <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
                Verdict
              </h3>
              <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed border-l-2 border-indigo-500 pl-4">
                {reportData.executiveSummary?.viabilityVerdict ||
                  "Analysis complete. View full metrics below."}
              </p>
            </div>

            <button
              onClick={() => setAppState("input")}
              className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-900 dark:text-white rounded-lg transition-colors text-sm font-medium"
            >
              Analyze Another Idea
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Target,
  Zap,
  BarChart3,
  Loader2,
} from "lucide-react";
import Link from "next/link";

export default function IdeaScorerPage() {
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState<"idle" | "analyzing" | "result">("idle");
  const [loadingText, setLoadingText] = useState("Initializing AI...");
  const [score, setScore] = useState(0);

  // Simulated AI analysis process
  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setStatus("analyzing");

    const loadingSteps = [
      "Scanning market trends...",
      "Analyzing competitor density...",
      "Evaluating technical feasibility...",
      "Calculating final viability score...",
    ];

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < loadingSteps.length) {
        setLoadingText(loadingSteps[step]);
      } else {
        clearInterval(interval);
        // Generate a random score between 65 and 92 for the demo
        setScore(Math.floor(Math.random() * (92 - 65 + 1)) + 65);
        setStatus("result");
      }
    }, 800);
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24 selection:bg-violet-500/30">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Free AI Micro-Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-4">
            Is your idea worth building?
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Describe your startup in one sentence. Our AI will instantly analyze
            market conditions and give you a viability score.
          </p>
        </div>

        {/* Main Card */}
        <div className="relative bg-white dark:bg-zinc-900/50 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-black/50 border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* STATE 1: IDLE / INPUT */}
            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-8 md:p-12"
              >
                <form
                  onSubmit={handleAnalyze}
                  className="flex flex-col h-full justify-center"
                >
                  <label
                    htmlFor="idea"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3"
                  >
                    Your Startup Idea
                  </label>
                  <textarea
                    id="idea"
                    rows={4}
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="e.g. A marketplace that connects local chefs with people who want home-cooked meals prepped for the week."
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none transition-all"
                    required
                  />
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-xs text-zinc-500">
                      No sign-up required for the quick score.
                    </p>
                    <button
                      type="submit"
                      disabled={!idea.trim()}
                      className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Calculate Score
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STATE 2: ANALYZING */}
            {status === "analyzing" && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm z-10"
              >
                <Loader2 className="w-12 h-12 text-violet-500 animate-spin mb-6" />
                <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-2">
                  Running fast validation...
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 animate-pulse">
                  {loadingText}
                </p>
              </motion.div>
            )}

            {/* STATE 3: RESULT */}
            {status === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-12"
              >
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-violet-50 dark:bg-violet-500/10 border-8 border-violet-100 dark:border-violet-500/20 mb-6 relative">
                    <span className="text-5xl font-bold tracking-tighter text-violet-600 dark:text-violet-400">
                      {score}
                    </span>
                    <span className="absolute bottom-4 right-4 text-sm font-medium text-violet-600/50 dark:text-violet-400/50">
                      /100
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">
                    {score > 80 ? "High Potential" : "Proceed with Caution"}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                    We found existing demand, but the space is highly
                    competitive. Execution and finding a unique niche will be
                    key.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-10">
                  {[
                    { label: "Market Demand", val: "High", icon: Target },
                    { label: "Competition", val: "Fierce", icon: Zap },
                    { label: "Feasibility", val: "Medium", icon: BarChart3 },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800"
                    >
                      <stat.icon className="w-5 h-5 text-violet-500 mb-2" />
                      <span className="text-sm font-medium text-zinc-900 dark:text-white">
                        {stat.val}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* THE HOOK (Lead Generation) */}
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-center text-white shadow-lg shadow-violet-500/20">
                  <h3 className="text-lg font-semibold mb-2">
                    Want the deep dive?
                  </h3>
                  <p className="text-violet-100 text-sm mb-6 max-w-sm mx-auto">
                    Get a 15-page AI-generated validation report with competitor
                    analysis, suggested tech stack, and ideal customer profiles.
                  </p>
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 bg-white text-violet-600 hover:bg-zinc-50 px-6 py-3 rounded-xl font-semibold transition-all w-full justify-center"
                  >
                    Generate Full Report for Free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <button
                  onClick={() => {
                    setIdea("");
                    setStatus("idle");
                  }}
                  className="w-full text-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white mt-6 transition-colors"
                >
                  Score another idea
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

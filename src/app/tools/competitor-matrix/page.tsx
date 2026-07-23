"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Loader2,
  Crosshair,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function CompetitorMatrixPage() {
  const [niche, setNiche] = useState("");
  const [status, setStatus] = useState<"idle" | "analyzing" | "result">("idle");
  const [loadingText, setLoadingText] = useState(
    "Scanning industry directories...",
  );

  // Simulated AI analysis process
  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) return;

    setStatus("analyzing");

    const loadingSteps = [
      "Identifying top market players...",
      "Plotting feature density...",
      "Analyzing pricing models...",
      "Generating positioning matrix...",
    ];

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < loadingSteps.length) {
        setLoadingText(loadingSteps[step]);
      } else {
        clearInterval(interval);
        setStatus("result");
      }
    }, 900);
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24 selection:bg-violet-500/30">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium mb-6">
            <Crosshair className="w-4 h-4" />
            Free Market Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-4">
            Find your white space.
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Enter your niche or industry. Our AI will map the competitive
            landscape so you can see exactly where to position your product.
          </p>
        </div>

        {/* Main Interface */}
        <div className="relative bg-white dark:bg-zinc-900/50 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-black/50 border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            {/* STATE 1: IDLE / INPUT */}
            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center p-8 md:p-16 h-full min-h-[500px]"
              >
                <form onSubmit={handleAnalyze} className="w-full max-w-lg">
                  <label
                    htmlFor="niche"
                    className="block text-center text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-6"
                  >
                    What market are you entering?
                  </label>
                  <div className="relative flex items-center mb-6">
                    <input
                      id="niche"
                      type="text"
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      placeholder="e.g. AI CRM for Real Estate Agents"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-6 pr-32 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                      required
                    />
                    <button
                      type="submit"
                      disabled={!niche.trim()}
                      className="absolute right-2 top-2 bottom-2 inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Map it
                    </button>
                  </div>
                  <p className="text-center text-xs text-zinc-500">
                    Takes about 3 seconds. No credit card required.
                  </p>
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
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-zinc-900/90 backdrop-blur-sm z-10"
              >
                <div className="relative w-20 h-20 mb-8">
                  <div className="absolute inset-0 border-4 border-zinc-100 dark:border-zinc-800 rounded-full" />
                  <div className="absolute inset-0 border-4 border-violet-500 rounded-full border-t-transparent animate-spin" />
                  <Crosshair className="absolute inset-0 m-auto w-6 h-6 text-violet-500 animate-pulse" />
                </div>
                <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-2">
                  Mapping the landscape...
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
                className="p-8 md:p-12 flex flex-col lg:flex-row gap-12"
              >
                {/* Left: The Visual Matrix */}
                <div className="flex-1">
                  <div className="relative aspect-square w-full max-w-[400px] mx-auto bg-zinc-50 dark:bg-zinc-950 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 p-6">
                    {/* Axis Labels */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-50 dark:bg-zinc-950 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Premium / Enterprise
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-zinc-50 dark:bg-zinc-950 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Budget / DIY
                    </div>
                    <div className="absolute top-1/2 -left-4 -translate-y-1/2 -rotate-90 bg-zinc-50 dark:bg-zinc-950 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Niche / Focused
                    </div>
                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 rotate-90 bg-zinc-50 dark:bg-zinc-950 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Broad / All-in-one
                    </div>

                    {/* Crosshairs */}
                    <div className="absolute inset-y-0 left-1/2 w-px bg-zinc-200 dark:bg-zinc-800" />
                    <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-200 dark:bg-zinc-800" />

                    {/* Competitor Nodes (Mocked for Demo) */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-1/4 right-1/4 -translate-x-1/2 -translate-y-1/2 group"
                    >
                      <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)] cursor-pointer" />
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-max bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        Market Leader
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="absolute top-[30%] left-[30%] -translate-x-1/2 -translate-y-1/2 group"
                    >
                      <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer" />
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-max bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        Premium Niche
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="absolute bottom-1/4 right-[20%] -translate-x-1/2 -translate-y-1/2 group"
                    >
                      <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)] cursor-pointer" />
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-max bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        Discount Mass-Market
                      </div>
                    </motion.div>

                    {/* The "You" Indicator */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="absolute bottom-[35%] left-[35%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                    >
                      <div className="w-6 h-6 bg-violet-500 rounded-full border-4 border-violet-200 dark:border-violet-500/30 flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(139,92,246,0.8)]">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <div className="absolute top-8 w-max text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-200 dark:border-violet-500/20">
                        Your Opportunity
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right: Insights & Lead Capture */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">
                    Opportunity found.
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm leading-relaxed">
                    Based on your input, the highest chance of success is
                    positioning yourself in the{" "}
                    <strong className="text-violet-600 dark:text-violet-400 font-medium">
                      Budget / Focused
                    </strong>{" "}
                    quadrant. The current market leaders are over-serving the
                    enterprise space.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                      <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="block text-sm font-medium text-zinc-900 dark:text-white">
                          Clear Differentiation
                        </span>
                        <span className="text-xs text-zinc-500">
                          Low competition for solo-preneurs in this niche.
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                      <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <span className="block text-sm font-medium text-zinc-900 dark:text-white">
                          Feature Creep Risk
                        </span>
                        <span className="text-xs text-zinc-500">
                          You must resist building enterprise features early on.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* THE HOOK */}
                  <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-violet-500/20 relative overflow-hidden">
                    <div className="relative z-10">
                      <h4 className="text-lg font-semibold mb-1">
                        Beat them with data.
                      </h4>
                      <p className="text-violet-100 text-sm mb-5">
                        Get the exact features they are missing, their pricing
                        flaws, and your step-by-step technical execution plan.
                      </p>
                      <Link
                        href="/signup"
                        className="inline-flex items-center gap-2 bg-white text-violet-600 hover:bg-zinc-50 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all w-full justify-center"
                      >
                        Generate Full Strategy Report
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    {/* Decorative background element */}
                    <Crosshair className="absolute -bottom-6 -right-6 w-32 h-32 text-white opacity-10" />
                  </div>

                  <button
                    onClick={() => {
                      setNiche("");
                      setStatus("idle");
                    }}
                    className="mt-4 text-center text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Analyze a different niche
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

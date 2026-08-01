"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Crosshair,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const LOADING_STEPS = [
  "Identifying top market players...",
  "Plotting feature density...",
  "Analyzing pricing models...",
  "Generating positioning matrix...",
];

interface Competitor {
  id: string;
  name: string;
  priceScore: number;
  breadthScore: number;
  color: string;
}

interface Opportunity {
  priceScore: number;
  breadthScore: number;
  quadrantName: string;
}

function findWhiteSpace(competitors: Competitor[]): Opportunity {
  const quadrants = [
    { name: "Premium / Focused", x: 25, y: 75 },
    { name: "Premium / Broad", x: 75, y: 75 },
    { name: "Budget / Focused", x: 25, y: 25 },
    { name: "Budget / Broad", x: 75, y: 25 },
  ];

  if (!competitors || competitors.length === 0) {
    return {
      priceScore: 25,
      breadthScore: 25,
      quadrantName: "Budget / Focused",
    };
  }

  let maxMinDist = -1;
  let bestQuadrant = quadrants[0];

  for (const quad of quadrants) {
    let minDist = Infinity;
    for (const comp of competitors) {
      const dx = quad.x - comp.breadthScore;
      const dy = quad.y - comp.priceScore;
      const dist = Math.hypot(dx, dy);
      if (dist < minDist) {
        minDist = dist;
      }
    }

    if (minDist > maxMinDist) {
      maxMinDist = minDist;
      bestQuadrant = quad;
    }
  }

  return {
    priceScore: bestQuadrant.y,
    breadthScore: bestQuadrant.x,
    quadrantName: bestQuadrant.name,
  };
}

export default function CompetitorMatrixPage() {
  const [niche, setNiche] = useState("");
  const [loadingText, setLoadingText] = useState(LOADING_STEPS[0]);
  const [status, setStatus] = useState<
    "idle" | "analyzing" | "result" | "error"
  >("idle");
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "analyzing") return;

    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % LOADING_STEPS.length;
      setLoadingText(LOADING_STEPS[stepIndex]);
    }, 1500);

    const controller = new AbortController();
    let isTimeout = false;

    const fetchCompetitorData = async () => {
      try {
        const timeoutId = setTimeout(() => {
          isTimeout = true;
          controller.abort();
        }, 10000);

        const response = await fetch("/api/v1/analyze-market", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ industry: niche, region: "Global" }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();

        const calculatedOpportunity = findWhiteSpace(data.competitors);

        setCompetitors(data.competitors);
        setOpportunity(calculatedOpportunity);
        setStatus("result");
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            if (isTimeout) {
              setError("The analysis took too long. Please try again.");
            } else {
              return;
            }
          } else {
            setError(err.message || "Failed to fetch competitor data.");
          }
        } else {
          setError("Failed to fetch competitor data.");
        }
        setStatus("error");
      }
    };

    fetchCompetitorData();

    return () => {
      clearInterval(interval);
      controller.abort();
    };
  }, [status, niche]);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) return;

    setLoadingText(LOADING_STEPS[0]);
    setStatus("analyzing");
  };

  const handleReset = () => {
    setNiche("");
    setStatus("idle");
    setOpportunity(null);
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24 selection:bg-violet-500/30">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
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

        <div className="relative bg-white dark:bg-zinc-900/50 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-black/50 border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-125">
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center p-8 md:p-16 h-full min-h-125"
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

            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center p-8 text-center min-h-125"
              >
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  Analysis Failed
                </h3>
                <p className="text-zinc-500 text-sm mt-2 max-w-sm">{error}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-xl text-sm hover:opacity-90 transition-opacity"
                >
                  Try Again
                </button>
              </motion.div>
            )}

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
                <p
                  className="text-zinc-500 dark:text-zinc-400 animate-pulse"
                  aria-live="polite"
                >
                  {loadingText}
                </p>
              </motion.div>
            )}

            {status === "result" && opportunity && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col lg:flex-row gap-12 p-8 md:p-12 min-h-125"
              >
                <div className="flex-1">
                  <div className="relative aspect-square w-full max-w-100 mx-auto bg-zinc-50 dark:bg-zinc-950 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 p-6 mt-4">
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

                    <div className="absolute inset-y-0 left-1/2 w-px bg-zinc-200 dark:bg-zinc-800" />
                    <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-200 dark:bg-zinc-800" />

                    {competitors.map((comp, index) => (
                      <motion.div
                        key={comp.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        style={{
                          bottom: `${comp.priceScore}%`,
                          left: `${comp.breadthScore}%`,
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
                      >
                        <button
                          aria-label={`View details for ${comp.name}`}
                          className={`w-3 h-3 ${comp.color} rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-violet-500/30 transition-all`}
                        />
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-max bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none">
                          {comp.name}
                        </div>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: competitors.length * 0.2 + 0.4 }}
                      style={{
                        bottom: `${opportunity.priceScore}%`,
                        left: `${opportunity.breadthScore}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20"
                    >
                      <div className="w-6 h-6 bg-violet-500 rounded-full border-4 border-violet-200 dark:border-violet-500/30 flex items-center justify-center relative shadow-[0_0_20px_rgba(139,92,246,0.8)]">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <div className="absolute top-8 w-max text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-200 dark:border-violet-500/20">
                        Your Opportunity
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">
                    Opportunity found.
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm leading-relaxed">
                    Based on your input, the highest chance of success is
                    positioning yourself in the{" "}
                    <strong className="text-violet-600 dark:text-violet-400 font-medium">
                      {opportunity.quadrantName}
                    </strong>{" "}
                    quadrant. The current market leaders are clustered
                    elsewhere, leaving this space open.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                      <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="block text-sm font-medium text-zinc-900 dark:text-white">
                          Clear Differentiation
                        </span>
                        <span className="text-xs text-zinc-500">
                          Low competition in the {opportunity.quadrantName}{" "}
                          sector.
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                      <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <span className="block text-sm font-medium text-zinc-900 dark:text-white">
                          Strategic Focus Needed
                        </span>
                        <span className="text-xs text-zinc-500">
                          Ensure your feature set strictly aligns with this
                          quadrant.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-linear-to-br from-violet-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-violet-500/20 relative overflow-hidden">
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
                    <Crosshair className="absolute -bottom-6 -right-6 w-32 h-32 text-white opacity-10" />
                  </div>

                  <button
                    onClick={handleReset}
                    className="mt-6 text-center text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
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

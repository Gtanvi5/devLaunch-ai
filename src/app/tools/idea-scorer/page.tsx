"use client";

import { useState, useEffect } from "react";
import {
  experimental_useObject as useObject,
  useCompletion,
} from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { z } from "zod";

const marketSchema = z.object({
  competitors: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      priceReasoning: z.string(),
      priceScore: z.number().min(1).max(100),
      breadthReasoning: z.string(),
      breadthScore: z.number().min(1).max(100),
      color: z.string(),
    }),
  ),
});

interface Competitor {
  id: string;
  name: string;
  priceReasoning?: string;
  priceScore?: number;
  breadthReasoning?: string;
  breadthScore?: number;
  color?: string;
}

interface Opportunity {
  breadth: number;
  price: number;
}

interface CompetitorScores {
  breadthScore: number;
  priceScore: number;
}

function findLargestWhiteSpace(
  competitors: CompetitorScores[],
): Opportunity | null {
  if (!competitors || competitors.length === 0) return null;

  let bestPoint: Opportunity = { breadth: 50, price: 50 };
  let maxScore = -Infinity;

  for (let b = 5; b <= 95; b += 2) {
    for (let p = 5; p <= 95; p += 2) {
      let minDistance = Infinity;

      for (const comp of competitors) {
        const dist = Math.hypot(b - comp.breadthScore, p - comp.priceScore);
        if (dist < minDistance) {
          minDistance = dist;
        }
      }

      const distToCenter = Math.hypot(b - 50, p - 50);
      const centerGravityPenalty = distToCenter * 0.05;
      const edgeBufferPenalty = b < 10 || b > 90 || p < 10 || p > 90 ? 3 : 0;

      const score = minDistance - centerGravityPenalty - edgeBufferPenalty;

      if (score > maxScore) {
        maxScore = score;
        bestPoint = { breadth: b, price: p };
      }
    }
  }

  return bestPoint;
}

export default function MarketMatrixPage() {
  const [industry, setIndustry] = useState("");
  const [region] = useState("Global");
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

  const {
    object,
    submit,
    isLoading,
    error: objectError,
  } = useObject({
    api: "/api/analyze-idea",
    schema: marketSchema,
  });

  const {
    completion,
    complete,
    isLoading: isCompletionLoading,
    setCompletion,
    error: completionError,
  } = useCompletion({
    api: "/api/analyze-opportunity",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!industry.trim()) return;

    setOpportunity(null);
    setCompletion("");

    submit({ industry, region });
  };

  useEffect(() => {
    if (isLoading) return;

    if (
      !isLoading &&
      object?.competitors &&
      object.competitors.length > 0 &&
      !opportunity
    ) {
      const validCompetitors = object.competitors.filter(
        (c): c is Competitor & CompetitorScores =>
          typeof c?.breadthScore === "number" &&
          typeof c?.priceScore === "number",
      );

      if (validCompetitors.length > 0) {
        const whiteSpace = findLargestWhiteSpace(validCompetitors);

        if (whiteSpace) {
          const timer = setTimeout(() => {
            setOpportunity(whiteSpace);
          }, 0);

          return () => clearTimeout(timer);
        }
      }
    }
  }, [isLoading, object?.competitors, opportunity]);

  useEffect(() => {
    if (!opportunity) return;

    complete(industry, {
      body: {
        price: opportunity.price,
        breadth: opportunity.breadth,
      },
    });
  }, [opportunity, complete, industry]);

  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-zinc-200">
            <h1 className="text-xl font-semibold mb-4 text-zinc-900">
              Market Mapper
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Industry / Niche
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Headless CMS"
                  className="w-full rounded-lg border-zinc-300 p-2 border focus:ring-2 focus:ring-blue-500 outline-none"
                  disabled={isLoading || isCompletionLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || isCompletionLoading || !industry}
                className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg font-medium disabled:opacity-50 transition-all"
              >
                {isLoading || isCompletionLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Analyze Market"
                )}
              </button>
            </form>
            <AnimatePresence>
              {(objectError || completionError) && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3 text-red-700">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold">Analysis Failed</p>
                      <p className="mt-1 opacity-90">
                        {objectError?.message ||
                          completionError?.message ||
                          "The AI model timed out or encountered an error. Please try again."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xs border border-zinc-200 flex-1 overflow-y-auto">
            <h3 className="text-sm font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <Info className="w-4 h-4" /> Live Analysis Log
            </h3>
            <div className="space-y-4">
              {object?.competitors?.map((comp, i) => (
                <div
                  key={comp?.id ?? i}
                  className="text-sm border-l-2 border-blue-200 pl-3"
                >
                  <p className="font-medium text-zinc-900">
                    {comp?.name || "Analyzing..."}
                  </p>
                  {comp?.priceReasoning && (
                    <p className="text-zinc-500 mt-1">
                      <span className="font-medium text-zinc-700">Price:</span>{" "}
                      {comp.priceReasoning}
                    </p>
                  )}
                </div>
              ))}

              {opportunity && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm border-l-2 border-emerald-500 pl-3 bg-emerald-50 p-3 rounded-r-lg"
                >
                  <p className="font-medium text-emerald-800 flex items-center gap-1 mb-2">
                    <Sparkles className="w-4 h-4" /> Market Gap Identified
                  </p>
                  <p className="text-emerald-700 font-mono text-xs mb-3">
                    [Breadth: {opportunity.breadth} | Price: {opportunity.price}
                    ]
                  </p>

                  <div className="text-emerald-900 leading-relaxed italic">
                    {completion}
                    {isCompletionLoading && (
                      <span className="animate-pulse ml-1 inline-block w-2 h-4 bg-emerald-400 align-middle" />
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xs border border-zinc-200 flex flex-col items-center justify-center min-h-150">
          <div className="relative w-full max-w-2xl aspect-square border-l-2 border-b-2 border-zinc-300">
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-medium text-zinc-500 tracking-wider">
              PRICE
            </div>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-zinc-500 tracking-wider">
              BREADTH
            </div>

            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              <div className="border-b border-r border-zinc-100 border-dashed"></div>
              <div className="border-b border-zinc-100 border-dashed"></div>
              <div className="border-r border-zinc-100 border-dashed"></div>
              <div></div>
            </div>

            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
                >
                  <motion.div
                    animate={{ left: ["0%", "100%", "0%"] }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    className="absolute top-0 bottom-0 w-px bg-blue-400/60 shadow-[0_0_12px_2px_rgba(96,165,250,0.5)]"
                  />
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{
                      duration: 4,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    className="absolute left-0 right-0 h-px bg-blue-400/60 shadow-[0_0_12px_2px_rgba(96,165,250,0.5)]"
                  />
                  <motion.div
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 bg-blue-500/5 backdrop-blur-[1px]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {object?.competitors?.map((comp, i) => {
                if (
                  comp?.priceScore === undefined ||
                  comp?.breadthScore === undefined
                )
                  return null;
                return (
                  <motion.div
                    key={comp.id || i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -translate-x-1/2 translate-y-1/2 group cursor-pointer"
                    style={{
                      bottom: `${comp.priceScore}%`,
                      left: `${comp.breadthScore}%`,
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-full shadow-md border-2 border-white"
                      style={{ backgroundColor: comp.color || "#27272a" }}
                    />
                    <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-zinc-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap z-10 pointer-events-none">
                      <span className="font-semibold">{comp.name}</span>
                    </div>
                  </motion.div>
                );
              })}

              {opportunity && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  className="absolute -translate-x-1/2 translate-y-1/2 group cursor-pointer z-20"
                  style={{
                    bottom: `${opportunity.price}%`,
                    left: `${opportunity.breadth}%`,
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
                  <div className="relative w-8 h-8 rounded-full shadow-lg border-2 border-white bg-emerald-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-emerald-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap z-30 pointer-events-none">
                    <span className="font-semibold">Prime Opportunity</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}

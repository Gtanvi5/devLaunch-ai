"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  ChevronRight,
  BarChart3,
  Lightbulb,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 16 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const contentWrapperVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
      when: "afterChildren",
      duration: 0.2,
    },
  },
};

const slideLeftVariant = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, x: -10, transition: { duration: 0.15 } },
};

const popInVariant = {
  hidden: { opacity: 0, scale: 0.92, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 350, damping: 25 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};

const slideRightVariant = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, x: 10, transition: { duration: 0.15 } },
};

const chartContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

const barVariants = {
  hidden: { height: "0%", opacity: 0 },
  show: (val: number) => ({
    height: `${val}%`,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 15,
      mass: 0.8,
    },
  }),
  exit: { height: "0%", opacity: 0, transition: { duration: 0.1 } },
};

const startupConcepts = [
  {
    id: "async-copilot",
    name: "Video Copilot",
    category: "B2B SaaS",
    prompt: "AI-powered async video standups for enterprise teams",
    viabilityScore: 94,
    searchVolume: [35, 42, 58, 65, 78, 88, 100],
    timelineLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    volumeLabel: "102.4k / mo",
    growth: "+24.8%",
    revenueProjection: "$1.4M ARR",
    avgWtp: "$49 - $149/mo",
    competitors: [
      {
        name: "Legacy Loom",
        status: "High Threat",
        color:
          "text-rose-700 bg-rose-100 dark:text-rose-400 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20",
      },
      {
        name: "AsyncDesk",
        status: "Low Threat",
        color:
          "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20",
      },
    ],
    verdict:
      "Strong Market Gap: Enterprise buyer intent is high with 78% willingness-to-pay validation.",
  },
  {
    id: "scentsync",
    name: "Olfactory AI",
    category: "Hardware + AI",
    prompt: "Wearable micro-diffusion AI for adaptive scent therapy",
    viabilityScore: 89,
    searchVolume: [20, 28, 40, 52, 68, 85, 96],
    timelineLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    volumeLabel: "54.1k / mo",
    growth: "+41.2%",
    revenueProjection: "$2.8M ARR",
    avgWtp: "$120 + $19/mo",
    competitors: [
      {
        name: "AromaTech",
        status: "Moderate",
        color:
          "text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20",
      },
      {
        name: "MoodScent",
        status: "Low Threat",
        color:
          "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20",
      },
    ],
    verdict:
      "High Lock-in: Consumable pod ecosystem guarantees high-margin recurring subscriptions.",
  },
  {
    id: "tax-copilot",
    name: "Tax Copilot",
    category: "Fintech",
    prompt: "Autonomous tax audit and invoice engine for freelancers",
    viabilityScore: 96,
    searchVolume: [50, 60, 68, 75, 82, 91, 100],
    timelineLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    volumeLabel: "142.8k / mo",
    growth: "+18.5%",
    revenueProjection: "$4.2M ARR",
    avgWtp: "$29 - $199/mo",
    competitors: [
      {
        name: "QuickBooks",
        status: "High Threat",
        color:
          "text-rose-700 bg-rose-100 dark:text-rose-400 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20",
      },
      {
        name: "Xero",
        status: "Moderate",
        color:
          "text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20",
      },
    ],
    verdict:
      "Extreme Intent: High switching barriers and immediate, verifiable ROI for paying users.",
  },
];

export default function Hero() {
  const [selectedConcept, setSelectedConcept] = useState(startupConcepts[0]);

  return (
    <section className="relative min-h-[92vh] flex items-center bg-white dark:bg-[#060608] transition-colors duration-300 overflow-hidden pt-24 pb-16 md:pt-32">
      <div className="absolute top-0 inset-x-0 h-150 bg-linear-to-b from-zinc-50 dark:from-zinc-900/50 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-150 h-150 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="w-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={itemVariants}
                className="mb-6 lg:mb-8 inline-flex"
              >
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                  </span>
                  <span>DevLaunch Engine v2.4</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
                  Don&apos;t build in the dark.
                  <br className="hidden sm:block" />
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Validate in seconds.
                  </span>
                </h1>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 lg:mb-10 max-w-lg mx-auto lg:mx-0"
              >
                Stop burning engineering cycles on products nobody wants. Our
                autonomous diagnostic matrix quantifies real market demand,
                projects ARR, and decodes competitor moats before you write a
                single line of code.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <button
                  type="button"
                  className="w-full sm:w-auto h-12 px-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-sm tracking-tight hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
                >
                  <span>Generate Free Report</span>
                  <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                </button>
                <button
                  type="button"
                  className="w-full sm:w-auto h-12 px-8 rounded-full bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium text-sm tracking-tight hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <span>View Documentation</span>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-10 lg:mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-center lg:justify-start gap-4"
              >
                <div className="flex -space-x-2 overflow-hidden">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
                  ].map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt="Active Founder Avatar"
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#060608] object-cover"
                    />
                  ))}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Trusted by{" "}
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    1,400+
                  </span>{" "}
                  founders.
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
          >
            <div className="w-full max-w-lg mx-auto lg:ml-auto lg:mr-0 bg-white/70 dark:bg-zinc-900/40 rounded-[24px] border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-black/50 p-5 sm:p-8 backdrop-blur-xl">
              <div className="flex p-1 space-x-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg mb-6 sm:mb-8 overflow-x-auto hide-scrollbar">
                {startupConcepts.map((concept) => (
                  <button
                    key={concept.id}
                    onClick={() => setSelectedConcept(concept)}
                    className="relative flex-1 min-w-25 py-2 px-3 text-xs sm:text-sm font-medium rounded-md transition-colors outline-none whitespace-nowrap"
                  >
                    {selectedConcept.id === concept.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white dark:bg-zinc-700 shadow-sm rounded-md"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 block truncate transition-colors duration-200 ${
                        selectedConcept.id === concept.id
                          ? "text-zinc-900 dark:text-white"
                          : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                      }`}
                    >
                      {concept.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="min-h-115 sm:min-h-105 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedConcept.id}
                    variants={contentWrapperVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="space-y-6 sm:space-y-8"
                  >
                    <motion.div
                      variants={slideLeftVariant}
                      className="flex flex-col sm:flex-row items-start justify-between gap-4"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">
                          Market Overview
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-70">
                          {selectedConcept.prompt}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end sm:text-right shrink-0 mt-2 sm:mt-0">
                        <span className="text-4xl font-light tracking-tighter text-zinc-900 dark:text-white">
                          {selectedConcept.viabilityScore}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                          Viability Score
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={popInVariant}
                      className="grid grid-cols-3 gap-2 sm:gap-4 py-5 sm:py-6 border-y border-zinc-200 dark:border-zinc-800"
                    >
                      <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 font-medium">
                          Target ARR
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white">
                          {selectedConcept.revenueProjection}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 font-medium">
                          Est. WTP
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white">
                          {selectedConcept.avgWtp}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 font-medium flex items-center gap-1">
                          Growth{" "}
                          <TrendingUp className="w-3 h-3 text-emerald-500" />
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-emerald-600 dark:text-emerald-400">
                          {selectedConcept.growth}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div variants={popInVariant}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-zinc-400" /> Search
                          Momentum
                        </p>
                        <span className="text-xs font-medium text-zinc-500">
                          {selectedConcept.volumeLabel}
                        </span>
                      </div>

                      <motion.div
                        variants={chartContainerVariants}
                        className="flex items-end justify-between h-28 sm:h-32 gap-1.5 sm:gap-2 pt-6"
                      >
                        {selectedConcept.searchVolume.map((val, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center flex-1 gap-2 group h-full justify-end relative"
                          >
                            <div className="relative w-full flex-1 flex items-end justify-center">
                              <motion.div
                                custom={val}
                                variants={barVariants}
                                className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-t-sm relative group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors cursor-pointer"
                              >
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-200 pointer-events-none z-20">
                                  <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-md whitespace-nowrap">
                                    {val}
                                  </span>
                                </div>

                                <div className="absolute top-0 inset-x-0 h-1 bg-zinc-400 dark:bg-zinc-600 rounded-t-sm group-hover:bg-indigo-500 transition-colors" />
                              </motion.div>
                            </div>
                            <span className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 font-medium uppercase mt-1">
                              {selectedConcept.timelineLabels[i]}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    </motion.div>

                    <motion.div
                      variants={slideRightVariant}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">
                          AI Strategy Analysis
                        </p>
                      </div>

                      <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-200 dark:border-zinc-800/80 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed shadow-sm">
                        {selectedConcept.verdict}
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row gap-2 sm:gap-3">
                        {selectedConcept.competitors.map((comp, idx) => (
                          <div
                            key={idx}
                            className="flex-1 flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 shadow-sm"
                          >
                            <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                              {comp.name}
                            </span>
                            <span
                              className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${comp.color}`}
                            >
                              {comp.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Lock,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Subtle dot pattern for the report background
const ReportBackground = () => (
  <svg
    className="absolute inset-0 h-full w-full stroke-black/[0.03] dark:stroke-white/[0.03] [mask-image:linear-gradient(to_bottom,white_20%,transparent_80%)] opacity-10"
    fill="none"
  >
    <defs>
      <pattern
        id="report-dots"
        width="16"
        height="16"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="2" cy="2" r="1" fill="currentColor" stroke="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#report-dots)" />
  </svg>
);

export default function SampleReport() {
  return (
    <section className="relative py-32 bg-white dark:bg-[#0A0A0A] overflow-hidden selection:bg-violet-500/30 border-t border-zinc-100 dark:border-white/5">
      {/* High-end ambient background */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-zinc-50/50 via-transparent to-transparent dark:from-white/[0.02] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/5 dark:bg-emerald-500/5 blur-[120px] rounded-[100%] pointer-events-none opacity-50" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-sm font-mono font-medium tracking-widest text-emerald-600 dark:text-emerald-400 uppercase mb-6">
              The Output
            </h2>
            <h3 className="text-5xl md:text-6xl font-medium tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-8">
              Stop guessing. <br className="hidden md:block" />
              <span className="text-zinc-400 dark:text-zinc-600">
                Look at the data.
              </span>
            </h3>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Here is a sneak peek at a DevLaunch validation report. Real
              competitor data, actionable frameworks, and deterministic growth
              projections.
            </p>
          </motion.div>
        </div>

        {/* The Mock App Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative max-w-5xl mx-auto rounded-[2rem] border border-zinc-200/50 dark:border-white/10 bg-zinc-50/80 dark:bg-[#111111]/80 shadow-2xl overflow-hidden backdrop-blur-2xl"
        >
          {/* Abstract Glass Window Header */}
          <div className="flex items-center px-6 py-4 border-b border-zinc-200/50 dark:border-white/5 bg-white/50 dark:bg-white/[0.02]">
            <div className="flex gap-2.5 group">
              <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-red-400 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-amber-400 transition-colors delay-75" />
              <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-emerald-400 transition-colors delay-150" />
            </div>
            <div className="mx-auto flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full">
              <Lock className="w-3 h-3" />
              report_ai_crm_landscapers.pdf
            </div>
            {/* Spacer to balance the flex layout */}
            <div className="w-[52px]" />
          </div>

          {/* Report Content */}
          <div className="p-8 md:p-14 relative min-h-[600px]">
            <ReportBackground />

            {/* Header Section */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-zinc-200/50 dark:border-white/5 pb-10">
              <div>
                <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 mb-4 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Idea Validation Output
                </div>
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-900 dark:text-white mb-3">
                  AI-Powered CRM for Landscapers
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5">
                    B2B SaaS
                  </span>
                  <span>•</span>
                  <span>North America</span>
                  <span>•</span>
                  <span>12,500 Est. Monthly Search Vol</span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-wider font-mono">
                  Viability Score
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-light tracking-tighter text-zinc-900 dark:text-white leading-none">
                    84
                  </span>
                  <span className="text-xl text-zinc-400 dark:text-zinc-600 font-light">
                    /100
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Data Section */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              {/* SWOT Highlight */}
              <div className="space-y-6">
                <h4 className="text-sm font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 flex items-center gap-3">
                  <Target className="w-4 h-4 text-zinc-400" /> Executive SWOT
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/5 shadow-sm">
                    <div className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Strength
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Highly fragmented market with deeply outdated legacy
                      competitors.
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/5 shadow-sm">
                    <div className="text-amber-600 dark:text-amber-400 text-sm font-medium mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Threat
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      High churn risk during winter off-seasons in northern
                      climates.
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Size (TAM/SAM/SOM) */}
              <div className="space-y-6">
                <h4 className="text-sm font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-zinc-400" /> Market Size
                  (US)
                </h4>
                <div className="space-y-5 p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/5 shadow-sm">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                        TAM{" "}
                        <span className="hidden sm:inline font-normal opacity-70">
                          (Total Addressable)
                        </span>
                      </span>
                      <span className="font-mono text-zinc-900 dark:text-white">
                        $1.2B
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-zinc-300 dark:bg-zinc-600 w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                        SAM{" "}
                        <span className="hidden sm:inline font-normal opacity-70">
                          (Serviceable Available)
                        </span>
                      </span>
                      <span className="font-mono text-zinc-900 dark:text-white">
                        $340M
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 dark:bg-blue-500 w-[45%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                        SOM{" "}
                        <span className="hidden sm:inline font-normal opacity-70">
                          (Serviceable Obtainable)
                        </span>
                      </span>
                      <span className="font-mono text-zinc-900 dark:text-white">
                        $12M
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-emerald-500 w-[15%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Blur Overlay (The Tease) */}
            <div className="relative">
              {/* Skeleton content under blur */}
              <div className="opacity-40 select-none pointer-events-none filter blur-[6px]">
                <h4 className="text-sm font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6">
                  Competitor Matrix & Pricing Strategy
                </h4>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="h-32 w-full bg-white dark:bg-white/5 rounded-2xl border border-zinc-200 dark:border-white/10" />
                  <div className="h-32 w-full bg-white dark:bg-white/5 rounded-2xl border border-zinc-200 dark:border-white/10" />
                  <div className="h-32 w-full bg-white dark:bg-white/5 rounded-2xl border border-zinc-200 dark:border-white/10" />
                </div>
                <div className="h-4 w-3/4 bg-zinc-200 dark:bg-white/10 rounded-md mb-2" />
                <div className="h-4 w-1/2 bg-zinc-200 dark:bg-white/10 rounded-md" />
              </div>

              {/* Unlock Overlay Gradient & CTA */}
              <div className="absolute inset-x-0 -bottom-14 h-[400px] flex flex-col items-center justify-end bg-gradient-to-t from-zinc-50 via-zinc-50/95 to-transparent dark:from-[#111111] dark:via-[#111111]/95 dark:to-transparent z-20 pb-16">
                <div className="flex flex-col items-center text-center max-w-md px-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm mb-6 relative">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl" />
                    <Lock className="w-5 h-5 text-zinc-900 dark:text-white relative z-10" />
                  </div>

                  <h4 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-3">
                    Unlock the full 10-page report
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                    View competitor weaknesses, 3-year revenue projections,
                    go-to-market strategy, and SEO keywords.
                  </p>

                  <Button className="h-12 px-8 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium rounded-full transition-all duration-300 hover:scale-105 group shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                    Generate Your Report
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

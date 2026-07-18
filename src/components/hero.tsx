"use client";

import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Terminal,
  Activity,
  Box,
  LineChart,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- ANIMATION VARIANTS ---
const fadeUpContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const windowVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
      delay: 0.3,
    },
  },
};

const terminalContainer: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.7,
      staggerChildren: 0.4,
    },
  },
};

const terminalLine: Variants = {
  hidden: { opacity: 0, x: -10, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen overflow-hidden bg-white dark:bg-[#0A0A0A] pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col items-center selection:bg-violet-500/30">
      {/* Sleek Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Primary Top Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-500/10 dark:bg-violet-500/15 blur-[120px] rounded-[100%] pointer-events-none opacity-60"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        {/* --- HERO TEXT SECTION --- */}
        <motion.div
          variants={fadeUpContainer}
          initial="hidden"
          animate="show"
          className="text-center max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUpItem} className="mb-8">
            <Link
              href="/changelog"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-200/50 dark:border-violet-500/20 text-violet-700 dark:text-violet-300 text-sm font-medium hover:bg-violet-100 dark:hover:bg-violet-500/20 transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span>DevLaunch AI Engine 2.0 is live</span>
              <span className="w-px h-3 bg-violet-200 dark:bg-violet-500/30 mx-1" />
              <span className="flex items-center gap-1">
                Read release <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUpItem}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]"
          >
            Don&apos;t build in the dark.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800 dark:from-zinc-400 dark:to-zinc-600">
              Validate it first.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpItem}
            className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl px-4 leading-relaxed"
          >
            Stop wasting months on products nobody wants. Our AI analyzes the
            market, projects revenue, and uncovers competitor weaknesses in
            seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpItem}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button
              onClick={() => router.push("/dashboard")}
              size="lg"
              className="h-12 px-8 text-base rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl shadow-zinc-900/10 dark:shadow-white/10 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all active:scale-[0.98] group"
            >
              Generate Report
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base rounded-full border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 backdrop-blur-sm transition-all active:scale-[0.98]"
            >
              <Link href="#how-it-works">View example</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* --- SLEEK DASHBOARD VISUAL --- */}
        <motion.div
          variants={windowVariants}
          initial="hidden"
          animate="show"
          className="mt-20 w-full max-w-4xl relative"
        >
          {/* Ambient Window Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-2xl opacity-50 dark:opacity-30 rounded-[2rem]" />

          <div className="relative rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Window Header */}
            <div
              className="h-12 border-b border-zinc-200/80 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center px-4 gap-4"
              aria-hidden="true"
            >
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-white/5 text-xs text-zinc-500 font-mono shadow-sm">
                  <Terminal className="w-3 h-3" />
                  report_saas_analysis.json
                </div>
              </div>
            </div>

            {/* Window Body */}
            <div className="p-6 sm:p-10 flex flex-col gap-8">
              {/* Header inside window */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-white/5 pb-6">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-1">
                    Market Viability Score
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Based on 14,023 market signals
                  </p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 tracking-tighter">
                    87
                  </span>
                  <span className="text-zinc-500 font-medium">/ 100</span>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-100 dark:border-white/5 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/60 transition-colors">
                  <Activity className="w-5 h-5 text-violet-500 mb-3" />
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    Total Addressable Market
                  </div>
                  <div className="text-lg font-semibold text-zinc-900 dark:text-white">
                    $2.4B
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-100 dark:border-white/5 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/60 transition-colors">
                  <Box className="w-5 h-5 text-violet-500 mb-3" />
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    Direct Competitors
                  </div>
                  <div className="text-lg font-semibold text-zinc-900 dark:text-white">
                    4 Active
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-100 dark:border-white/5 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/60 transition-colors">
                  <LineChart className="w-5 h-5 text-violet-500 mb-3" />
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    Trend Trajectory
                  </div>
                  <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                    +14% YoY
                  </div>
                </div>
              </div>

              {/* Console Output Footer */}
              <motion.div
                variants={terminalContainer}
                initial="hidden"
                animate="show"
                className="mt-4 bg-zinc-950 dark:bg-[#050505] rounded-lg p-5 font-mono text-xs text-zinc-400 flex flex-col gap-3 shadow-inner border border-zinc-800/50"
              >
                <motion.div
                  variants={terminalLine}
                  className="flex items-center gap-3"
                >
                  <Cpu className="w-3.5 h-3.5 text-violet-500" />
                  <span>Initializing DevLaunch AI Engine...</span>
                </motion.div>

                <motion.div
                  variants={terminalLine}
                  className="flex items-center gap-3"
                >
                  <span className="text-emerald-500">✔</span>
                  <span>Analyzing pricing models... Done.</span>
                </motion.div>

                <motion.div
                  variants={terminalLine}
                  className="flex items-center gap-3"
                >
                  <span className="text-emerald-500">✔</span>
                  <span>
                    Evaluating search intent volume... High traction detected.
                  </span>
                </motion.div>

                <motion.div
                  variants={terminalLine}
                  className="flex items-center gap-3"
                >
                  <span className="text-violet-400 animate-pulse">⠋</span>
                  <span className="text-zinc-100">
                    Compiling final presentation...
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

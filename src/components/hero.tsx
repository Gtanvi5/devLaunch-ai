"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Activity,
  Search,
  ShieldCheck,
} from "lucide-react";

// Framer Motion Variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-white dark:bg-[#0A0A0A] overflow-hidden selection:bg-violet-500/30 pt-24 pb-16 md:pt-32">
      {/* High-end ambient background */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-violet-50/80 via-transparent to-transparent dark:from-violet-950/20 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-violet-500/5 dark:bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* PART 1: LEFT SIDE (Editorial Copy) */}
          <div className="max-w-2xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {/* Mono Label */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-8 bg-violet-500/50" />
                <h2 className="text-sm font-mono font-medium tracking-widest text-violet-600 dark:text-violet-400 uppercase">
                  DevLaunch AI 2.0
                </h2>
              </motion.div>

              {/* Headline */}
              <motion.div variants={itemVariants}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-6">
                  Don&apos;t build in the dark. <br />
                  <span className="bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
                    Validate it first.
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg mb-10"
              >
                Stop wasting months on products nobody wants. Our AI analyzes
                market demand, projects revenue, and uncovers competitor
                weaknesses in seconds.
              </motion.p>

              {/* High-end CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <button
                  aria-label="Generate Free Report"
                  className="w-full sm:w-auto h-14 px-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium tracking-tight hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-amber-400 dark:group-hover:text-amber-500 transition-colors" />
                  Generate Free Report
                </button>
                <button
                  aria-label="View Sample Report"
                  className="w-full sm:w-auto h-14 px-8 rounded-full bg-transparent border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white font-medium tracking-tight hover:bg-zinc-50 dark:hover:bg-white/[0.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 transition-all flex items-center justify-center gap-2 group"
                >
                  View Sample
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* PART 2: RIGHT SIDE (Abstract Technical Visual) */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", x: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-auto w-full max-w-lg"
          >
            {/* Wrapping div for the gentle continuous float */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* The Main Glass Container */}
              <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-50/50 dark:bg-zinc-900/20 backdrop-blur-md border border-zinc-200/50 dark:border-white/[0.05] p-8 lg:p-10 shadow-2xl shadow-zinc-200/20 dark:shadow-black/40 group">
                {/* Internal Grid Background */}
                <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714416041/grid_1_uzvjjd.svg')] opacity-[0.03] dark:opacity-[0.05] bg-center group-hover:opacity-[0.05] dark:group-hover:opacity-[0.08] transition-opacity duration-700" />

                {/* Abstract UI Elements */}
                <div className="relative z-10 flex flex-col gap-6">
                  {/* Search / Input Simulation */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-zinc-200/50 dark:border-white/[0.05] shadow-sm">
                    <Search className="w-5 h-5 text-violet-500/70" />
                    <div className="flex-1 font-mono text-sm text-zinc-500 dark:text-zinc-400 truncate">
                      Analyzing &quot;B2B SaaS for remote teams&quot;...
                    </div>
                    <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                  </div>

                  {/* Animated Scanning Block */}
                  <div className="relative h-48 rounded-2xl border border-zinc-200/50 dark:border-white/[0.05] bg-white/30 dark:bg-black/20 overflow-hidden p-6 flex flex-col justify-between shadow-sm">
                    {/* Scanning Line Animation */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-violet-500/10 dark:to-violet-500/20 animate-[scan_2.5s_ease-in-out_infinite_alternate]" />

                    <div className="flex justify-between items-start relative z-10">
                      <div>
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-1">
                          Market Viability
                        </h3>
                        <p className="text-xs text-zinc-500">
                          14,203 data points processed
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                      </div>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-4xl font-medium tracking-tighter text-zinc-900 dark:text-white leading-none">
                          87
                        </span>
                        <span className="text-sm font-medium text-zinc-500 mb-1">
                          / 100
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "87%" }}
                          transition={{
                            duration: 1.5,
                            delay: 0.8,
                            ease: "easeOut",
                          }}
                          className="h-full bg-violet-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Micro Data Points */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-zinc-200/50 dark:border-white/[0.05] shadow-sm">
                      <div className="text-xs font-mono text-zinc-500 mb-2">
                        COMPETITORS
                      </div>
                      <div className="text-lg font-medium text-zinc-900 dark:text-white">
                        Low Threat
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-zinc-200/50 dark:border-white/[0.05] shadow-sm">
                      <div className="text-xs font-mono text-zinc-500 mb-2">
                        TAM
                      </div>
                      <div className="text-lg font-medium text-zinc-900 dark:text-white">
                        $2.4B
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Floating Element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -right-6 -bottom-6 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/10 shadow-xl flex items-center gap-3 backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-900 dark:text-white leading-none">
                  Safe to Build
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  High purchase intent
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Required for the scanning animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `,
        }}
      />
    </section>
  );
}

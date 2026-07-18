"use client";

import {
  BrainCircuit,
  TrendingUp,
  Crosshair,
  Rocket,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <section className="relative py-32 bg-white dark:bg-[#0A0A0A] overflow-hidden selection:bg-violet-500/30">
      {/* High-end ambient background */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-violet-50/50 via-transparent to-transparent dark:from-violet-950/20 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-violet-500/5 dark:bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Editorial-style Header */}
        <div className="max-w-2xl mb-24">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-violet-500/50" />
              <h2 className="text-sm font-mono font-medium tracking-widest text-violet-600 dark:text-violet-400 uppercase">
                Validation Engine 2.0
              </h2>
            </div>

            <h3 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-8">
              Don't guess. <br />
              <span className="bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
                Know before you build.
              </span>
            </h3>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
              We've distilled the exact frameworks used by tier-one venture
              capitalists into an AI engine that stress-tests your idea in
              seconds.
            </p>
          </motion.div>
        </div>

        {/* Dynamic Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* FEATURE 1: SWOT (Large Span) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8 group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-zinc-50/50 dark:bg-zinc-900/20 backdrop-blur-md border border-zinc-200/50 dark:border-white/[0.05] transition-all duration-500 hover:bg-zinc-50/80 dark:hover:bg-white/[0.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Abstract Graphic */}
            <div className="absolute right-0 top-0 w-2/3 h-full overflow-hidden pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-700">
              <div className="absolute -right-20 -top-20 w-[400px] h-[400px] border-[1px] border-violet-500/20 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute -right-10 -top-10 w-[300px] h-[300px] border-[1px] border-violet-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
              <div className="absolute top-20 right-20 w-[200px] h-[200px] border-[1px] border-violet-400/30 rounded-full border-dashed animate-[spin_20s_linear_infinite]" />
            </div>

            <div className="relative z-10 p-10 md:p-14">
              <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <BrainCircuit className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <h4 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4">
                AI-Powered SWOT Architecture
              </h4>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed mb-12">
                Instantly map out Strengths, Weaknesses, Opportunities, and
                Threats using real-time market data and predictive modeling.
              </p>

              {/* Minimalist Data Representation */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 max-w-md">
                {[
                  "Market Fit",
                  "Risk Profile",
                  "Moat Potential",
                  "Scalability",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="h-px w-8 bg-violet-500/30 group-hover:w-12 group-hover:bg-violet-500 transition-all duration-500"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    />
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FEATURE 2: Projections (Tall Vertical) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-zinc-50/50 dark:bg-zinc-900/20 backdrop-blur-md border border-zinc-200/50 dark:border-white/[0.05] transition-all duration-500 hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] min-h-[480px]"
          >
            {/* Subtle Chart Grid Background */}
            <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714416041/grid_1_uzvjjd.svg')] opacity-[0.03] dark:opacity-[0.05] bg-center [mask-image:linear-gradient(to_bottom,white,transparent)]" />

            <div className="p-10 md:p-12 relative z-10 flex-1 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4">
                3-Year Revenue <br /> Projections
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                Deterministic financial models calculating MRR velocity based on
                your specific acquisition channels.
              </p>
            </div>

            {/* Elegant SVG Curve */}
            <div className="h-48 w-full mt-auto relative overflow-visible">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <svg
                viewBox="0 0 200 100"
                className="w-full h-full preserve-3d relative z-10"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="line-gradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0,100 Q40,90 80,60 T160,30 T200,10"
                  fill="none"
                  stroke="url(#line-gradient)"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <circle
                  cx="200"
                  cy="10"
                  r="4"
                  className="fill-emerald-500 animate-pulse"
                />
              </svg>
            </div>
          </motion.div>

          {/* FEATURE 3: Competitors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-6 group relative overflow-hidden rounded-[2.5rem] bg-zinc-50/50 dark:bg-zinc-900/20 backdrop-blur-md border border-zinc-200/50 dark:border-white/[0.05] transition-all duration-500 hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] p-10 md:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10 h-full">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Crosshair className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                </div>
                <h4 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-3">
                  Vulnerability Mapping
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                  Analyze competitor sentiment and discover exactly where
                  incumbents are dropping the ball.
                </p>
              </div>

              {/* Minimal Radar UI */}
              <div className="relative w-32 h-32 shrink-0">
                <div className="absolute inset-0 rounded-full border border-rose-500/20 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-4 rounded-full border border-rose-500/30 group-hover:scale-90 transition-transform duration-700" />
                <div className="absolute inset-8 rounded-full border border-rose-500/40" />
                <div className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-gradient-to-r from-rose-500/80 to-transparent origin-left animate-[spin_3s_linear_infinite]" />
                <ShieldAlert className="absolute top-1/4 right-1/4 w-4 h-4 text-rose-500/80" />
              </div>
            </div>
          </motion.div>

          {/* FEATURE 4: GTM Strategy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-6 group relative overflow-hidden rounded-[2.5rem] bg-zinc-50/50 dark:bg-zinc-900/20 backdrop-blur-md border border-zinc-200/50 dark:border-white/[0.05] transition-all duration-500 hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] p-10 md:p-12 flex flex-col justify-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Rocket className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
              <div className="max-w-xs">
                <h4 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-3">
                  Go-To-Market Blueprint
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                  A step-by-step launch sequence tailored to your exact niche
                  and target ICP.
                </p>
              </div>

              {/* Sleek Action Button Indicator */}
              <div className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 group-hover:translate-x-2 transition-transform duration-300">
                Generate Plan
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Background Accent */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/5 blur-[60px] rounded-full group-hover:bg-amber-500/10 transition-colors duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

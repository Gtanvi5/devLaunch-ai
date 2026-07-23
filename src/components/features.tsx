"use client";

import {
  BrainCircuit,
  TrendingUp,
  Crosshair,
  Rocket,
  ArrowRight,
  ShieldAlert,
  Activity,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <section className="relative py-20 md:py-32 bg-zinc-50 dark:bg-[#09090b] overflow-hidden selection:bg-violet-500/30 font-sans">
      <div className="absolute top-0 inset-x-0 h-200 bg-linear-to-b from-zinc-200/60 via-transparent to-transparent dark:from-violet-950/20 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-125 md:w-200 h-125 md:h-200 bg-violet-500/10 dark:bg-violet-500/15 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 dark:bg-violet-500/20 border border-violet-500/20 dark:border-violet-500/30 mb-6">
              <Zap className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-violet-600 dark:text-violet-400">
                Validation Engine 2.0
              </span>
            </div>

            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-6 md:mb-8">
              Don&apos;t guess. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-zinc-500 to-zinc-800 dark:from-zinc-400 dark:to-white">
                Know before you build.z
              </span>
            </h3>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              We&apos;ve distilled the exact frameworks used by tier-one venture
              capitalists into an AI engine that stress-tests your idea in
              seconds.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {/* FEATURE 1*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-12 lg:col-span-8 group relative flex flex-col justify-between overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-white/5 shadow-xl shadow-zinc-200/50 dark:shadow-none transition-all duration-500 hover:border-violet-500/30"
          >
            <div className="absolute inset-0 bg-linear-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 p-6 sm:p-10 md:p-12 lg:pr-40 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-violet-100 dark:group-hover:bg-violet-500/20 group-hover:border-violet-200 dark:group-hover:border-violet-500/30 transition-all duration-500">
                  <BrainCircuit className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4">
                  Multi-Agent Market Analysis
                </h4>
                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed mb-8 sm:mb-12">
                  Our engine spins up a virtual Marketer, Developer, and
                  Investor to debate your idea, mapping out Strengths,
                  Weaknesses, and Moats.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4 max-w-sm mt-auto">
                {[
                  {
                    label: "Market Fit Potential",
                    width: "w-[85%]",
                    color: "bg-violet-500 dark:bg-violet-500",
                  },
                  {
                    label: "Technical Complexity",
                    width: "w-[40%]",
                    color: "bg-zinc-400 dark:bg-zinc-600",
                  },
                  {
                    label: "Incumbent Threat",
                    width: "w-[65%]",
                    color: "bg-rose-500 dark:bg-rose-500",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      <span>{item.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800/80 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out`}
                        style={{
                          width: item.width,
                          transitionDelay: `${i * 150}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-75 h-75 lg:w-100 lg:h-100 opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none hidden md:block">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-[spin_60s_linear_infinite]"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  className="text-violet-500"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2 6"
                  className="text-violet-500"
                />
              </svg>
            </div>
          </motion.div>

          {/* FEATURE 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-12 lg:col-span-4 group relative flex flex-col overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-white/5 shadow-xl shadow-zinc-200/50 dark:shadow-none transition-all duration-500 hover:border-emerald-500/30 min-h-100 lg:min-h-120"
          >
            <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714416041/grid_1_uzvjjd.svg')] opacity-[0.03] dark:opacity-[0.05] bg-center mask-[linear-gradient(to_bottom,white,transparent)]" />

            <div className="p-6 sm:p-10 relative z-10 flex-1 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 group-hover:border-emerald-200 dark:group-hover:border-emerald-500/30 transition-all duration-500">
                <TrendingUp className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
              </div>
              <h4 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-3 sm:mb-4">
                3-Year Revenue Projections
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm mb-6">
                Deterministic financial models calculating MRR velocity based on
                your specific acquisition channels.
              </p>

              <div className="mt-auto self-start flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md border border-zinc-200 dark:border-white/10 shadow-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-xs font-bold text-zinc-900 dark:text-white">
                  +324% YoY Growth
                </span>
              </div>
            </div>

            <div className="h-32 sm:h-40 w-full relative overflow-hidden -mt-4">
              <svg
                viewBox="0 0 200 100"
                className="w-full h-full preserve-3d relative z-10 scale-110 translate-y-4"
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
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient
                    id="fill-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <motion.path
                  d="M0,100 Q40,90 80,60 T160,30 T200,10 L200,100 L0,100 Z"
                  fill="url(#fill-gradient)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />

                <motion.path
                  d="M0,100 Q40,90 80,60 T160,30 T200,10"
                  fill="none"
                  stroke="url(#line-gradient)"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </motion.div>

          {/* FEATURE 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-6 group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-white/5 shadow-xl shadow-zinc-200/50 dark:shadow-none transition-all duration-500 hover:border-rose-500/30 p-6 sm:p-10"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-transparent to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center relative z-10 h-full">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-100 dark:group-hover:bg-rose-500/20 group-hover:border-rose-200 dark:group-hover:border-rose-500/30 transition-all duration-500">
                  <Crosshair className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors" />
                </div>
                <h4 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-3">
                  Vulnerability Mapping
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                  Analyze competitor sentiment and discover exactly where
                  incumbents are bleeding customers.
                </p>
              </div>

              <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center mx-auto sm:mx-0">
                <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-white/10 group-hover:border-rose-500/30 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-3 sm:inset-4 rounded-full border border-zinc-200 dark:border-white/10 group-hover:border-rose-500/40 group-hover:scale-90 transition-all duration-700" />
                <div className="absolute inset-6 sm:inset-8 rounded-full border border-zinc-200 dark:border-white/10 group-hover:border-rose-500/50" />

                <div className="absolute top-1/2 left-1/2 w-1/2 h-px bg-linear-to-r from-rose-500/0 via-rose-500/80 to-transparent origin-left animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)] opacity-0 group-hover:opacity-100 transition-opacity delay-300 duration-500" />
                <div className="absolute bottom-1/3 left-1/4 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)] opacity-0 group-hover:opacity-100 transition-opacity delay-700 duration-500" />

                <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-rose-500 transition-colors duration-500 relative z-10" />
              </div>
            </div>
          </motion.div>

          {/* FEATURE 4*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-6 group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-white/5 shadow-xl shadow-zinc-200/50 dark:shadow-none transition-all duration-500 hover:border-amber-500/30 p-6 sm:p-10 flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:bg-amber-100 dark:group-hover:bg-amber-500/20 group-hover:border-amber-200 dark:group-hover:border-amber-500/30 transition-all duration-500">
              <Rocket className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
            </div>

            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 relative z-10">
              <div className="max-w-xs">
                <h4 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-3">
                  Go-To-Market Blueprint
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                  A step-by-step launch sequence tailored to your exact niche
                  and target Ideal Customer Profile (ICP).
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                <span className="group-hover:-translate-x-1 transition-transform duration-300">
                  Generate Plan
                </span>
                <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </div>

            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/10 dark:bg-amber-500/15 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

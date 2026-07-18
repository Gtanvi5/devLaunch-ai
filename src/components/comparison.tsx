"use client";

import { motion } from "framer-motion";
import { Check, Minus, Sparkles, Bot, Search, X } from "lucide-react";

// Subtle technical grid to match the previous component
const AppWindowGrid = () => (
  <svg
    className="absolute inset-0 h-full w-full stroke-black/[0.02] dark:stroke-white/[0.02] [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)] pointer-events-none"
    fill="none"
  >
    <defs>
      <pattern
        id="app-grid"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <path d="M 20 0 L 0 0 0 20" fill="none" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#app-grid)" />
  </svg>
);

const comparisonData = [
  {
    feature: "Live Web & SEO Data",
    manual: false,
    chatgpt: false,
    devlaunch: true,
  },
  {
    feature: "Specific Venture Frameworks (SWOT, TAM)",
    manual: true,
    chatgpt: "Basic",
    devlaunch: "Advanced",
  },
  {
    feature: "3-Year Revenue Projections",
    manual: false,
    chatgpt: "Hallucinated",
    devlaunch: true,
  },
  {
    feature: "Direct Competitor Analysis",
    manual: true,
    chatgpt: false,
    devlaunch: true,
  },
  {
    feature: "Polished PDF/Notion Exports",
    manual: false,
    chatgpt: false,
    devlaunch: true,
  },
  {
    feature: "Time to Complete",
    manual: "3-5 Days",
    chatgpt: "3-4 Hours",
    devlaunch: "2 Minutes",
  },
];

export default function Comparison() {
  return (
    <section className="relative py-32 bg-white dark:bg-[#0A0A0A] overflow-hidden selection:bg-violet-500/30 border-t border-zinc-100 dark:border-white/5">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-500/5 dark:bg-violet-500/10 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-sm font-mono font-medium tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-6">
              The Alternatives
            </h2>
            <h3 className="text-5xl md:text-6xl font-medium tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-8">
              Why not just use <br className="hidden md:block" />
              <span className="text-zinc-300 dark:text-zinc-700 relative inline-block">
                <span className="relative z-10">ChatGPT?</span>
                <span className="absolute left-0 top-1/2 w-full h-[3px] -translate-y-1/2 bg-red-500/80 -rotate-2 z-20 rounded-full" />
              </span>
            </h3>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Generic AI gives you generic advice. DevLaunch uses a specialized
              multi-agent workflow that actually browses the web, analyzes real
              competitors, and calculates real math.
            </p>
          </motion.div>
        </div>

        {/* Premium Glass Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative max-w-5xl mx-auto rounded-[2rem] border border-zinc-200/80 dark:border-white/10 bg-white/50 dark:bg-zinc-900/40 shadow-2xl shadow-zinc-200/50 dark:shadow-black/50 overflow-hidden backdrop-blur-2xl"
        >
          <AppWindowGrid />

          {/* Table Wrapper (Handles overflow gracefully) */}
          <div className="relative overflow-x-auto custom-scrollbar z-10">
            <div className="min-w-[800px] md:min-w-full relative pb-4 pt-2">
              {/* Highlight Column Background (Spans full height of table) */}
              <div className="absolute top-0 right-0 bottom-0 w-[25%] bg-violet-500/[0.03] dark:bg-violet-500/[0.05] border-x border-violet-500/10 dark:border-violet-400/10 pointer-events-none">
                {/* Top Glowing Edge */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-4 px-8 pb-6 pt-8 border-b border-zinc-200/50 dark:border-white/5 relative">
                <div className="col-span-1" />

                {/* Manual Column */}
                <div className="col-span-1 flex flex-col items-center text-center">
                  <Search className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mb-3" />
                  <h3 className="font-medium tracking-tight text-zinc-900 dark:text-white">
                    Manual Research
                  </h3>
                  <p className="text-xs font-mono tracking-wider text-zinc-500 mt-1.5 uppercase">
                    Google & Excel
                  </p>
                </div>

                {/* Generic AI Column */}
                <div className="col-span-1 flex flex-col items-center text-center">
                  <Bot className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mb-3" />
                  <h3 className="font-medium tracking-tight text-zinc-900 dark:text-white">
                    Generic AI
                  </h3>
                  <p className="text-xs font-mono tracking-wider text-zinc-500 mt-1.5 uppercase">
                    ChatGPT / Claude
                  </p>
                </div>

                {/* DevLaunch Column */}
                <div className="col-span-1 flex flex-col items-center text-center relative z-10">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/10 dark:bg-violet-500/20 mb-2">
                    <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="font-semibold tracking-tight text-violet-600 dark:text-violet-400">
                    DevLaunch AI
                  </h3>
                  <p className="text-xs font-mono tracking-wider text-violet-500/70 mt-1.5 uppercase">
                    Multi-Agent
                  </p>
                </div>
              </div>

              {/* Table Body */}
              <div className="relative">
                {comparisonData.map((row, index) => (
                  <motion.div
                    key={row.feature}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`grid grid-cols-4 px-8 py-5 items-center group transition-colors hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] ${
                      index !== comparisonData.length - 1
                        ? "border-b border-zinc-200/50 dark:border-white/5"
                        : ""
                    }`}
                  >
                    {/* Feature Label */}
                    <div className="col-span-1 text-sm font-medium text-zinc-700 dark:text-zinc-300 pr-4">
                      {row.feature}
                    </div>

                    {/* Manual Cell */}
                    <div className="col-span-1 flex justify-center">
                      {typeof row.manual === "boolean" ? (
                        row.manual ? (
                          <Check
                            className="w-5 h-5 text-zinc-400 dark:text-zinc-500"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <Minus
                            className="w-4 h-4 text-zinc-300 dark:text-zinc-700"
                            strokeWidth={2}
                          />
                        )
                      ) : (
                        <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
                          {row.manual}
                        </span>
                      )}
                    </div>

                    {/* ChatGPT Cell */}
                    <div className="col-span-1 flex justify-center">
                      {typeof row.chatgpt === "boolean" ? (
                        row.chatgpt ? (
                          <Check
                            className="w-5 h-5 text-zinc-400 dark:text-zinc-500"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <Minus
                            className="w-4 h-4 text-zinc-300 dark:text-zinc-700"
                            strokeWidth={2}
                          />
                        )
                      ) : (
                        <span
                          className={`text-sm font-mono ${row.chatgpt === "Hallucinated" ? "text-amber-600/80 dark:text-amber-400/80" : "text-zinc-500 dark:text-zinc-400"}`}
                        >
                          {row.chatgpt}
                        </span>
                      )}
                    </div>

                    {/* DevLaunch Cell */}
                    <div className="col-span-1 flex justify-center relative z-10">
                      {typeof row.devlaunch === "boolean" ? (
                        row.devlaunch ? (
                          <Check
                            className="w-5 h-5 text-violet-600 dark:text-violet-400"
                            strokeWidth={3}
                          />
                        ) : (
                          <X className="w-5 h-5 text-red-500" strokeWidth={3} />
                        )
                      ) : (
                        <span className="text-sm font-mono font-medium text-violet-600 dark:text-violet-400">
                          {row.devlaunch}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

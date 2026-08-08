"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    accent: "text-amber-500 dark:text-amber-400",
    priceMonthly: "$0",
    priceAnnual: "$0",
    subtext: "It's free so why not",
    features: [
      { text: "1 AI Analysis per month", included: true },
      { text: "Standard SWOT Framework", included: true },
      { text: "PDF Export", included: false },
      { text: "Competitor Deep-Dive", included: false },
      { text: "Private Notion Export", included: false },
      { text: "24/7 Priority Support", included: false },
    ],
    cta: "Request Access",
    isPopular: false,
  },
  {
    name: "Pro",
    accent: "text-violet-500 dark:text-violet-400",
    priceMonthly: "$49",
    priceAnnual: "$39",
    subtext: "Save $120 per year",
    features: [
      { text: "Unlimited Analyses", included: true },
      { text: "Advanced Revenue Projections", included: true },
      { text: "PDF Export", included: true },
      { text: "Competitor Deep-Dive", included: true },
      { text: "Private Notion Export", included: false },
      { text: "24/7 Priority Support", included: false },
    ],
    cta: "Request Access",
    isPopular: true,
  },
  {
    name: "Agency",
    accent: "text-blue-500 dark:text-blue-400",
    priceMonthly: "$199",
    priceAnnual: "$149",
    subtext: "Save $600 per year",
    features: [
      { text: "Unlimited Analyses", included: true },
      { text: "Advanced Revenue Projections", included: true },
      { text: "PDF Export", included: true },
      { text: "Competitor Deep-Dive", included: true },
      { text: "Private Notion Export", included: true },
      { text: "24/7 Priority Support", included: true },
    ],
    cta: "Request Access",
    isPopular: false,
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section
      id="pricing"
      className="relative py-24 md:py-32 bg-zinc-50 dark:bg-[#0A0A0A] overflow-hidden selection:bg-violet-500/30"
    >
      <div className="absolute top-0 inset-x-0 h-150 bg-linear-to-b from-zinc-100/50 via-transparent to-transparent dark:from-white/2 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-100 bg-violet-500/5 dark:bg-violet-500/10 blur-[120px] rounded-[100%] pointer-events-none opacity-50" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-4">
              Pricing
            </h2>
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg mx-auto mb-10">
              Start for free and upgrade when you need advanced projections,
              exports, and deeper competitor analysis.
            </p>

            <div className="inline-flex items-center p-1 bg-zinc-200/50 dark:bg-white/5 rounded-full border border-zinc-300/50 dark:border-white/10">
              <button
                onClick={() => setIsAnnual(true)}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-colors ${
                  isAnnual
                    ? "text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {isAnnual && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-violet-600 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  Billed yearly
                  <span className="relative overflow-hidden inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-linear-to-r from-emerald-400 to-teal-500 text-white shadow-sm border border-emerald-300/50">
                    <motion.div
                      animate={{ x: ["-100%", "250%"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "linear",
                        repeatDelay: 1.5,
                      }}
                      className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-12"
                    />
                    <span className="relative z-10">SAVE 20%</span>
                  </span>
                </span>
              </button>
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-colors ${
                  !isAnnual
                    ? "text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {!isAnnual && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-violet-600 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Billed monthly</span>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-0 max-w-5xl mx-auto items-center">
          {plans.map((plan, i) => {
            const displayPrice = isAnnual
              ? plan.priceAnnual
              : plan.priceMonthly;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className={`relative flex flex-col backdrop-blur-xl transition-all duration-500 rounded-3xl ${
                  plan.isPopular
                    ? "py-12 px-8 bg-white dark:bg-[#111111] border-2 border-violet-500/50 shadow-2xl shadow-violet-500/10 z-10 md:scale-105"
                    : "py-10 px-8 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 z-0"
                }`}
              >
                <div className="text-center mb-8 relative z-10">
                  <h3
                    className={`text-sm font-medium tracking-wide mb-2 ${plan.accent}`}
                  >
                    {plan.name}
                  </h3>

                  <div className="flex items-center justify-center gap-1 mb-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={displayPrice}
                        initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        transition={{ duration: 0.2 }}
                        className="text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white"
                      >
                        {displayPrice}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-500">
                    per month
                  </span>
                </div>

                <ul className="space-y-4 mb-10 flex-1 relative z-10">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.text}
                      className="flex items-start gap-3 text-sm"
                    >
                      {feature.included ? (
                        <Check
                          className="w-4 h-4 mt-0.5 shrink-0 text-zinc-900 dark:text-white"
                          strokeWidth={2.5}
                        />
                      ) : (
                        <X
                          className="w-4 h-4 mt-0.5 shrink-0 text-zinc-400 dark:text-zinc-600"
                          strokeWidth={2.5}
                        />
                      )}
                      <span
                        className={
                          feature.included
                            ? "text-zinc-700 dark:text-zinc-300"
                            : "text-zinc-500 dark:text-zinc-600"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto relative z-10 text-center">
                  <button
                    className={`w-full h-12 rounded-full font-medium transition-all duration-300 active:scale-[0.98] ${
                      plan.isPopular
                        ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/25"
                        : "bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
                    }`}
                  >
                    {plan.cta}
                  </button>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-500 mt-3 h-4">
                    {isAnnual && displayPrice !== "$0"
                      ? plan.subtext
                      : plan.priceMonthly === "$0"
                        ? plan.subtext
                        : ""}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group"
          >
            View detailed feature comparison
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

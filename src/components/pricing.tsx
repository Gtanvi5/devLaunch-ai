"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for testing your initial idea.",
    priceMonthly: "Free",
    priceAnnual: "Free",
    features: [
      "1 AI Analysis per month",
      "Standard SWOT Framework",
      "PDF Export",
      "Community Support",
    ],
    cta: "Get Started",
    isPopular: false,
  },
  {
    name: "Pro",
    description: "For serious founders ready to build.",
    priceMonthly: "$49",
    priceAnnual: "$39",
    features: [
      "Unlimited Analyses",
      "Advanced Revenue Projections",
      "Competitor Deep-Dive",
      "Private Notion Export",
      "24/7 Priority Support",
    ],
    cta: "Upgrade to Pro",
    isPopular: true,
  },
  {
    name: "Agency",
    description: "For teams and consultants.",
    priceMonthly: "$199",
    priceAnnual: "$149",
    features: [
      "Everything in Pro",
      "White-label Reports",
      "Team Collaboration (up to 5)",
      "API Access",
      "Dedicated Success Manager",
    ],
    cta: "Contact Sales",
    isPopular: false,
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section
      id="pricing"
      className="relative py-32 bg-white dark:bg-[#0A0A0A] overflow-hidden selection:bg-violet-500/30 border-t border-zinc-100 dark:border-white/5"
    >
      {/* Cinematic Ambient Background */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-zinc-50/50 via-transparent to-transparent dark:from-white/[0.02] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-500/5 dark:bg-violet-500/10 blur-[120px] rounded-[100%] pointer-events-none opacity-50" />

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
              The Investment
            </h2>
            <h3 className="text-5xl md:text-6xl font-medium tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-8">
              Simple, transparent <br className="hidden md:block" />
              <span className="text-zinc-400 dark:text-zinc-600">pricing.</span>
            </h3>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Stop guessing. Start building. Choose the plan that fits your
              stage and launch your next idea with confidence.
            </p>

            {/* Apple-style Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span
                className={`text-sm font-medium transition-colors ${
                  !isAnnual
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-400 dark:text-zinc-500"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-7 w-12 items-center rounded-full bg-zinc-200 dark:bg-white/10 border border-zinc-300/50 dark:border-white/5 transition-colors focus:outline-none"
              >
                <span className="sr-only">Toggle billing period</span>
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-1 ring-black/5 transform ${
                    isAnnual ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isAnnual
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-400 dark:text-zinc-500"
                }`}
              >
                Annually
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold tracking-wider bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400 uppercase border border-violet-200/50 dark:border-violet-500/20">
                  Save 20%
                </span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-center">
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
                className={`relative rounded-[2.5rem] p-8 xl:p-10 flex flex-col h-full backdrop-blur-xl transition-all duration-500 ${
                  plan.isPopular
                    ? "bg-white dark:bg-zinc-900/60 border border-violet-500/30 shadow-[0_0_80px_rgba(139,92,246,0.06)] z-10 md:-translate-y-2"
                    : "bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200/80 dark:border-white/10 hover:bg-white dark:hover:bg-zinc-900/40"
                }`}
              >
                {/* Popular Gradient Glow overlay */}
                {plan.isPopular && (
                  <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.03] to-transparent rounded-[2.5rem] pointer-events-none" />
                )}

                <div className="mb-6 relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
                      {plan.name}
                    </h3>
                    {plan.isPopular && (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-medium tracking-widest text-violet-600 dark:text-violet-400 uppercase bg-violet-100 dark:bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-200/50 dark:border-violet-500/20">
                        <Zap className="w-3 h-3 fill-current" /> Most Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 h-10 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8 relative z-10">
                  <div className="flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={displayPrice}
                        initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        transition={{ duration: 0.2 }}
                        className="text-5xl md:text-6xl font-medium tracking-tighter text-zinc-900 dark:text-white"
                      >
                        {displayPrice}
                      </motion.span>
                    </AnimatePresence>
                    {displayPrice !== "Free" && (
                      <span className="text-lg font-medium text-zinc-400 dark:text-zinc-500">
                        /mo
                      </span>
                    )}
                  </div>
                  {isAnnual && displayPrice !== "Free" && (
                    <p className="text-xs font-mono tracking-wider text-violet-600/80 dark:text-violet-400/80 mt-3 uppercase">
                      Billed ${parseInt(displayPrice.replace("$", "")) * 12}{" "}
                      yearly
                    </p>
                  )}
                  {(!isAnnual || displayPrice === "Free") && (
                    <p className="text-xs font-mono tracking-wider text-transparent mt-3 uppercase select-none">
                      Spacing preserver
                    </p>
                  )}
                </div>

                <ul className="space-y-0 mb-10 flex-1 relative z-10">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 py-3 text-sm text-zinc-600 dark:text-zinc-400 border-b border-zinc-100 dark:border-white/5 last:border-0"
                    >
                      <Check
                        className={`w-4 h-4 shrink-0 ${
                          plan.isPopular
                            ? "text-violet-500"
                            : "text-zinc-300 dark:text-zinc-600"
                        }`}
                        strokeWidth={plan.isPopular ? 3 : 2}
                      />
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`relative z-10 w-full h-12 rounded-full font-medium transition-all duration-300 active:scale-[0.98] ${
                    plan.isPopular
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl shadow-zinc-900/10 dark:shadow-white/10 hover:bg-zinc-800 dark:hover:bg-zinc-100"
                      : "bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    description:
      "Perfect for indie hackers and solo founders validating their first idea.",
    price: {
      monthly: 19,
      annual: 15,
    },
    features: [
      "5 Validation Reports per month",
      "Standard AI Agents (Marketer & Dev)",
      "Basic PDF Exports",
      "Community Discord Support",
    ],
    buttonText: "Start for free",
    buttonVariant: "outline",
    popular: false,
  },
  {
    name: "Pro",
    description:
      "For serious founders and teams shipping multiple products a year.",
    price: {
      monthly: 49,
      annual: 39,
    },
    features: [
      "Unlimited Validation Reports",
      "Advanced Multi-Agent Engine (Investor)",
      "Custom API Access",
      "Priority Email Support",
      "Custom Tech Stack Rules",
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "solid",
    popular: true,
  },
  {
    name: "Enterprise",
    description:
      "For incubators, VCs, and agencies needing high-volume validation.",
    price: {
      monthly: 199,
      annual: 159,
    },
    features: [
      "Everything in Pro",
      "Dedicated Account Manager",
      "Custom AI Personality Training",
      "Automated Webhooks",
      "99.9% Uptime SLA",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    popular: false,
  },
];

const comparisonFeatures = [
  {
    category: "Core Features",
    items: [
      {
        name: "Validation Reports",
        starter: "5 / month",
        pro: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        name: "Custom Tech Stack Rules",
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "Team Members",
        starter: "1",
        pro: "Up to 5",
        enterprise: "Unlimited",
      },
    ],
  },
  {
    category: "AI Engine",
    items: [
      {
        name: "Marketer & Developer Agents",
        starter: true,
        pro: true,
        enterprise: true,
      },
      { name: "Investor Agent", starter: false, pro: true, enterprise: true },
      {
        name: "Custom AI Personality",
        starter: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Export & Integrations",
    items: [
      { name: "Basic PDF Export", starter: true, pro: true, enterprise: true },
      {
        name: "Advanced Pitch Deck PDF",
        starter: false,
        pro: true,
        enterprise: true,
      },
      { name: "API Access", starter: false, pro: true, enterprise: true },
      {
        name: "Automated Webhooks",
        starter: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Support",
    items: [
      { name: "Community Discord", starter: true, pro: true, enterprise: true },
      { name: "Priority Email", starter: false, pro: true, enterprise: true },
      {
        name: "Dedicated Account Manager",
        starter: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const renderValue = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <Check className="w-5 h-5 text-violet-500 mx-auto" />
      ) : (
        <Minus className="w-5 h-5 text-zinc-300 dark:text-zinc-700 mx-auto" />
      );
    }
    return (
      <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
        {val}
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-6">
            Predict success before you write a single line of code.
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Choose the plan that fits your workflow. Upgrade, downgrade, or
            cancel anytime.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-16"
        >
          <div className="relative flex items-center p-1 bg-zinc-200/50 dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative w-32 py-2.5 text-sm font-medium rounded-full transition-colors z-10 ${
                !isAnnual
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative w-32 py-2.5 text-sm font-medium rounded-full transition-colors z-10 ${
                isAnnual
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Annually
            </button>

            {/* Sliding Pill Background */}
            <div
              className={`absolute top-1 bottom-1 w-32 bg-white dark:bg-zinc-800 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-700 transition-transform duration-300 ease-in-out ${
                isAnnual ? "translate-x-32" : "translate-x-0"
              }`}
            />

            {/* Save Badge */}
            <div className="absolute -top-4 -right-8 bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 text-[10px] font-bold px-2 py-1 rounded-full border border-violet-200 dark:border-violet-500/30 rotate-12">
              Save 20%
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              className={`relative flex flex-col p-8 rounded-[2rem] bg-white dark:bg-zinc-900/50 border transition-all duration-300 ${
                plan.popular
                  ? "border-violet-500 shadow-xl shadow-violet-500/10 dark:shadow-violet-500/5 scale-100 md:scale-105 z-10"
                  : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <div className="flex items-center gap-1.5 bg-violet-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 h-10">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    / month
                  </span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-violet-600 dark:text-violet-400 font-medium mt-2">
                    Billed ${plan.price.annual * 12} yearly
                  </p>
                )}
              </div>

              <Link
                href={plan.name === "Enterprise" ? "/contact" : "/signup"}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all mb-8 ${
                  plan.buttonVariant === "solid"
                    ? "bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-500/20"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-transparent dark:border-zinc-700"
                }`}
              >
                {plan.buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-white mb-4">
                  What's included:
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <Check className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
              Compare plans in detail
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Find the perfect tier for your validation needs.
            </p>
          </div>

          <div className="overflow-x-auto custom-scrollbar rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="w-1/3 p-6 text-sm font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    Features
                  </th>
                  <th className="w-[22%] p-6 text-center text-sm font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    Starter
                  </th>
                  <th className="w-[22%] p-6 text-center text-sm font-semibold text-violet-600 dark:text-violet-400 border-b border-zinc-200 dark:border-zinc-800 bg-violet-50/50 dark:bg-violet-900/10">
                    Pro
                  </th>
                  <th className="w-[22%] p-6 text-center text-sm font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category, catIdx) => (
                  <optgroup key={catIdx} className="contents">
                    {/* Category Header */}
                    <tr>
                      <td
                        colSpan={4}
                        className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-50/80 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-800"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {/* Feature Rows */}
                    {category.items.map((item, itemIdx) => (
                      <tr
                        key={itemIdx}
                        className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                      >
                        <td className="p-4 text-sm font-medium text-zinc-900 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
                          {item.name}
                        </td>
                        <td className="p-4 text-center border-b border-zinc-200 dark:border-zinc-800">
                          {renderValue(item.starter)}
                        </td>
                        <td className="p-4 text-center border-b border-zinc-200 dark:border-zinc-800 bg-violet-50/10 dark:bg-violet-900/5 group-hover:bg-violet-50/30 dark:group-hover:bg-violet-900/10 transition-colors">
                          {renderValue(item.pro)}
                        </td>
                        <td className="p-4 text-center border-b border-zinc-200 dark:border-zinc-800">
                          {renderValue(item.enterprise)}
                        </td>
                      </tr>
                    ))}
                  </optgroup>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

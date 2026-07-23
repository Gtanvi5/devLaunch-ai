"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Clock,
  Wallet,
  BrainCircuit,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ComparisonItem {
  feature: string;
  competitor: string;
  devlaunch: string;
  devlaunchWins: boolean;
}

interface PageData {
  competitorName: string;
  competitorType: string;
  heroTitle: string;
  heroDescription: string;
  benefits: Benefit[];
  comparison: ComparisonItem[];
}

const pageData: PageData = {
  competitorName: "Traditional Market Research",
  competitorType: "Agency / Manual Research",
  heroTitle: "Stop waiting months to validate your startup.",
  heroDescription:
    "See why modern founders are abandoning expensive market research agencies and using DevLaunch AI to validate ideas in seconds.",
  benefits: [
    {
      title: "From Months to Seconds",
      description:
        "Agencies take 4-8 weeks to conduct surveys and analyze competitors. DevLaunch AI processes millions of data points in seconds.",
      icon: Clock,
    },
    {
      title: "Fraction of the Cost",
      description:
        "Traditional research costs upwards of $10,000+. DevLaunch AI validates your entire pipeline for the cost of a coffee.",
      icon: Wallet,
    },
    {
      title: "Actionable Dev Blueprints",
      description:
        "Don't just get a PDF of pie charts. Get a concrete tech stack, MVP feature scope, and step-by-step execution plan.",
      icon: BrainCircuit,
    },
  ],
  comparison: [
    {
      feature: "Time to complete",
      competitor: "4 - 8 Weeks",
      devlaunch: "Under 60 seconds",
      devlaunchWins: true,
    },
    {
      feature: "Average Cost",
      competitor: "$5,000 - $20,000",
      devlaunch: "Starts at $0",
      devlaunchWins: true,
    },
    {
      feature: "Competitor Analysis",
      competitor: "Manual web scraping",
      devlaunch: "Real-time AI Matrix",
      devlaunchWins: true,
    },
    {
      feature: "Tech Stack Suggestions",
      competitor: "Rarely included",
      devlaunch: "Tailored to your skills",
      devlaunchWins: true,
    },
    {
      feature: "Investor Agent Risk Scoring",
      competitor: "Not available",
      devlaunch: "Included standard",
      devlaunchWins: true,
    },
    {
      feature: "Bias Level",
      competitor: "High (Human confirmation bias)",
      devlaunch: "Low (Data-driven)",
      devlaunchWins: true,
    },
  ],
};

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-6 text-sm font-semibold"
          >
            <span className="text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800/50 px-3 py-1 rounded-full">
              {pageData.competitorName}
            </span>
            <span className="text-zinc-400">vs</span>
            <span className="text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> DevLaunch AI
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-6"
          >
            {pageData.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed"
          >
            {pageData.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3.5 rounded-xl font-medium transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
            >
              Start Validating for Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {pageData.benefits.map((benefit, idx) => (
            <motion.li
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
              className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 list-none"
            >
              <div className="w-12 h-12 bg-violet-50 dark:bg-violet-500/10 rounded-2xl flex items-center justify-center mb-6 border border-violet-100 dark:border-violet-500/20">
                <benefit.icon className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                {benefit.description}
              </p>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              The Breakdown
            </h2>
          </div>

          <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th
                      scope="col"
                      className="p-6 w-1/3 font-semibold text-zinc-900 dark:text-white"
                    >
                      Feature
                    </th>
                    <th
                      scope="col"
                      className="p-6 w-1/3 font-semibold text-zinc-500 text-center"
                    >
                      {pageData.competitorName}
                    </th>
                    <th
                      scope="col"
                      className="p-6 w-1/3 font-bold text-violet-600 dark:text-violet-400 text-center bg-violet-50/50 dark:bg-violet-500/5 border-l border-violet-100 dark:border-violet-500/10"
                    >
                      DevLaunch AI
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {pageData.comparison.map((item) => (
                    <tr
                      key={item.feature}
                      className="transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20"
                    >
                      <td className="p-5 text-sm font-medium text-zinc-900 dark:text-zinc-300">
                        {item.feature}
                      </td>
                      <td className="p-5 text-sm text-zinc-500 dark:text-zinc-400 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {item.competitor === "Not available" ||
                          item.competitor === "Rarely included" ? (
                            <XCircle className="w-4 h-4 text-zinc-300 dark:text-zinc-600" />
                          ) : null}
                          {item.competitor}
                        </div>
                      </td>
                      <td className="p-5 text-sm font-semibold text-zinc-900 dark:text-white text-center bg-violet-50/20 dark:bg-violet-500/5 border-l border-violet-100 dark:border-violet-500/10">
                        <div className="flex items-center justify-center gap-2">
                          {item.devlaunchWins && (
                            <CheckCircle2 className="w-4 h-4 text-violet-500" />
                          )}
                          {item.devlaunch}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-zinc-50 dark:bg-zinc-900/80 border-t border-zinc-200 dark:border-zinc-800 text-center">
              <Link
                href="/signup"
                className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 inline-flex items-center gap-1 transition-colors"
              >
                Create your account <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

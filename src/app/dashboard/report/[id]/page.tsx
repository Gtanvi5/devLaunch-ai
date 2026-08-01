"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Target,
  Zap,
  TrendingUp,
  AlertTriangle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { ReportData, SwotAnalysis } from "@/types/report";
import dynamic from "next/dynamic";

const FormWithPDFDownload = dynamic(
  () => import("@/components/PDFDownloadButton"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-500 border rounded-md">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading PDF engine...
      </div>
    ),
  },
);

interface ReportClientProps {
  reportData?: ReportData;
}

const defaultReport: ReportData = {
  idea: "ScentSync AI: An adaptive olfactory operating system utilizing a wearable micro-diffusion pin and smart scent pods for wellness and identity expression.",
  score: 92,
  marketSize: "$14.2B",
  competitorRisk: "Medium",
  swot: {
    strengths: [
      "Innovative piezoelectric micro-nebulization",
      "High margins on consumable smart scent pods",
      "Creates a new 'adaptive olfactory' category",
    ],
    weaknesses: [
      "Hardware manufacturing complexity",
      "Requires initial consumer education and behavior change",
    ],
    opportunities: [
      "Massive business value and strategic opportunity for global beauty brands like L'Oréal",
      "Expansion into mental wellness and therapeutic spaces",
    ],
    threats: [
      "Incumbent traditional fragrance brands fast-following",
      "Hardware supply chain bottlenecks",
    ],
  },
};

function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [value, count]);

  return (
    <>
      <span className="sr-only">{value}</span>
      <motion.span aria-hidden="true">{rounded}</motion.span>
    </>
  );
}

export default function ReportPage({
  reportData = defaultReport,
}: ReportClientProps) {
  interface SwotEntry {
    category: keyof SwotAnalysis;
    items: string[];
  }

  const swotEntries: SwotEntry[] = (
    Object.entries(reportData.swot) as Array<[keyof SwotAnalysis, string[]]>
  ).map(([category, items]) => ({ category, items }));

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to validations</span>
        </Link>

        <FormWithPDFDownload reportData={reportData} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
          Market Validation Report
        </h1>
        <div className="p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 leading-relaxed text-lg shadow-inner">
          &ldquo;{reportData.idea}&rdquo;
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-1 rounded-3xl bg-linear-to-br from-violet-600 to-blue-600 p-8 text-white shadow-xl shadow-violet-500/20 dark:shadow-violet-500/10 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Target className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h3 className="text-violet-100 font-medium mb-2">
              Validation Score
            </h3>
            <div className="text-7xl font-bold flex items-baseline gap-1">
              <AnimatedNumber value={reportData.score} />
              <span className="text-2xl text-violet-200/70 font-normal">
                /100
              </span>
            </div>
            <p className="mt-4 text-sm text-violet-100/90 leading-relaxed">
              Exceptional potential. Highly innovative concept with clear paths
              to enterprise acquisition.
            </p>
          </div>
        </motion.div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 flex flex-col justify-center shadow-sm dark:shadow-none hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3 text-zinc-500 dark:text-zinc-400 font-medium">
              <TrendingUp className="w-5 h-5 text-emerald-500" /> Total
              Addressable Market
            </div>
            <div className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {reportData.marketSize}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 flex flex-col justify-center shadow-sm dark:shadow-none hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3 text-zinc-500 dark:text-zinc-400 font-medium">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> Competitor
              Risk
            </div>
            <div className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {reportData.competitorRisk}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-violet-500" /> AI SWOT Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {swotEntries.map(({ category, items }) => (
            <div
              key={category}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 shadow-sm dark:shadow-none hover:shadow-md transition-shadow"
            >
              <h4 className="text-lg font-bold capitalize mb-5 text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-2">
                {category}
              </h4>
              <ul className="space-y-3.5">
                {items.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400 leading-relaxed"
                  >
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

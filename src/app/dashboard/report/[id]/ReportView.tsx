"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Users,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReportData } from "@/types/report";

interface ReportViewProps {
  reportData: ReportData;
  reportTitle?: string;
}

interface Section {
  id: string;
  label: string;
  icon: typeof Lightbulb;
}

export default function ReportView({
  reportData,
  reportTitle = "Pitch Analysis",
}: ReportViewProps) {
  const [activeSection, setActiveSection] = useState<string>("exec-summary");
  const topRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (topRef.current) {
      const y =
        topRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [activeSection]);

  const sections: Section[] = [
    { id: "exec-summary", label: "Executive Summary", icon: Lightbulb },
    { id: "market-analysis", label: "Market Analysis", icon: TrendingUp },
    { id: "competitors", label: "Competitor Landscape", icon: Users },
    { id: "swot", label: "SWOT Breakdown", icon: BarChart3 },
    { id: "recommendation", label: "Strategic Verdict", icon: ShieldCheck },
  ];

  const currentIndex: number = sections.findIndex(
    (s) => s.id === activeSection,
  );
  const nextSection: Section | null =
    currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  const renderSectionContent = (): ReactNode => {
    switch (activeSection) {
      case "exec-summary":
        return (
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl italic text-zinc-600 dark:text-zinc-300 leading-relaxed border-l-4 border-violet-500 pl-6 py-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-r-lg">
              "{reportData.idea}"
            </p>
          </div>
        );
      case "market-analysis":
        return (
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Total Addressable Market (TAM)
            </h3>
            <p className="text-4xl font-bold text-violet-600 dark:text-violet-400 mt-2">
              {reportData.marketSize}
            </p>
          </div>
        );
      case "competitors":
        return (
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
              Competitor Risk Level
            </h3>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg font-bold text-lg mb-6">
              {reportData.competitorRisk}
            </div>
            <h4 className="font-bold">Identified Threats</h4>
            <ul>
              {reportData.swot?.threats?.map((threat: string, i: number) => (
                <li key={i}>{threat}</li>
              )) || <li>No major threats identified by AI.</li>}
            </ul>
          </div>
        );
      case "swot":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportData.swot &&
              Object.entries(reportData.swot)
                .filter(([key]) => key !== "threats")
                .map(([key, items]: [string, string[]]) => (
                  <div
                    key={key}
                    className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
                  >
                    <h4 className="capitalize font-bold text-lg mb-4">{key}</h4>
                    <ul className="space-y-2">
                      {Array.isArray(items) ? (
                        items.map((item: string, i: number) => (
                          <li
                            key={i}
                            className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                          >
                            <span className="text-violet-500">•</span> {item}
                          </li>
                        ))
                      ) : (
                        <li>Data unavailable</li>
                      )}
                    </ul>
                  </div>
                ))}
          </div>
        );
      case "recommendation":
        return (
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Final Validation Score
            </h3>
            <div className="text-6xl font-bold text-emerald-500 my-4">
              {reportData.score}/100
            </div>
            <p className="text-zinc-600 dark:text-zinc-300">
              Based on the core proposition and a market risk analysis, this
              project achieved a viability score of {reportData.score}.
              {reportData.score >= 80
                ? " This demonstrates exceptional potential for scale and execution."
                : " Consider refining the market approach or mitigating competitor risks before proceeding."}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto py-10 px-4">
      <div className="flex-1 min-w-0 relative">
        <div
          ref={topRef}
          aria-hidden="true"
          className="absolute top-0 pointer-events-none"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-sm"
          >
            <div className="flex justify-between items-start mb-12">
              <div>
                <h1 className="text-3xl font-bold mb-2">{reportTitle}</h1>
                <p className="text-zinc-500">
                  Generated on{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  • {reportData.score}/100 Viability Score
                </p>
              </div>
              <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full font-bold text-sm">
                {reportData.score >= 80 ? "Green Light" : "Review Needed"}
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              {sections.find((s) => s.id === activeSection)?.label}
            </h2>

            {renderSectionContent()}

            <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
              {nextSection && (
                <Button
                  onClick={() => setActiveSection(nextSection.id)}
                  className="rounded-xl gap-2 bg-violet-600 hover:bg-violet-500 text-white shadow-lg"
                >
                  Next: {nextSection.label}
                  <ChevronRight size={16} />
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

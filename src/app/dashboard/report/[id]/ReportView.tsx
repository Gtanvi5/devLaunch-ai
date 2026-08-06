"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Presentation,
  Target,
  Briefcase,
  TrendingUp,
  AlertCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReportData, ReportSection } from "@/types/report";

interface Slide {
  id: string;
  title: string;
  icon: React.ElementType;
  content: ReactNode;
}

export default function ReportView({ reportData }: { reportData: ReportData }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const displayTitle =
    reportData.idea || reportData.prompt || "Market Validation";
  const formattedDate = reportData.createdAt
    ? new Date(reportData.createdAt).toLocaleDateString()
    : new Date().toLocaleDateString();

  const slides: Slide[] = [
    {
      id: "title",
      title: "Validation Overview",
      icon: Presentation,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-full mb-4">
            <Target className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight max-w-3xl leading-tight">
            &ldquo;{displayTitle}&rdquo;
          </h1>
          <div className="flex items-center gap-4 text-zinc-500 mt-8">
            <span className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium">
              Score: {reportData.score}/100
            </span>
            <span className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium">
              Generated {formattedDate}
            </span>
          </div>
        </div>
      ),
    },
  ];

  if (reportData.executiveSummary) {
    slides.push({
      id: "executive-summary",
      title: "Executive Summary",
      icon: Briefcase,
      content: (
        <SlideContentRenderer
          title="Executive Summary"
          data={reportData.executiveSummary}
        />
      ),
    });
  }

  if (reportData.marketAnalysis) {
    slides.push({
      id: "market-analysis",
      title: "Market Analysis",
      icon: TrendingUp,
      content: (
        <SlideContentRenderer
          title="Market Analysis"
          data={reportData.marketAnalysis}
        />
      ),
    });
  }

  if (reportData.swot) {
    slides.push({
      id: "swot-analysis",
      title: "SWOT Analysis",
      icon: Zap,
      content: (
        <div className="space-y-6 pb-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">
            AI SWOT Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(reportData.swot).map(([category, items]) => (
              <div
                key={category}
                className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold capitalize mb-4 text-indigo-600 dark:text-indigo-400">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {(items as string[]).map((item, i) => (
                    <li
                      key={i}
                      className="text-zinc-600 dark:text-zinc-400 text-sm flex items-start gap-2"
                    >
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ),
    });
  }

  const nextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const activeTag = document.activeElement?.tagName;
  const isInput =
    activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT";
  const isContentEditable =
    document.activeElement?.getAttribute("contenteditable") === "true";

  if (isInput || isContentEditable) return;

  return (
    <div className="flex h-[calc(100vh-57px)] w-full overflow-hidden">
      <nav
        className="w-64 border-r border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-950 flex flex-col shrink-0"
        aria-label="Presentation Slides"
      >
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800/50">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Slide Navigator
          </p>
        </div>

        <ul className="flex-1 overflow-y-auto p-3 space-y-1" role="tablist">
          {slides.map((slide, index) => {
            const isActive = activeSlideIndex === index;
            const Icon = slide.icon;

            return (
              <li key={slide.id} role="presentation">
                <button
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${slide.id}`}
                  onClick={() => setActiveSlideIndex(index)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-medium"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "opacity-70"
                    }`}
                  />
                  <span className="truncate">{slide.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-zinc-50 dark:bg-[#0a0a0a]">
        <div
          id={`panel-${slides[activeSlideIndex]?.id}`}
          role="tabpanel"
          className="flex-1 overflow-y-auto p-8 md:p-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlideIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full max-w-5xl mx-auto"
            >
              {slides[activeSlideIndex]?.content}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="h-16 border-t border-zinc-200 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-950/50 backdrop-blur flex items-center justify-between px-6 shrink-0">
          <div className="text-sm font-medium text-zinc-500">
            Slide {activeSlideIndex + 1} of {slides.length}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={activeSlideIndex === 0}
              aria-label="Previous Slide"
              className="dark:border-zinc-800"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={activeSlideIndex === slides.length - 1}
              aria-label="Next Slide"
              className="dark:border-zinc-800"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
}

function SlideContentRenderer({
  title,
  data,
}: {
  title: string;
  data: ReportSection;
}) {
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-400">
        <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
        <p>No data available for {title}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">
        {title}
      </h2>
      <div className="grid gap-6">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 capitalize mb-3">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </h3>
            <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
              {typeof value === "string" ? (
                <p>{value}</p>
              ) : Array.isArray(value) ? (
                <ul className="list-disc pl-5 space-y-1">
                  {value.map((item, i) => (
                    <li key={i}>{String(item)}</li>
                  ))}
                </ul>
              ) : (
                <pre className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-lg overflow-x-auto text-xs">
                  {JSON.stringify(value, null, 2)}
                </pre>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

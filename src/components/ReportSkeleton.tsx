"use client";

import { motion } from "framer-motion";

export default function ReportSkeleton() {
  // A standard pulse animation we can reuse
  const pulseAnimation = {
    opacity: [0.4, 1, 0.4],
    transition: {
      repeat: Infinity,
      duration: 2,
      // use easing function to satisfy framer-motion easing type
      ease: [0.42, 0, 0.58, 1] as const,
    },
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto py-10 px-4 w-full">
      {/* Sidebar Skeleton */}
      <nav className="lg:w-64 shrink-0 h-fit">
        <div className="lg:sticky lg:top-24 flex flex-row lg:flex-col gap-2 overflow-hidden pb-4 lg:pb-0">
          <motion.div
            className="hidden lg:block h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-4"
            animate={pulseAnimation}
          />
          {/* 5 Sidebar Items */}
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={pulseAnimation}
              // Slight animation delay for a cascading effect
              transition={{ ...pulseAnimation.transition, delay: i * 0.1 }}
              className="shrink-0 w-32 lg:w-full h-11 bg-zinc-200 dark:bg-zinc-800 rounded-lg"
            />
          ))}
        </div>
      </nav>

      {/* Main Content Skeleton */}
      <div className="flex-1 min-w-0">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-sm">
          {/* Header Area */}
          <div className="flex justify-between items-start mb-12">
            <div className="space-y-3 flex-1">
              <motion.div
                animate={pulseAnimation}
                className="h-8 w-3/4 max-w-md bg-zinc-200 dark:bg-zinc-800 rounded-lg"
              />
              <motion.div
                animate={pulseAnimation}
                className="h-4 w-1/2 max-w-xs bg-zinc-200 dark:bg-zinc-800 rounded-md"
              />
            </div>
            {/* Status Pill */}
            <motion.div
              animate={pulseAnimation}
              className="h-9 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-full shrink-0 ml-4"
            />
          </div>

          {/* Section Title */}
          <motion.div
            animate={pulseAnimation}
            className="h-7 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-6"
          />

          {/* Content Body (Paragraphs) */}
          <div className="space-y-4 mb-10">
            <motion.div
              animate={pulseAnimation}
              className="h-4 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-md"
            />
            <motion.div
              animate={pulseAnimation}
              className="h-4 w-11/12 bg-zinc-100 dark:bg-zinc-800/50 rounded-md"
            />
            <motion.div
              animate={pulseAnimation}
              className="h-4 w-4/5 bg-zinc-100 dark:bg-zinc-800/50 rounded-md"
            />
          </div>

          {/* Grid Area (mimicking SWOT / Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                animate={pulseAnimation}
                className="h-40 rounded-xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800"
              />
            ))}
          </div>

          {/* Footer / Next Button */}
          <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <motion.div
              animate={pulseAnimation}
              className="h-11 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

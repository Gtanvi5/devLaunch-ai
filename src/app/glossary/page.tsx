"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { glossaryTerms } from "@/data/glossary";
import { Suspense } from "react";
import { useDebouncedCallback } from "use-debounce";

function GlossaryContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const syncUrl = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredTerms = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.abbreviation &&
        item.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Founder Library
          </div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-6">
            The Startup Glossary
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            From TAM to PMF, understand the jargon investors use. Better yet,
            see how AI can do the heavy lifting for you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-400 group-focus-within:text-violet-500 transition-colors" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            aria-label="Search glossary terms"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              syncUrl(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.currentTarget.blur();
                setSearchQuery("");
                syncUrl("");
              }
            }}
            placeholder="Search for a term (e.g., GTM, Moat)..."
            className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-12 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 shadow-sm transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700">
              /
            </kbd>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          aria-live="polite"
        >
          <AnimatePresence mode="popLayout">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={item.term}
                  className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 flex flex-col h-full hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                      {item.term}
                    </h2>
                    {item.abbreviation && (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                        {item.abbreviation}
                      </span>
                    )}
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-8 flex-1">
                    {item.definition}
                  </p>

                  <div className="bg-violet-50/50 dark:bg-violet-500/5 border-l-2 border-violet-500 p-4 rounded-r-xl mt-auto">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                      <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                        The DevLaunch Shortcut
                      </span>
                    </div>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                      {item.pitch}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-zinc-400" />
                </div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-1">
                  No terms found
                </h3>
                <p className="text-zinc-500">
                  Try searching for something else, or clear your search.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20 text-center bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-10 md:p-16">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            Stop learning terms. Start building.
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
            Let our AI handle the market research, competitor analysis, and
            feature scoping. You focus on what you do best: executing.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3.5 rounded-xl font-medium transition-all shadow-lg shadow-violet-500/25"
          >
            Generate your first report
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function GlossaryPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A]" />}
    >
      <GlossaryContent />
    </Suspense>
  );
}

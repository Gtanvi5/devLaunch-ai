"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const glossaryTerms = [
  {
    term: "Total Addressable Market",
    abbreviation: "TAM",
    definition:
      "The overall revenue opportunity that is available to a product or service if 100% market share was achieved. It helps founders and investors understand the absolute maximum scale of a business.",
    pitch:
      "Stop reading outdated industry PDFs. DevLaunch AI instantly calculates live TAM estimates based on current web data and competitor revenues.",
  },
  {
    term: "Minimum Viable Product",
    abbreviation: "MVP",
    definition:
      "The most stripped-down version of a product that can still be released to early adopters. The goal is to validate assumptions and collect user feedback with the least amount of development effort.",
    pitch:
      "Founders often overbuild. DevLaunch AI gives you a strict, scoped feature list for your MVP so you only code what actually matters.",
  },
  {
    term: "Go-To-Market Strategy",
    abbreviation: "GTM",
    definition:
      "An action plan that specifies how a company will reach target customers and achieve competitive advantage. It includes pricing, sales, marketing, and distribution channels.",
    pitch:
      "Your DevLaunch AI validation report includes a custom Day-1 GTM strategy tailored specifically to your niche and ideal customer profile.",
  },
  {
    term: "Ideal Customer Profile",
    abbreviation: "ICP",
    definition:
      "A categorical description of a fictitious company or user that would get the most value from your product, thus providing the fastest sales cycle and highest retention rates.",
    pitch:
      "DevLaunch AI maps out exact user personas, including their pain points, where they hang out online, and what messaging will convert them.",
  },
  {
    term: "Product-Market Fit",
    abbreviation: "PMF",
    definition:
      "The degree to which a product satisfies a strong market demand. It is the moment when users are buying, using, and telling others about the product fast enough to sustain growth.",
    pitch:
      "Validate demand before writing code. DevLaunch AI's viability score predicts your likelihood of finding PMF based on market saturation.",
  },
  {
    term: "Customer Acquisition Cost",
    abbreviation: "CAC",
    definition:
      "The total cost of sales and marketing efforts that are needed to acquire a new customer. It must be significantly lower than the Lifetime Value (LTV) of a customer for a business to survive.",
    pitch:
      "Knowing your competitors' ad spend is a superpower. DevLaunch AI highlights standard acquisition channels and estimated costs in your niche.",
  },
  {
    term: "Moat",
    abbreviation: null,
    definition:
      "A distinct competitive advantage that a company has over its competitors, allowing it to protect its market share and profitability (e.g., network effects, proprietary tech, brand).",
    pitch:
      "Don't get crushed by incumbents. Our AI analyzes market leaders and explicitly tells you what unique 'angle' or moat you need to carve out.",
  },
];

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerms = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.abbreviation &&
        item.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Header Section */}
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

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a term (e.g., GTM, Moat)..."
            className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 shadow-sm transition-all"
          />
        </div>

        {/* Terms Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredTerms.length > 0 ? (
              filteredTerms.map((item, idx) => (
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

                  {/* The Subtle Pitch */}
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

        {/* Bottom CTA */}
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

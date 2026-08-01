"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Compass,
  Zap,
  HelpCircle,
  Code,
  ArrowRight,
  Search,
} from "lucide-react";

const docCategories = [
  {
    icon: Compass,
    title: "Getting Started",
    description:
      "Learn the basics of framing prompts to get razor-sharp market validation signals.",
    links: [
      { label: "Quick Start Guide", href: "/docs/getting-started/quick-start" },
      {
        label: "How multi-agent validation works",
        href: "/docs/getting-started/multi-agent-validation",
      },
      {
        label: "Understanding your Dashboard",
        href: "/docs/getting-started/dashboard-overview",
      },
    ],
  },
  {
    icon: Zap,
    title: "Features & Frameworks",
    description:
      "Deep dives into target audience profiling, competitor grids, and smoke test strategies.",
    links: [
      {
        label: "Competitor Analysis Matrix",
        href: "/docs/features/competitor-matrix",
      },
      {
        label: "Generating dynamic landing page copy",
        href: "/docs/features/dynamic-copy",
      },
      { label: "Defining your MVP scope", href: "/docs/features/mvp-scope" },
    ],
  },
  {
    icon: Code,
    title: "Advanced Strategies",
    description:
      "Export workflows, customizing your AI personality, and programmatic API setups.",
    links: [
      {
        label: "Exporting to Pitch Decks",
        href: "/docs/advanced/pitch-deck-export",
      },
      {
        label: "Webhooks for automated scanning",
        href: "/docs/advanced/webhooks",
      },
      { label: "Using variables in ideas", href: "/docs/advanced/variables" },
    ],
  },
  {
    icon: HelpCircle,
    title: "FAQ & Troubleshooting",
    description:
      "Answers to common billing questions, credit limits, and analytical output queries.",
    links: [
      { label: "How credits refresh", href: "/docs/faq/credits" },
      {
        label: "Changing your tech stack rules",
        href: "/docs/faq/tech-stack-rules",
      },
      { label: "Data isolation protocols", href: "/docs/faq/data-isolation" },
    ],
  },
];

const DocCard = ({
  category,
  index,
}: {
  category: (typeof docCategories)[number];
  index: number;
}) => {
  const Icon = category.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group flex flex-col p-8 rounded-[2rem] bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none"
    >
      <div className="mb-8">
        <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-violet-50 dark:group-hover:bg-violet-500/10 transition-colors">
          <Icon className="w-6 h-6 text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
        </div>
        <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-3">
          {category.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="mt-auto border-t border-zinc-100 dark:border-white/5 pt-6">
        <ul className="space-y-4">
          {category.links.map((link, lIdx) => (
            <li key={lIdx}>
              <Link
                className="group/link flex items-center justify-between text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                href={link.href}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-violet-500" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = docCategories
    .map((category) => {
      const query = searchQuery.toLowerCase();
      const matchesCategory =
        category.title.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query);

      const matchingLinks = category.links.filter((link) =>
        link.label.toLowerCase().includes(query),
      );

      if (matchesCategory) {
        return category;
      } else if (matchingLinks.length > 0) {
        return { ...category, links: matchingLinks };
      }
      return null;
    })

    .filter((c): c is (typeof docCategories)[number] => c !== null);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-300 text-sm font-medium mb-6 border border-zinc-200 dark:border-white/5">
            <BookOpen className="w-4 h-4 text-violet-500" />
            DevLaunch Docs
          </div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-6">
            Documentation & Guides
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10">
            Everything you need to transform your raw concepts into
            market-validated, production-ready blueprints.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              aria-label="Search documentation"
              placeholder="Search guides, tutorials, and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-full py-4 pl-12 pr-4 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all shadow-sm"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, idx) => (
                <DocCard category={category} index={idx} key={category.title} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-zinc-500 dark:text-zinc-400">
                  No documentation found matching &quot;{searchQuery}&quot;
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center border-t border-zinc-200/60 dark:border-white/5 pt-12"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Can&apos;t find what you are looking for?{" "}
            <Link
              className="text-violet-600 dark:text-violet-400 font-medium hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
              href="/contact"
            >
              Contact our product team
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}

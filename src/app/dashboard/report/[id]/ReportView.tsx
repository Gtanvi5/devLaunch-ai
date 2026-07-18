"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Users,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportView() {
  const [activeSection, setActiveSection] = useState("exec-summary");

  const sections = [
    { id: "exec-summary", label: "Executive Summary", icon: Lightbulb },
    { id: "market-analysis", label: "Market Analysis", icon: TrendingUp },
    { id: "competitors", label: "Competitor Landscape", icon: Users },
    { id: "financials", label: "Financial Outlook", icon: BarChart3 },
    { id: "recommendation", label: "Strategic Verdict", icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto py-10 px-4">
      {/* Sidebar Navigation (Sticky) */}
      <nav className="lg:w-64 shrink-0">
        <div className="lg:sticky lg:top-24 space-y-1">
          <h4 className="px-4 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
            Report Contents
          </h4>
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                <Icon size={16} />
                {section.label}
              </button>
            );
          })}
          <div className="mt-8 px-4">
            <Button variant="outline" className="w-full gap-2 rounded-xl">
              <Download size={16} />
              Export PDF
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Report Document */}
      <div className="flex-1 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-sm"
        >
          {/* Document Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                AI CRM for Landscapers
              </h1>
              <p className="text-zinc-500">
                Generated on July 17, 2026 • 84/100 Viability Score
              </p>
            </div>
            <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full font-bold text-sm">
              Green Light
            </div>
          </div>

          {/* Placeholder for content based on active section */}
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              {sections.find((s) => s.id === activeSection)?.label}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              This is a placeholder for your AI-generated report content. In a
              production app, this would be rendered from the JSON blob returned
              by your API. The layout is designed for maximum readability,
              prioritizing typography and whitespace.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <h4 className="font-bold mb-2">Key Strength</h4>
                <p className="text-sm text-zinc-500">
                  High fragmentation in the local service industry allows for a
                  quick niche entry.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <h4 className="font-bold mb-2">Critical Risk</h4>
                <p className="text-sm text-zinc-500">
                  Customer acquisition costs for blue-collar SMBs are
                  historically high via digital ads.
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-4">
              Strategic Recommendation
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              We recommend prioritizing a product-led growth strategy. Focus on
              a "Freemium" model that solves scheduling first, then upselling
              CRM features as the user's team grows beyond 3 people.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <Button className="rounded-xl gap-2 bg-violet-600 hover:bg-violet-500 text-white shadow-lg">
              Next: Strategy Recommendation
              <ChevronRight size={16} />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

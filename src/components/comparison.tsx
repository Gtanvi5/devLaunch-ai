"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  X,
  Sparkles,
  Bot,
  Search,
  AlertTriangle,
  Clock,
} from "lucide-react";

const methods = [
  {
    id: "manual",
    name: "Manual Research",
    subtitle: "Google & Excel",
    icon: Search,
    time: "3-5 Days",
    style:
      "bg-white/50 dark:bg-white/[0.02] border-zinc-200 dark:border-white/10",
    iconBg: "bg-zinc-100 dark:bg-white/10",
    iconColor: "text-zinc-600 dark:text-zinc-400",
    features: [
      { name: "Live Web & SEO Data", status: "no" },
      {
        name: "Direct Competitor Analysis",
        status: "yes",
        detail: "Manual & slow",
      },
      {
        name: "Specific Venture Frameworks",
        status: "yes",
        detail: "Requires expertise",
      },
      {
        name: "3-Year Revenue Projections",
        status: "no",
        detail: "Complex modeling",
      },
      { name: "Polished PDF Exports", status: "no" },
    ],
  },
  {
    id: "chatgpt",
    name: "Generic AI",
    subtitle: "ChatGPT / Claude",
    icon: Bot,
    time: "3-4 Hours",
    style:
      "bg-white/50 dark:bg-white/[0.02] border-zinc-200 dark:border-white/10",
    iconBg: "bg-zinc-100 dark:bg-white/10",
    iconColor: "text-zinc-600 dark:text-zinc-400",
    features: [
      {
        name: "Live Web & SEO Data",
        status: "no",
        detail: "Outdated knowledge",
      },
      { name: "Direct Competitor Analysis", status: "no" },
      {
        name: "Specific Venture Frameworks",
        status: "partial",
        detail: "Surface-level output",
      },
      {
        name: "3-Year Revenue Projections",
        status: "partial",
        detail: "Often hallucinated",
      },
      {
        name: "Polished PDF Exports",
        status: "no",
        detail: "Copy-paste required",
      },
    ],
  },
  {
    id: "devlaunch",
    name: "DevLaunch AI",
    subtitle: "Specialized Multi-Agent",
    icon: Sparkles,
    time: "2 Minutes",
    isHighlight: true,
    style:
      "bg-white dark:bg-zinc-900 border-violet-500/30 dark:border-violet-500/50 shadow-2xl shadow-violet-500/10 dark:shadow-violet-500/20 relative lg:-mt-4 lg:mb-4 z-10 ring-1 ring-violet-500/20",
    iconBg: "bg-violet-100 dark:bg-violet-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    features: [
      {
        name: "Live Web & SEO Data",
        status: "yes",
        detail: "Real-time scraping",
      },
      {
        name: "Direct Competitor Analysis",
        status: "yes",
        detail: "Deep market scan",
      },
      {
        name: "Specific Venture Frameworks",
        status: "yes",
        detail: "Advanced SWOT & TAM",
      },
      {
        name: "3-Year Revenue Projections",
        status: "yes",
        detail: "Deterministic math",
      },
      { name: "Polished PDF Exports", status: "yes", detail: "Ready to pitch" },
    ],
  },
];

const StatusIcon = ({
  status,
}: {
  status: "yes" | "no" | "partial" | string;
}) => {
  switch (status) {
    case "yes":
      return (
        <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mt-0.5">
          <Check
            className="w-3 h-3 text-emerald-600 dark:text-emerald-400"
            strokeWidth={3}
          />
        </div>
      );
    case "no":
      return (
        <div className="shrink-0 w-5 h-5 flex items-center justify-center mt-0.5 opacity-40">
          <X className="w-4 h-4 text-zinc-500" strokeWidth={2.5} />
        </div>
      );
    case "partial":
      return (
        <div className="shrink-0 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center mt-0.5">
          <AlertTriangle
            className="w-3 h-3 text-amber-600 dark:text-amber-400"
            strokeWidth={2.5}
          />
        </div>
      );
  }
};

export default function Comparison() {
  return (
    <section className="relative py-24 md:py-32 bg-zinc-50 dark:bg-[#0A0A0A] overflow-hidden selection:bg-violet-500/30">
      <div className="absolute top-0 inset-x-0 h-125 bg-linear-to-b from-white via-transparent to-transparent dark:from-white/2 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-100 bg-violet-500/5 dark:bg-violet-500/10 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-sm font-mono font-medium tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-4">
              The Alternatives
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-6">
              Why not just use <br className="hidden md:block" />
              <span className="text-zinc-300 dark:text-zinc-700 relative inline-block">
                <span className="relative z-10">ChatGPT?</span>
                <span className="absolute left-0 top-1/2 w-full h-0.75 -translate-y-1/2 bg-red-500/80 -rotate-2 z-20 rounded-full" />
              </span>
            </h3>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Generic AI gives you generic advice. DevLaunch uses a specialized
              workflow that browses the web, analyzes competitors, and
              calculates real math.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
          {methods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.15,
                  ease: "easeOut",
                }}
                className={`flex flex-col rounded-[2rem] border backdrop-blur-xl p-8 relative overflow-hidden ${method.style}`}
              >
                {method.isHighlight && (
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-violet-500/20 blur-[50px] rounded-full pointer-events-none" />
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${method.iconBg}`}
                  >
                    {method.id === "devlaunch" ? (
                      <>
                        <Image
                          src="/logo.png"
                          alt="DevLaunch AI Logo"
                          width={40}
                          height={40}
                          className="object-contain block dark:hidden"
                        />
                        <Image
                          src="/dark-logo.png"
                          alt="DevLaunch AI Logo"
                          width={40}
                          height={40}
                          className="object-contain hidden dark:block"
                        />
                      </>
                    ) : (
                      <Icon className={`w-6 h-6 ${method.iconColor}`} />
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                      {method.id === "devlaunch" ? (
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                          {method.name}
                        </span>
                      ) : (
                        method.name
                      )}
                    </h3>
                    <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
                      {method.subtitle}
                    </p>
                  </div>
                </div>

                <div
                  className={`mb-8 p-4 rounded-xl border flex items-center gap-4 ${
                    method.isHighlight
                      ? "bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20"
                      : "bg-zinc-50 dark:bg-white/3 border-zinc-200 dark:border-white/5"
                  }`}
                >
                  <Clock
                    className={`w-5 h-5 ${method.isHighlight ? "text-violet-600 dark:text-violet-400" : "text-zinc-400"}`}
                  />
                  <div>
                    <div className="text-xs uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400 mb-0.5">
                      Time to Complete
                    </div>
                    <div
                      className={`text-lg font-mono font-medium ${method.isHighlight ? "text-violet-700 dark:text-violet-300" : "text-zinc-900 dark:text-white"}`}
                    >
                      {method.time}
                    </div>
                  </div>
                </div>

                <div className="grow space-y-4">
                  {method.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <StatusIcon status={feature.status} />
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-medium ${
                            feature.status === "no"
                              ? "text-zinc-500 dark:text-zinc-500"
                              : "text-zinc-800 dark:text-zinc-200"
                          }`}
                        >
                          {feature.name}
                        </span>
                        {feature.detail && (
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            {feature.detail}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {method.isHighlight && (
                  <Link
                    href="/dashboard"
                    className="mt-8 flex w-full items-center justify-center py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors shadow-lg shadow-violet-500/25"
                  >
                    Start Validating Now
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

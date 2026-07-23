"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Wrench,
  Bug,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ChangelogUpdate {
  version: string;
  date: string;
  title: string;
  description: string;
  type: "feature" | "improvement" | "bug";
  icon: LucideIcon;
  imageUrl?: string;
  imageAlt?: string;
  bullets?: string[];
  codeSnippet?: string;
  link?: {
    url: string;
    text: string;
  };
}

const updates: ChangelogUpdate[] = [
  {
    version: "v1.3.0",
    date: "July 19, 2026",
    title: "Database Credit System & Route Security",
    description:
      "Implemented a robust database-backed credit system using PostgreSQL and Prisma. We also added dynamic route protection via Clerk middleware to ensure secure, authenticated access to the validation engine.",
    type: "feature",
    icon: ShieldCheck,
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Code editor showing database schema",
    bullets: [
      "Real-time optimistic UI updates for credit deductions.",
      "Strict Clerk authentication middleware applied to /dashboard.",
      "Integrated Prisma transactions to ensure data consistency.",
    ],
    codeSnippet: `// Deduct credits and save report in one transaction
const [savedReport] = await prisma.$transaction([
  prisma.report.create({ data: reportData }),
  prisma.user.update({
    where: { id: userId },
    data: { credits: user.credits - 1 }
  }),
]);`,
    link: { url: "#", text: "Read the migration guide" },
  },
  {
    version: "v1.2.0",
    date: "April 18, 2026",
    title: "Multi-Agent Market Research Engine",
    description:
      "We completely overhauled the validation engine. DevLaunch AI now spins up three distinct AI agents—a Marketer, a Developer, and an Investor—to analyze your idea from multiple angles before generating the final report.",
    type: "feature",
    icon: Sparkles,
    bullets: [
      "Marketer Agent: Analyzes TAM, SAM, and SOM.",
      "Developer Agent: Suggests optimal tech stacks.",
      "Investor Agent: Calculates risk-to-reward ratio.",
    ],
  },
  {
    version: "v1.1.4",
    date: "April 02, 2026",
    title: "Improved PDF Exports & Formatting",
    description:
      "Validation reports exported to PDF now retain their charts, graphs, and custom typography. We also fixed a bug where text would occasionally overflow on the competitor analysis matrix.",
    type: "improvement",
    icon: Wrench,
    link: { url: "#", text: "View sample PDF" },
  },
  {
    version: "v1.1.0",
    date: "March 15, 2026",
    title: "Stripe Integration & Pro Tier",
    description:
      "You can now upgrade to DevLaunch Pro directly from your dashboard to unlock unlimited validation reports, custom API access, and priority email support.",
    type: "feature",
    icon: Sparkles,
  },
  {
    version: "v1.0.1",
    date: "March 05, 2026",
    title: "Authentication Hotfix",
    description:
      "Resolved an edge case where users signing in via GitHub OAuth were occasionally redirected to a blank dashboard state.",
    type: "bug",
    icon: Bug,
  },
];

export default function Changelog() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:text-center"
        >
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-4">
            Changelog
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            See what we&apos;ve shipped recently.
          </p>
        </motion.div>

        <ol className="relative border-l border-zinc-200 dark:border-white/10 ml-3 md:ml-4 space-y-16">
          {updates.map((update, idx) => (
            <motion.li
              key={update.version}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute -left-1.5 md:-left-2 top-1.5 h-3 w-3 md:h-4 md:w-4 rounded-full border-2 border-violet-500 bg-zinc-50 dark:bg-[#0A0A0A] ring-4 ring-zinc-50 dark:ring-[#0A0A0A] shadow-[0_0_10px_rgba(139,92,246,0.5)]" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                <time className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
                  {update.date}
                </time>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="text-sm font-medium text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-md w-fit shadow-sm">
                  {update.version}
                </span>

                <span
                  className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${
                    update.type === "feature"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20"
                      : update.type === "improvement"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20"
                  }`}
                >
                  <update.icon className="w-3.5 h-3.5" />
                  <span className="capitalize">{update.type}</span>
                </span>
              </div>

              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                {update.title}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 text-[15px]">
                {update.description}
              </p>

              {update.imageUrl && (
                <div className="relative mb-6 w-full h-48 sm:h-64 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={update.imageUrl}
                    alt={update.imageAlt || update.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 48rem"
                  />
                </div>
              )}

              {update.bullets && (
                <ul className="mb-6 space-y-2">
                  {update.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <CheckCircle2 className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {update.codeSnippet && (
                <div className="mb-6 rounded-xl overflow-hidden border border-zinc-800 bg-[#121212] p-4 text-sm font-mono text-zinc-300 shadow-inner overflow-x-auto custom-scrollbar">
                  <pre>
                    <code>{update.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {update.link && (
                <Link
                  href={update.link.url}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors group"
                >
                  {update.link.text}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </main>
  );
}

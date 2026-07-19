import { Metadata } from "next";
import { Sparkles, Wrench, Bug, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Changelog | DevLaunch AI",
  description: "New updates and improvements to DevLaunch AI.",
};

const updates = [
  {
    version: "v1.3.0",
    date: "July 19, 2026",
    title: "Real-Time Credit System & Security Overhaul",
    description:
      "We rolled out a robust PostgreSQL-backed credit engine. Users now start with 10 free validation credits, securely tracked and deducted in real-time. We also locked down the entire application with advanced Clerk Middleware to ensure strict route protection.",
    type: "feature",
    icon: ShieldCheck,
  },
  {
    version: "v1.2.0",
    date: "April 18, 2026",
    title: "Multi-Agent Market Research Engine",
    description:
      "We completely overhauled the validation engine. DevLaunch AI now spins up three distinct AI agents—a Marketer, a Developer, and an Investor—to analyze your idea from multiple angles before generating the final report.",
    type: "feature",
    icon: Sparkles,
  },
  {
    version: "v1.1.4",
    date: "April 02, 2026",
    title: "Improved PDF Exports & Formatting",
    description:
      "Validation reports exported to PDF now retain their charts, graphs, and custom typography. We also fixed a bug where text would occasionally overflow on the competitor analysis matrix.",
    type: "improvement",
    icon: Wrench,
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
        <div className="mb-16 md:text-center">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-4">
            Changelog
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            See what we've shipped recently.
          </p>
        </div>

        <div className="relative border-l border-zinc-200 dark:border-white/10 ml-3 md:ml-4 space-y-12">
          {updates.map((update, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12 group">
              {/* Interactive Timeline Dot */}
              <div className="absolute -left-1.5 md:-left-2 top-1.5 h-3 w-3 md:h-4 md:w-4 rounded-full border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0A0A0A] ring-4 ring-zinc-50 dark:ring-[#0A0A0A] group-hover:border-violet-500 transition-colors duration-300" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                <time className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
                  {update.date}
                </time>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="text-sm font-medium text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-md w-fit">
                  {update.version}
                </span>

                {/* Dynamic Tag */}
                <span
                  className={`flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full w-fit ${
                    update.type === "feature"
                      ? "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                      : update.type === "improvement"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                        : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                  }`}
                >
                  <update.icon className="w-3 h-3" />
                  <span className="capitalize">{update.type}</span>
                </span>
              </div>

              <h2 className="text-xl font-medium text-zinc-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                {update.title}
              </h2>

              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {update.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

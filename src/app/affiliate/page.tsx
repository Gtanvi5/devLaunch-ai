import Link from "next/link";
import { Metadata } from "next";
import { Rocket, DollarSign, Link as LinkIcon, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate Program | DevLaunch AI",
  description:
    "Earn a 30% recurring commission by referring founders to DevLaunch AI.",
};

export default function AffiliateProgram() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10 text-center">
        <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-violet-600 bg-violet-500/10 dark:text-violet-400 border border-violet-500/20 mb-8">
          DevLaunch Partners
        </span>
        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-6">
          Earn{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">
            30% recurring
          </span>{" "}
          commission.
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12">
          Help founders build better products and get paid for it. Earn a 30%
          cut for every month your referral stays subscribed, forever.
        </p>

        <a
          href="#"
          className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 dark:bg-white px-8 font-medium text-white dark:text-zinc-900 transition-transform hover:scale-105 active:scale-95"
        >
          Apply to Affiliate Program
        </a>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5">
            <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center mb-4">
              <LinkIcon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
              1. Get your link
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Sign up and get a custom tracking link to share with your
              audience.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5">
            <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
              2. Share it
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Promote DevLaunch AI on your blog, Twitter, newsletter, or
              YouTube.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5">
            <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
              3. Get paid
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Earn 30% of their subscription fee every single month they stay
              active.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useOrganization } from "@clerk/nextjs";
import Link from "next/link";
import { Lock, Sparkles, LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return (
      <nav className="w-64 border-r border-zinc-200 dark:border-zinc-800 p-4 space-y-3">
        <div className="h-8 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg animate-pulse w-full" />
        <div className="h-8 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg animate-pulse w-full" />
      </nav>
    );
  }

  const plan = organization?.publicMetadata?.plan as string | undefined;
  const isPro = plan === "pro" || plan === "enterprise";

  return (
    <nav className="w-64 border-r border-zinc-200 dark:border-zinc-800 p-4 space-y-2">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 p-2 hover:bg-zinc-100 rounded-lg"
      >
        <LayoutDashboard className="w-4 h-4" /> Dashboard
      </Link>

      {isPro ? (
        <Link
          href="/dashboard/advanced-analytics"
          className="flex items-center gap-2 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-violet-600 dark:text-violet-400 font-medium"
        >
          <Sparkles className="w-4 h-4" /> Advanced Analytics
        </Link>
      ) : (
        <Link
          href="/pricing"
          className="flex items-center justify-between p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg group transition-colors"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" /> Advanced Analytics
          </div>
          <span className="text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full group-hover:bg-violet-100 group-hover:text-violet-600 dark:group-hover:bg-violet-500/20 dark:group-hover:text-violet-300 transition-colors">
            PRO
          </span>
        </Link>
      )}
    </nav>
  );
}

"use client";

import { useOrganization } from "@clerk/nextjs";
import Link from "next/link";
import { Lock, Sparkles, LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) return null;

  // Safely check the metadata attached to the active workspace
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

      {/* Conditionally render based on the plan */}
      {isPro ? (
        <Link
          href="/dashboard/advanced-analytics"
          className="flex items-center gap-2 p-2 hover:bg-zinc-100 rounded-lg text-violet-600"
        >
          <Sparkles className="w-4 h-4" /> Advanced Analytics
        </Link>
      ) : (
        <div className="flex items-center justify-between p-2 text-zinc-400 cursor-not-allowed group">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" /> Advanced Analytics
          </div>
          <span className="text-[10px] bg-zinc-100 px-2 py-0.5 rounded-full group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors">
            PRO
          </span>
        </div>
      )}
    </nav>
  );
}

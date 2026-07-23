"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  History,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const sidebarLinks = [
  { name: "New Validation", path: "/dashboard", icon: LayoutDashboard },
  { name: "My Reports", path: "/dashboard/reports", icon: History },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full bg-zinc-50 dark:bg-zinc-950 overflow-hidden font-sans">
      <motion.aside
        animate={{ width: isCollapsed ? "80px" : "260px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-xl shadow-sm z-20 shrink-0"
      >
        <div className="flex h-16 items-center px-4 border-b border-zinc-200 dark:border-zinc-800/50">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20">
              <Sparkles className="h-4 w-4 fill-current" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
                DevLaunch<span className="text-violet-500">.ai</span>
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 space-y-1.5 p-4">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.path;
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                href={link.path}
                className="relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors group"
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon
                  className={`relative z-10 h-4 w-4 shrink-0 ${
                    isActive
                      ? "text-violet-600 dark:text-violet-400"
                      : "text-zinc-500 group-hover:text-violet-500 transition-colors"
                  }`}
                />
                {!isCollapsed && (
                  <span
                    className={`relative z-10 ${
                      isActive
                        ? "text-violet-900 dark:text-violet-300 font-semibold"
                        : "text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white"
                    }`}
                  >
                    {link.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-200 dark:border-zinc-800/50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <UserButton
              appearance={{
                elements: { avatarBox: "w-8 h-8 rounded-lg shadow-sm" },
              }}
            />
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                  My Account
                </span>
                <span className="text-[10px] font-medium text-zinc-500">
                  Pro Member
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-sm text-zinc-400 hover:text-violet-600 transition-colors z-30"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>
      </motion.aside>

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
}

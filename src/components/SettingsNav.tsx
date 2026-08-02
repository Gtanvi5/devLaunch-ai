"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { id: "profile", label: "Profile", href: "/dashboard/settings/profile" },
  { id: "billing", label: "Billing", href: "/dashboard/settings/billing" },
  { id: "team", label: "Team", href: "/dashboard/settings/team" },
  { id: "api", label: "API Keys", href: "/dashboard/settings/api" },
];

export default function SettingsNav() {
  const pathname = usePathname();

  return (
    <div className="w-full border-b border-zinc-200 dark:border-zinc-800">
      <nav
        className="flex gap-1 overflow-x-auto snap-x snap-mandatory px-4 py-3 sm:px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
        aria-label="Settings Navigation"
      >
        {navItems.map((tab) => {
          const isActive =
            pathname === tab.href || pathname.startsWith(`${tab.href}/`);

          return (
            <Link
              key={tab.id}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full snap-start transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-zinc-950 ${
                isActive
                  ? "text-violet-700 dark:text-violet-300"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <span className="relative z-10">{tab.label}</span>

              {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute inset-0 bg-violet-100 dark:bg-violet-500/20 rounded-full z-0"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

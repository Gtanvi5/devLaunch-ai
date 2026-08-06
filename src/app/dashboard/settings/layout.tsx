"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { User, CreditCard, Key, Shield } from "lucide-react";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/settings/profile",
    icon: User,
  },
  {
    title: "Billing & Plan",
    href: "/dashboard/settings/billing",
    icon: CreditCard,
  },
  {
    title: "API Keys",
    href: "/dashboard/settings/api",
    icon: Key,
  },
  {
    title: "Team",
    href: "/dashboard/settings/team",
    icon: Shield,
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] p-4 md:p-8 pt-24 md:pt-8 lg:pl-72">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage your account settings, preferences, and billing information.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-3 shadow-sm">
              <nav className="space-y-1">
                {sidebarNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                        isActive
                          ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800/80 shadow-xs"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${isActive ? "text-violet-500" : "text-zinc-400"}`}
                      />
                      {item.title}
                      {isActive && (
                        <motion.div
                          layoutId="activeSettingsIndicator"
                          className="absolute left-0 w-1 h-5 bg-violet-500 rounded-r-full"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="flex-1 w-full min-w-0">{children}</div>
        </div>
      </div>
    </main>
  );
}

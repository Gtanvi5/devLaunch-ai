"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, CreditCard, Users, Code } from "lucide-react";

const SETTINGS_TABS = [
  { href: "/settings/profile", label: "Profile", icon: User },
  { href: "/settings/billing", label: "Billing & Credits", icon: CreditCard },
  { href: "/settings/team", label: "Team", icon: Users },
  { href: "/settings/api", label: "API Keys", icon: Code },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
      <div className="max-w-5xl mx-auto h-full">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
            Account Settings
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your subscription, credits, and preferences.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <nav
              aria-label="Settings navigation"
              className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar"
            >
              {SETTINGS_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = pathname.startsWith(tab.href);

                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-white dark:bg-zinc-900 text-violet-600 dark:text-violet-400 shadow-sm border border-zinc-200/50 dark:border-zinc-800/50"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive
                          ? "text-violet-600 dark:text-violet-400"
                          : "text-zinc-400"
                      }`}
                      aria-hidden="true"
                    />
                    {tab.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1 min-w-0 pb-12">{children}</main>
        </div>
      </div>
    </div>
  );
}

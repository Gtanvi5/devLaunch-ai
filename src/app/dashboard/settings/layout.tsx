import SettingsNav from "@/components/SettingsNav";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 md:p-8 w-full max-w-6xl mx-auto">
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
          <SettingsNav />
        </aside>

        <main className="flex-1 min-w-0 pb-12">{children}</main>
      </div>
    </div>
  );
}

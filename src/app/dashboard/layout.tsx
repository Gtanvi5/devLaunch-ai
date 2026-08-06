import { Toaster } from "sonner";
import Sidebar from "@/components/SidebarDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-zinc-50 dark:bg-zinc-950 overflow-hidden font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative">
        {children}
        <Toaster position="bottom-right" richColors />
      </main>
    </div>
  );
}

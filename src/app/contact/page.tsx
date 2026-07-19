import { Metadata } from "next";
import { Mail, MessageSquare, Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Support | DevLaunch AI",
  description: "Get in touch with the DevLaunch AI team.",
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-6">
          How can we help?
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-12">
          Have a question about billing, features, or your account? We're here
          to help.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <a
            href="mailto:support@devlaunchai.com"
            className="group flex flex-col items-center p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 hover:border-violet-500/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5 text-zinc-900 dark:text-white" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
              Email Support
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              support@devlaunchai.com
            </p>
          </a>

          <a
            href="https://x.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 hover:border-violet-500/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Twitter className="w-5 h-5 text-zinc-900 dark:text-white" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
              X / Twitter
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              DM us @DevLaunchAI
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}

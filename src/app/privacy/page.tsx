import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DevLaunch AI",
  description: "How we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Legal Typography Wrapper */}
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 space-y-8">
          <section>
            <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us when you create
              an account, use our validation engine, or communicate with us.
              This includes your name, email address, and the startup
              ideas/prompts you input into DevLaunch AI.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4">
              2. How We Use Your Data
            </h2>
            <p>
              Your ideas are your own. We use the data you provide solely to
              generate validation reports, improve our AI models (only if you
              opt-in), and provide customer support. We do not sell your data to
              third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4">
              3. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your
              account and data. However, no method of transmission over the
              Internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4">
              4. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:support@devlaunchai.com"
                className="text-violet-600 dark:text-violet-400 hover:underline"
              >
                support@devlaunchai.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

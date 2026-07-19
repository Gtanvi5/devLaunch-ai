import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | DevLaunch AI",
  description: "Terms and conditions for using DevLaunch AI.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-4">
            Terms of Service
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

        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 space-y-8">
          <section>
            <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using DevLaunch AI, you agree to be bound by these
              Terms of Service and all applicable laws and regulations. If you
              do not agree with any of these terms, you are prohibited from
              using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4">
              2. Use License
            </h2>
            <p>
              Permission is granted to temporarily use the materials and
              services on DevLaunch AI for personal or commercial startup
              validation. This is the grant of a license, not a transfer of
              title.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4">
              3. AI Generation Disclaimer
            </h2>
            <p>
              DevLaunch AI uses artificial intelligence to generate business
              validations, code snippets, and marketing plans. While we strive
              for accuracy, we cannot guarantee the viability or success of any
              business idea based on our reports.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

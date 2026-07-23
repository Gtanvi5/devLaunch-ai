import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | DevLaunch AI",
  description: "The story and team behind DevLaunch AI.",
};

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24 relative overflow-hidden">

      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-150 h-150 bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-6">
            We build for <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-500 to-indigo-500">
              the builders.
            </span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            DevLaunch AI was born out of a simple, frustrating truth: building
            software is easy, but building the{" "}
            <span className="italic">right</span> software is incredibly hard.
          </p>
        </div>

        <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none text-zinc-600 dark:text-zinc-400 space-y-8">
          <p>
            For years, the standard advice for indie hackers and startup
            founders has been to &quot;talk to users&quot; and &quot;validate your idea.&quot; But
            in reality, thorough market research takes weeks. You have to scour
            Reddit threads, analyze competitor pricing models, and conduct
            customer interviews—all before writing a single line of code.
          </p>

          <p>
            We realized that Large Language Models were perfectly positioned to
            solve this bottleneck. If fed the right prompts, AI could simulate
            market conditions, analyze sentiment, and spot gaps in a market
            instantly.
          </p>

          <div className="pl-6 border-l-4 border-violet-500 my-10 py-2">
            <h3 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white m-0 mb-2">
              Our Mission
            </h3>
            <p className="m-0 text-zinc-500 dark:text-zinc-400 text-base">
              To democratize enterprise-grade market research so individual
              founders can launch products with the confidence of a VC-backed
              startup.
            </p>
          </div>

          <h3 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white">
            The Technology
          </h3>
          <p>
            DevLaunch AI isn&apos;t just a simple wrapper. Under the hood, we use a
            multi-agent architecture. When you submit an idea, we spin up
            virtual personas—a cynical investor, a target customer, and a
            technical lead. They debate your idea, analyze live web data, and
            compile their findings into the actionable report you see on your
            dashboard.
          </p>

          <h3 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Built for Privacy
          </h3>
          <p>
            As founders ourselves, we know that ideas are precious. We have a
            strict zero-retention policy for our validation models. Your inputs
            are never used to train generalized AI models, and your validation
            reports are securely encrypted and accessible only to you.
          </p>
        </div>
      </div>
    </main>
  );
}

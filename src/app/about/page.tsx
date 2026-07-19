// import { Metadata } from "next";
// import { Terminal, Heart, Eye } from "lucide-react";

// export const metadata: Metadata = {
//   title: "About Us | DevLaunch AI",
//   description:
//     "The story, values, and vision behind the DevLaunch multi-agent system.",
// };

// export default function AboutUs() {
//   return (
//     <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24 relative overflow-hidden">
//       {/* Visual Ambient Blur */}
//       <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

//       <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10">
//         {/* Core Headline */}
//         <div className="mb-16">
//           <span className="text-xs font-mono font-medium tracking-widest text-zinc-400 dark:text-zinc-500 uppercase block mb-3">
//             Our Manifesto
//           </span>
//           <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-6">
//             Built for those who <br className="hidden sm:block" />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-400">
//               refuse to build blindly.
//             </span>
//           </h1>
//           <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
//             DevLaunch AI was born out of profound frustration. We were tired of
//             spending months coding products, deploying them onto empty forums,
//             and discovering nobody actually wanted them.
//           </p>
//         </div>

//         {/* The Text Layout */}
//         <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 space-y-8 leading-relaxed">
//           <p>
//             Traditional product validation requires dozens of hours scouring
//             subreddits, formatting mock spreadsheets, scraping keyword trends,
//             and assembling competitive landscapes manually. Most indie hackers
//             skip this stage because it is tedious, resulting in months of wasted
//             engineering effort.
//           </p>
//           <p>
//             We engineered **DevLaunch AI** to eliminate that friction. By
//             leveraging structured multi-agent arrays, we compress days of
//             research into structural market validations within minutes.
//           </p>

//           <hr className="border-zinc-200 dark:border-white/5 my-12" />

//           {/* Value Cards */}
//           <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-6">
//             Our Foundational Principles
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose">
//             <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5">
//               <div className="flex items-center gap-3 text-zinc-950 dark:text-white font-medium mb-2">
//                 <Terminal className="w-4 h-4 text-indigo-500" />
//                 <h3>Built by Devs</h3>
//               </div>
//               <p className="text-sm text-zinc-500 dark:text-zinc-400">
//                 Zero bloated tracking structures, zero unnecessary popups, and
//                 light-speed response loops. We optimize cleanly for utility.
//               </p>
//             </div>

//             <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5">
//               <div className="flex items-center gap-3 text-zinc-950 dark:text-white font-medium mb-2">
//                 <Eye className="w-4 h-4 text-violet-500" />
//                 <h3>Absolute Privacy</h3>
//               </div>
//               <p className="text-sm text-zinc-500 dark:text-zinc-400">
//                 Your ideas are sacred data inputs. We never look through
//                 proprietary telemetry or share analysis configurations with
//                 competitors.
//               </p>
//             </div>
//           </div>

//           <p className="pt-8">
//             We operate out in the open and adjust our architectural models
//             weekly based on recommendations from our users. If you have
//             questions about our pipeline, reach out to us on X or drop us a line
//             at{" "}
//             <a
//               href="mailto:support@devlaunchai.com"
//               className="text-violet-600 dark:text-violet-400 font-semibold hover:underline"
//             >
//               support@devlaunchai.com
//             </a>
//             .
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | DevLaunch AI",
  description: "The story and team behind DevLaunch AI.",
};

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-6">
            We build for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-500">
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
            founders has been to "talk to users" and "validate your idea." But
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
            DevLaunch AI isn't just a simple wrapper. Under the hood, we use a
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

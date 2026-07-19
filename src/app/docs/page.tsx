// import Link from "next/link";
// import { Metadata } from "next";
// import {
//   BookOpen,
//   Compass,
//   Zap,
//   HelpCircle,
//   Code,
//   ArrowRight,
// } from "lucide-react";

// export const metadata: Metadata = {
//   title: "Documentation | DevLaunch AI",
//   description:
//     "Learn how to maximize our multi-agent framework to evaluate and ship your products.",
// };

// const docCategories = [
//   {
//     icon: Compass,
//     title: "Getting Started",
//     description:
//       "Learn the basics of framing prompts to get razor-sharp market validation signals.",
//     links: [
//       "Quick Start Guide",
//       "How multi-agent validation works",
//       "Understanding your Dashboard",
//     ],
//   },
//   {
//     icon: Zap,
//     title: "Features & Frameworks",
//     description:
//       "Deep dives into target audience profiling, competitor grids, and smoke test strategies.",
//     links: [
//       "Competitor Analysis Matrix",
//       "Generating dynamic landing page copy",
//       "Defining your MVP scope",
//     ],
//   },
//   {
//     icon: Code,
//     title: "Advanced Strategies",
//     description:
//       "Export workflows, customizing your AI personality, and programmatic API setups.",
//     links: [
//       "Exporting to Pitch Decks",
//       "Webhooks for automated scanning",
//       "Using variables in ideas",
//     ],
//   },
//   {
//     icon: HelpCircle,
//     title: "FAQ & Troubleshooting",
//     description:
//       "Answers to common billing questions, credit limits, and analytical output queries.",
//     links: [
//       "How credits refresh",
//       "Changing your tech stack rules",
//       "Data isolation protocols",
//     ],
//   },
// ];

// export default function Documentation() {
//   return (
//     <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24">
//       <div className="mx-auto max-w-5xl px-6 lg:px-8">
//         {/* Header Banner */}
//         <div className="text-center max-w-2xl mx-auto mb-20">
//           <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-4">
//             Documentation & Guides
//           </h1>
//           <p className="text-lg text-zinc-500 dark:text-zinc-400">
//             Everything you need to transform your raw concepts into
//             market-validated, production-ready blueprints.
//           </p>
//         </div>

//         {/* Dynamic Category Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {docCategories.map((category, idx) => {
//             const Icon = category.icon;
//             return (
//               <div
//                 key={idx}
//                 className="p-8 rounded-3xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-800/80 transition-colors"
//               >
//                 <div>
//                   <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center mb-6 border border-zinc-200/40 dark:border-white/5">
//                     <Icon className="w-5 h-5 text-zinc-900 dark:text-zinc-300" />
//                   </div>
//                   <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-2">
//                     {category.title}
//                   </h3>
//                   <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
//                     {category.description}
//                   </p>
//                 </div>

//                 <ul className="space-y-3 border-t border-zinc-100 dark:border-white/5 pt-6">
//                   {category.links.map((link, lIdx) => (
//                     <li key={lIdx}>
//                       <Link
//                         href="#"
//                         className="group/link flex items-center justify-between text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
//                       >
//                         <span>{link}</span>
//                         <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-violet-500" />
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             );
//           })}
//         </div>

//         {/* Footer Support Prompt */}
//         <div className="mt-16 text-center border-t border-zinc-200/60 dark:border-white/5 pt-12">
//           <p className="text-sm text-zinc-500 dark:text-zinc-400">
//             Can't find what you are looking for?{" "}
//             <Link
//               href="/contact"
//               className="text-violet-600 dark:text-violet-400 font-semibold hover:underline"
//             >
//               Contact our product team directly
//             </Link>
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }

import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Zap,
  Target,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation | DevLaunch AI",
  description: "Learn how to use DevLaunch AI to validate your startup.",
};

const guides = [
  {
    title: "Quick Start Guide",
    description:
      "Learn how to run your very first validation report in under 2 minutes.",
    icon: Zap,
    href: "#",
  },
  {
    title: "Prompting the AI",
    description:
      "Best practices for describing your idea to get the most accurate market analysis.",
    icon: BookOpen,
    href: "#",
  },
  {
    title: "Interpreting Scores",
    description:
      "Understand our 1-100 Viability Score, Competitor Threat levels, and Market Caps.",
    icon: Target,
    href: "#",
  },
  {
    title: "Exporting & Sharing",
    description:
      "How to export your reports to PDF or generate shareable links for investors.",
    icon: ArrowRight,
    href: "#",
  },
  {
    title: "Data Privacy",
    description:
      "How we protect your intellectual property and ensure your ideas remain yours.",
    icon: ShieldCheck,
    href: "#",
  },
  {
    title: "Billing & Subscriptions",
    description:
      "Manage your Pro subscription, invoice history, and usage limits.",
    icon: CreditCard,
    href: "#",
  },
];

export default function Documentation() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-4">
            Documentation
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Everything you need to master the validation engine and build
            products people actually want.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, idx) => (
            <Link
              key={idx}
              href={guide.href}
              className="group relative flex flex-col p-6 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-violet-50 dark:group-hover:bg-violet-500/10 transition-colors">
                <guide.icon className="w-6 h-6 text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
              </div>
              <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
                {guide.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-grow">
                {guide.description}
              </p>
              <div className="mt-6 flex items-center text-sm font-medium text-violet-600 dark:text-violet-400">
                Read guide
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

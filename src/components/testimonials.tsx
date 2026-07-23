"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonialsRow1 = [
  {
    name: "Sarah Jenkins",
    handle: "@sarah_builds",
    role: "Indie Hacker",
    content:
      "DevLaunch AI literally saved me 3 months of building the wrong product. The competitor vulnerability report was terrifyingly accurate.",
    avatar: "SJ",
    avatarBg:
      "from-blue-100 to-indigo-100 dark:from-blue-500/20 dark:to-indigo-500/20",
    avatarText: "text-blue-700 dark:text-blue-400",
  },
  {
    name: "Marcus Chen",
    handle: "@marcus_startup",
    role: "SaaS Founder",
    content:
      "I used to pay consultants $2k for market research. This tool does it better, faster, and cheaper. The 3-year revenue projections helped me secure my pre-seed round.",
    avatar: "MC",
    avatarBg:
      "from-emerald-100 to-teal-100 dark:from-emerald-500/20 dark:to-teal-500/20",
    avatarText: "text-emerald-700 dark:text-emerald-400",
  },
  {
    name: "Elena Rodriguez",
    handle: "@elena_dev",
    role: "Full-Stack Dev",
    content:
      "The go-to-market strategy it generated gave me exactly what I needed to launch. Hit $1k MRR in my first month. Blank page syndrome is cured.",
    avatar: "ER",
    avatarBg:
      "from-violet-100 to-fuchsia-100 dark:from-violet-500/20 dark:to-fuchsia-500/20",
    avatarText: "text-violet-700 dark:text-violet-400",
  },
  {
    name: "David Kim",
    handle: "@dkim_designs",
    role: "Product Designer",
    content:
      "Finally, a tool that forces me to validate before I open Figma. The AI identified a massive flaw in my pricing model before I wrote a single line of code.",
    avatar: "DK",
    avatarBg:
      "from-amber-100 to-orange-100 dark:from-amber-500/20 dark:to-orange-500/20",
    avatarText: "text-amber-700 dark:text-amber-400",
  },
];

const testimonialsRow2 = [
  {
    name: "James Wilson",
    handle: "@jwilson_tech",
    role: "Serial Entrepreneur",
    content:
      "I run all my shower thoughts through DevLaunch AI now. It kills the bad ideas instantly and gives me a roadmap for the good ones.",
    avatar: "JW",
    avatarBg:
      "from-rose-100 to-red-100 dark:from-rose-500/20 dark:to-red-500/20",
    avatarText: "text-rose-700 dark:text-rose-400",
  },
  {
    name: "Aisha Patel",
    handle: "@aisha_codes",
    role: "Solo Founder",
    content:
      "The SWOT analysis is next level. It found 3 competitors I didn't even know existed and showed me exactly how to beat their onboarding flows.",
    avatar: "AP",
    avatarBg:
      "from-cyan-100 to-blue-100 dark:from-cyan-500/20 dark:to-blue-500/20",
    avatarText: "text-cyan-700 dark:text-cyan-400",
  },
  {
    name: "Tom Becker",
    handle: "@tom_b",
    role: "Maker",
    content:
      "Worth every single penny. It’s like having a Y Combinator partner sitting next to you grading your homework.",
    avatar: "TB",
    avatarBg:
      "from-fuchsia-100 to-pink-100 dark:from-fuchsia-500/20 dark:to-pink-500/20",
    avatarText: "text-fuchsia-700 dark:text-fuchsia-400",
  },
  {
    name: "Chloe Smith",
    handle: "@chloe_builds",
    role: "Software Engineer",
    content:
      "The dashboard is beautiful and the reports are deeply actionable. Stopped me from building another to-do app clone and pointed me to a real niche.",
    avatar: "CS",
    avatarBg:
      "from-indigo-100 to-violet-100 dark:from-indigo-500/20 dark:to-violet-500/20",
    avatarText: "text-indigo-700 dark:text-indigo-400",
  },
];

const XLogo = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-3.5 w-3.5 fill-current text-zinc-400 dark:text-zinc-500 group-hover/card:text-zinc-900 dark:group-hover/card:text-white transition-colors duration-500 cursor-pointer"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const VerifiedBadge = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500/90 fill-current"
  >
    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.74 2.746 1.867 3.447-.04.25-.06.51-.06.773 0 2.21 1.71 4 3.918 4 .512 0 1.002-.1 1.455-.28 .566 1.135 1.717 1.91 3.064 1.91 1.346 0 2.497-.775 3.064-1.91.452.18 1.942.28 1.455.28 2.21 0 3.918-1.79 3.918-4 0-.263-.02-.522-.06-.773 1.127-.7 1.867-1.986 1.867-3.446zm-11.22 3.24L7.06 11.52c-.3-.316-.3-.827 0-1.144.3-.316.786-.316 1.086 0l3.05 3.203L15.854 8.7c.3-.316.785-.316 1.085 0 .3.316.3.827 0 1.144l-5.658 5.9Z" />
  </svg>
);

type Testimonial = {
  name: string;
  handle: string;
  role: string;
  content: string;
  avatar: string;
  avatarBg: string;
  avatarText: string;
};

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="w-70 sm:w-85 md:w-100 shrink-0 rounded-[1.5rem] sm:rounded-[2rem] border border-zinc-200/80 dark:border-white/5 bg-white/80 dark:bg-zinc-900/30 backdrop-blur-xl p-5 sm:p-8 transition-all duration-500 hover:bg-white dark:hover:bg-zinc-900/60 hover:shadow-xl dark:hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 hover:border-zinc-300 dark:hover:border-white/10 group/card relative overflow-hidden flex flex-col justify-between">
      <div className="absolute -top-3 sm:-top-6 -right-2 sm:-right-4 text-[70px] sm:text-[100px] font-serif text-zinc-900/3 dark:text-white/2 leading-none pointer-events-none select-none group-hover/card:scale-110 group-hover/card:text-zinc-900/5 dark:group-hover/card:text-white/4 transition-all duration-700">
        &rdquo;
      </div>

      <div className="relative z-10">
        <div className="flex gap-1 mb-4 sm:mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              strokeWidth={2.5}
              className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-all duration-300 ease-in-out
                text-zinc-300 fill-transparent 
                dark:text-zinc-700 dark:fill-transparent 
                group-hover/card:fill-amber-400 group-hover/card:text-amber-400 
                dark:group-hover/card:fill-amber-400 dark:group-hover/card:text-amber-400`}
              style={{ transitionDelay: `${i * 75}ms` }}
            />
          ))}
        </div>

        <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-8">
          &ldquo;{t.content}&rdquo;
        </p>
      </div>

      <div className="flex items-center justify-between relative z-10 pt-4 sm:pt-6 border-t border-zinc-200/80 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br shadow-sm ${t.avatarBg}`}
          >
            <span
              className={`text-[11px] sm:text-xs font-bold tracking-tight ${t.avatarText}`}
            >
              {t.avatar}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-semibold text-zinc-900 dark:text-white text-[13px] sm:text-sm truncate">
                {t.name}
              </h4>
              <VerifiedBadge />
            </div>
            <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 tracking-wide truncate">
              {t.handle} • {t.role}
            </p>
          </div>
        </div>

        <div className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors hidden sm:block shrink-0 ml-2">
          <XLogo />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 md:py-32 bg-zinc-50 dark:bg-[#060608] overflow-hidden relative border-y border-zinc-200/50 dark:border-white/5 selection:bg-violet-500/30"
    >
      <div className="absolute top-0 inset-x-0 h-75 md:h-125 bg-linear-to-b from-zinc-100/80 via-transparent to-transparent dark:from-white/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 sm:w-150 md:w-200 h-75 sm:h-100 md:h-150 bg-violet-500/10 dark:bg-violet-500/5 blur-[80px] sm:blur-[120px] rounded-[100%] pointer-events-none opacity-50" />

      <style>{`
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marquee-left 50s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        .animate-marquee-right {
          animation: marquee-right 55s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16 md:mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center justify-center mb-4 md:mb-5">
            <span className="text-[11px] sm:text-xs md:text-sm font-mono font-semibold tracking-widest text-violet-600 dark:text-violet-400 uppercase bg-violet-500/10 dark:bg-violet-500/10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full">
              The Verdict
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-4 md:mb-6">
            Loved by builders <br className="hidden sm:block" />
            <span className="text-zinc-500 dark:text-zinc-500">worldwide.</span>
          </h3>
          <p className="text-[15px] sm:text-base md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto px-2 sm:px-4">
            Don&apos;t just take our word for it. Join hundreds of founders who
            validate their ideas before writing code.
          </p>
        </motion.div>
      </div>

      <div className="relative flex flex-col gap-4 sm:gap-6 mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] sm:mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max">
          <div className="flex gap-4 sm:gap-6 px-2 sm:px-3 animate-marquee-left transform-gpu">
            {[...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
              <TestimonialCard key={`r1-${i}`} t={t} />
            ))}
          </div>
        </div>

        <div className="flex w-max">
          <div className="flex gap-4 sm:gap-6 px-2 sm:px-3 animate-marquee-right transform-gpu">
            {[...testimonialsRow2, ...testimonialsRow2].map((t, i) => (
              <TestimonialCard key={`r2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

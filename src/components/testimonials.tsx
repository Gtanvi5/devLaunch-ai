"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Mock data
const testimonialsRow1 = [
  {
    name: "Sarah Jenkins",
    handle: "@sarah_builds",
    role: "Indie Hacker",
    content:
      "DevLaunch AI literally saved me 3 months of building the wrong product. The competitor vulnerability report was terrifyingly accurate.",
    avatar: "SJ",
    color: "from-blue-500/20 to-indigo-500/20 text-blue-500",
  },
  {
    name: "Marcus Chen",
    handle: "@marcus_startup",
    role: "SaaS Founder",
    content:
      "I used to pay consultants $2k for market research. This tool does it better, faster, and cheaper. The 3-year revenue projections helped me secure my pre-seed round.",
    avatar: "MC",
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-500",
  },
  {
    name: "Elena Rodriguez",
    handle: "@elena_dev",
    role: "Full-Stack Dev",
    content:
      "The go-to-market strategy it generated gave me exactly what I needed to launch. Hit $1k MRR in my first month. Blank page syndrome is cured.",
    avatar: "ER",
    color: "from-violet-500/20 to-fuchsia-500/20 text-violet-500",
  },
  {
    name: "David Kim",
    handle: "@dkim_designs",
    role: "Product Designer",
    content:
      "Finally, a tool that forces me to validate before I open Figma. The AI identified a massive flaw in my pricing model before I wrote a single line of code.",
    avatar: "DK",
    color: "from-amber-500/20 to-orange-500/20 text-amber-500",
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
    color: "from-rose-500/20 to-red-500/20 text-rose-500",
  },
  {
    name: "Aisha Patel",
    handle: "@aisha_codes",
    role: "Solo Founder",
    content:
      "The SWOT analysis is next level. It found 3 competitors I didn't even know existed and showed me exactly how to beat their onboarding flows.",
    avatar: "AP",
    color: "from-cyan-500/20 to-blue-500/20 text-cyan-500",
  },
  {
    name: "Tom Becker",
    handle: "@tom_b",
    role: "Maker",
    content:
      "Worth every single penny. It’s like having a Y Combinator partner sitting next to you grading your homework.",
    avatar: "TB",
    color: "from-fuchsia-500/20 to-pink-500/20 text-fuchsia-500",
  },
  {
    name: "Chloe Smith",
    handle: "@chloe_builds",
    role: "Software Engineer",
    content:
      "The dashboard is beautiful and the reports are deeply actionable. Stopped me from building another to-do app clone and pointed me to a real niche.",
    avatar: "CS",
    color: "from-indigo-500/20 to-violet-500/20 text-indigo-500",
  },
];

// Custom X (Twitter) Logo SVG
const XLogo = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-3.5 w-3.5 fill-current text-zinc-400 dark:text-zinc-500 group-hover/card:text-zinc-900 dark:group-hover/card:text-white transition-colors duration-500 cursor-pointer"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Verified Badge SVG - Shifted to a more subtle tone for a high-end look
const VerifiedBadge = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-3.5 w-3.5 text-blue-500/80 fill-current"
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
  color: string;
};

function TestimonialCard({ t }: { t: Testimonial }) {
  // Extract background and text colors from the unified color string
  const [bgGradient, textColor] = t.color.split(" text-");

  return (
    <div className="w-[400px] shrink-0 rounded-[2rem] border border-zinc-200/50 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/40 backdrop-blur-xl p-8 transition-all duration-500 hover:bg-white dark:hover:bg-zinc-900/80 hover:border-zinc-300 dark:hover:border-white/10 group/card relative overflow-hidden flex flex-col justify-between">
      {/* Editorial Quote Mark Watermark */}
      <div className="absolute -top-6 -right-4 text-[120px] font-serif text-zinc-900/[0.03] dark:text-white/[0.03] leading-none pointer-events-none select-none group-hover/card:scale-110 transition-transform duration-700">
        &rdquo;
      </div>

      <div className="relative z-10">
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-zinc-300 text-zinc-300 dark:fill-zinc-700 dark:text-zinc-700 group-hover/card:fill-amber-400 group-hover/card:text-amber-400 transition-colors duration-500"
              style={{ transitionDelay: `${i * 50}ms` }}
            />
          ))}
        </div>

        <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed mb-8">
          "{t.content}"
        </p>
      </div>

      <div className="flex items-center justify-between relative z-10 pt-6 border-t border-zinc-200/50 dark:border-white/5">
        <div className="flex items-center gap-4">
          {/* Subtle Premium Avatar */}
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${bgGradient}`}
          >
            <span
              className={`text-sm font-semibold ${textColor ? `text-${textColor}` : "text-zinc-900 dark:text-white"}`}
            >
              {t.avatar}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-medium text-zinc-900 dark:text-white text-sm">
                {t.name}
              </h4>
              <VerifiedBadge />
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 tracking-wide">
              {t.handle} • {t.role}
            </p>
          </div>
        </div>

        <div className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors">
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
      className="py-32 bg-white dark:bg-[#0A0A0A] overflow-hidden relative border-t border-zinc-100 dark:border-white/5 selection:bg-violet-500/30"
    >
      {/* High-end ambient background */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-zinc-50/50 via-transparent to-transparent dark:from-white/[0.02] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-500/5 dark:bg-violet-500/5 blur-[120px] rounded-[100%] pointer-events-none opacity-50" />

      {/* Inline Styles for CSS Marquee */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 50s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 50s linear infinite;
        }
        .pause-on-hover:hover .animate-marquee-left,
        .pause-on-hover:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-sm font-mono font-medium tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-6">
            The Verdict
          </h2>
          <h3 className="text-5xl md:text-6xl font-medium tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-8">
            Loved by builders <br className="hidden md:block" />
            <span className="text-zinc-400 dark:text-zinc-600">worldwide.</span>
          </h3>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Join hundreds of founders who
            validate their ideas before writing code.
          </p>
        </motion.div>
      </div>

      {/* The Marquee Container */}
      <div className="relative flex flex-col gap-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] pause-on-hover">
        {/* Row 1: Scrolling Left */}
        <div className="flex w-max">
          <div className="flex gap-6 px-3 animate-marquee-left">
            {[...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
              <TestimonialCard key={`r1-${i}`} t={t} />
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex w-max">
          <div className="flex gap-6 px-3 animate-marquee-right transform-gpu">
            {[...testimonialsRow2, ...testimonialsRow2].map((t, i) => (
              <TestimonialCard key={`r2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

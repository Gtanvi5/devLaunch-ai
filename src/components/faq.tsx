"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How accurate are the revenue projections?",
    answer:
      "Our engine crunches real-time market data, snoops on competitor pricing, and analyzes search volumes to build a shockingly realistic 3-year projection. We give you both conservative and optimistic models—so you can plan for the zombie apocalypse while aiming for the moon.",
  },
  {
    question: "Will my idea be kept confidential?",
    answer:
      "Absolutely. Your million-dollar ideas are locked down tighter than a dragon's treasure hoard. We never use your inputs to train our models, and everything is fully encrypted. Your IP remains 100% yours (we're SOC2 compliant, not supervillains).",
  },
  {
    question: "How is this different from just asking ChatGPT?",
    answer:
      "ChatGPT gives you polite, generic advice. DevLaunch AI is more like a squad of ruthless venture capitalists doing the heavy lifting for you. Our multi-agent system actively stalks competitor websites, pulls live SEO data, and forces your idea through battle-tested VC frameworks to hand you a truly actionable report.",
  },
  {
    question: "Can I export the reports?",
    answer:
      "Heck yes. You can beam your reports straight into gorgeous PDFs or slick Notion templates. They look so incredibly polished that your co-founders, investors, and even your mom will think you spent weeks making them.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "The first one's on the house! You get one free validation report just for signing up—no credit card and no blood oaths required. If our insights blow your mind, you can grab a Pro plan to start validating every random 2 AM shower thought you have.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 bg-zinc-50 dark:bg-[#060608] overflow-hidden selection:bg-violet-500/30 font-sans"
    >
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714558602/dot-grid_lqmbm8.svg')] bg-center [mask:linear-gradient(to_bottom,white,transparent,white)] dark:opacity-20 opacity-40 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-150 h-150 bg-violet-500/10 dark:bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-125 h-125 bg-blue-500/10 dark:bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          <div className="lg:col-span-5 w-full lg:sticky lg:top-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 dark:bg-violet-500/10 backdrop-blur-md mb-8">
                <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span className="text-xs font-bold tracking-widest text-violet-700 dark:text-violet-300 uppercase">
                  Support & Details
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
                Frequently <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400">
                  asked questions.
                </span>
              </h3>

              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 max-w-md">
                Everything you need to know about the product, billing, and how
                DevLaunch AI validates your ideas safely.
              </p>

              <Link
                href="mailto:support@devlaunchai.com"
                className="group relative inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full bg-zinc-900 dark:bg-white px-8 font-medium text-white dark:text-zinc-900 transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#060608]"
              >
                <span className="absolute inset-0 rounded-full bg-linear-to-r from-violet-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20 dark:group-hover:opacity-30" />
                <MessageCircle className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
                <span>Chat with our team</span>
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-7 w-full lg:pl-12">
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isActive = activeIndex === index;
                const answerId = `faq-answer-${index}`;
                const buttonId = `faq-button-${index}`;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-500 ${
                      isActive
                        ? "bg-white dark:bg-white/3 border-violet-500/30 dark:border-violet-400/30 shadow-[0_8px_30px_rgb(139,92,246,0.1)] dark:shadow-[0_8px_30px_rgb(139,92,246,0.05)]"
                        : "bg-white/50 dark:bg-zinc-900/40 border-zinc-200/60 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/2 hover:border-zinc-300/80 dark:hover:border-white/10"
                    }`}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-violet-500 to-blue-500 transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <button
                      id={buttonId}
                      aria-expanded={isActive}
                      aria-controls={answerId}
                      onClick={() => setActiveIndex(isActive ? null : index)}
                      className="group flex w-full items-center justify-between px-6 py-6 md:px-8 md:py-8 text-left focus-visible:outline-none focus-visible:bg-zinc-50 dark:focus-visible:bg-white/5"
                    >
                      <div className="flex items-center gap-4 md:gap-6 pr-6">
                        <span
                          className={`text-sm font-mono font-bold transition-colors duration-300 hidden md:block ${
                            isActive
                              ? "text-violet-600 dark:text-violet-400"
                              : "text-zinc-400 dark:text-zinc-600"
                          }`}
                        >
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <span
                          className={`text-base md:text-lg font-medium tracking-tight transition-colors duration-300 ${
                            isActive
                              ? "text-zinc-900 dark:text-white"
                              : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                          }`}
                        >
                          {faq.question}
                        </span>
                      </div>

                      <div
                        className={`relative shrink-0 flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500 ${
                          isActive
                            ? "bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 rotate-180"
                            : "bg-transparent border-zinc-200 dark:border-white/10 text-zinc-400 group-hover:border-zinc-300 dark:group-hover:border-white/20 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                        }`}
                      >
                        <div className="relative w-3 h-3">
                          <span
                            className={`absolute top-1/2 left-0 w-3 h-0.5 -translate-y-1/2 bg-current rounded-full transition-transform duration-300 ${
                              isActive ? "rotate-0" : "rotate-0"
                            }`}
                          />
                          <span
                            className={`absolute top-0 left-1/2 w-0.5 h-3 -translate-x-1/2 bg-current rounded-full transition-transform duration-300 ${
                              isActive
                                ? "rotate-90 scale-0"
                                : "rotate-0 scale-100"
                            }`}
                          />
                        </div>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          id={answerId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            bounce: 0,
                            duration: 0.5,
                          }}
                        >
                          <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="px-6 pb-6 md:px-8 md:pb-8 pt-0 md:pl-18"
                          >
                            <p className="text-[15px] md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed pr-4 md:pr-12">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

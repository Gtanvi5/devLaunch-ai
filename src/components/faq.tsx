// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, MessageCircle } from "lucide-react";
// import Link from "next/link";

// const faqs = [
//   {
//     question: "How accurate are the revenue projections?",
//     answer:
//       "Our engine uses real-time market data, competitor pricing models, and search volume metrics to calculate a highly realistic 3-year projection. We provide both conservative and optimistic models so you can plan for the worst while aiming for the best.",
//   },
//   {
//     question: "Will my idea be kept confidential?",
//     answer:
//       "Absolutely. We do not use your inputs to train our global models, and your validation reports are fully encrypted. We are SOC2 compliant and your intellectual property remains 100% yours.",
//   },
//   {
//     question: "How is this different from just asking ChatGPT?",
//     answer:
//       "ChatGPT gives you generic advice. DevLaunch AI uses a multi-agent system that runs your idea through specific venture capital frameworks (SWOT, TAM/SAM/SOM, Go-to-Market). It browses current competitor websites, analyzes live SEO data, and compiles it into a structured, actionable report.",
//   },
//   {
//     question: "Can I export the reports?",
//     answer:
//       "Yes! All reports can be exported as highly polished PDFs or Notion templates, making them perfect for sharing with co-founders, investors, or your development team.",
//   },
//   {
//     question: "Is there a free trial?",
//     answer:
//       "We offer one free idea validation report when you sign up. No credit card required. If you love the insights, you can upgrade to a Pro plan for unlimited validations.",
//   },
// ];

// export default function FAQ() {
//   const [activeIndex, setActiveIndex] = useState<number | null>(0);

//   return (
//     <section
//       id="faq"
//       className="relative py-24 md:py-32 bg-white dark:bg-[#0A0A0A] overflow-hidden selection:bg-violet-500/30 border-t border-zinc-100 dark:border-white/5"
//     >
//       {/* Cinematic Ambient Glow */}
//       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-500/5 dark:bg-violet-500/10 blur-[120px] rounded-[100%] pointer-events-none opacity-60" />

//       <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
//         <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
//           {/* Left Column: Heading & CTA */}
//           <div className="lg:col-span-5 mb-16 lg:mb-0">
//             <motion.div
//               initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
//               whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               className="sticky top-32"
//             >
//               {/* Etched Pill Tag */}
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200/80 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] text-xs font-mono font-medium tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mb-8">
//                 <MessageCircle className="w-3.5 h-3.5" />
//                 <span>The Details</span>
//               </div>

//               <h3 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-6">
//                 Frequently asked <br className="hidden lg:block" />
//                 <span className="text-zinc-400 dark:text-zinc-600">
//                   questions.
//                 </span>
//               </h3>

//               <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 max-w-md">
//                 Everything you need to know about the product and billing. Can’t
//                 find the answer you’re looking for?
//               </p>

//               <Link
//                 href="mailto:support@devlaunchai.com"
//                 className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-zinc-900 dark:bg-white px-8 font-medium text-white dark:text-zinc-900 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-900/10 dark:shadow-white/10"
//               >
//                 <span>Chat with our team</span>
//               </Link>
//             </motion.div>
//           </div>

//           {/* Right Column: Premium Accordions */}
//           <div className="lg:col-span-7">
//             <div className="space-y-4">
//               {faqs.map((faq, index) => {
//                 const isActive = activeIndex === index;

//                 return (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{
//                       delay: index * 0.1,
//                       duration: 0.5,
//                       ease: "easeOut",
//                     }}
//                     className={`relative overflow-hidden rounded-[2rem] border backdrop-blur-xl transition-all duration-500 ${
//                       isActive
//                         ? "bg-white dark:bg-white/[0.04] border-zinc-300/80 dark:border-white/10 shadow-xl shadow-zinc-200/40 dark:shadow-black/50"
//                         : "bg-zinc-50/50 dark:bg-zinc-900/20 border-zinc-200/50 dark:border-white/5 hover:bg-white dark:hover:bg-white/[0.02] hover:border-zinc-300/50 dark:hover:border-white/10"
//                     }`}
//                   >
//                     <button
//                       onClick={() => setActiveIndex(isActive ? null : index)}
//                       className="group flex w-full items-center justify-between px-6 py-6 md:px-8 md:py-7 text-left focus:outline-none"
//                     >
//                       <span
//                         className={`text-base md:text-lg font-medium tracking-tight pr-6 transition-colors duration-300 ${
//                           isActive
//                             ? "text-zinc-900 dark:text-white"
//                             : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200"
//                         }`}
//                       >
//                         {faq.question}
//                       </span>

//                       <motion.div
//                         animate={{ rotate: isActive ? 45 : 0 }}
//                         transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Apple-like spring curve
//                         className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-300 ${
//                           isActive
//                             ? "bg-zinc-900 dark:bg-white border-transparent text-white dark:text-zinc-900"
//                             : "bg-transparent border-zinc-200 dark:border-white/10 text-zinc-400 group-hover:border-zinc-300 dark:group-hover:border-white/20"
//                         }`}
//                       >
//                         <Plus
//                           className="h-4 w-4"
//                           strokeWidth={isActive ? 2.5 : 2}
//                         />
//                       </motion.div>
//                     </button>

//                     <AnimatePresence initial={false}>
//                       {isActive && (
//                         <motion.div
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           transition={{
//                             duration: 0.4,
//                             ease: [0.22, 1, 0.36, 1],
//                           }}
//                         >
//                           <div className="px-6 pb-7 md:px-8 md:pb-8 pt-0 text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed pr-12">
//                             {faq.answer}
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How accurate are the revenue projections?",
    answer:
      "Our engine uses real-time market data, competitor pricing models, and search volume metrics to calculate a highly realistic 3-year projection. We provide both conservative and optimistic models so you can plan for the worst while aiming for the best.",
  },
  {
    question: "Will my idea be kept confidential?",
    answer:
      "Absolutely. We do not use your inputs to train our global models, and your validation reports are fully encrypted. We are SOC2 compliant and your intellectual property remains 100% yours.",
  },
  {
    question: "How is this different from just asking ChatGPT?",
    answer:
      "ChatGPT gives you generic advice. DevLaunch AI uses a multi-agent system that runs your idea through specific venture capital frameworks (SWOT, TAM/SAM/SOM, Go-to-Market). It browses current competitor websites, analyzes live SEO data, and compiles it into a structured, actionable report.",
  },
  {
    question: "Can I export the reports?",
    answer:
      "Yes! All reports can be exported as highly polished PDFs or Notion templates, making them perfect for sharing with co-founders, investors, or your development team.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "We offer one free idea validation report when you sign up. No credit card required. If you love the insights, you can upgrade to a Pro plan for unlimited validations.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-20 md:py-32 bg-white dark:bg-[#0A0A0A] overflow-hidden selection:bg-violet-500/30 border-t border-zinc-100 dark:border-white/5 transition-colors duration-300"
    >
      {/* Cinematic Ambient Glow - Positioned safely so it doesn't cause horizontal scroll on mobile */}
      <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[600px] bg-violet-500/10 dark:bg-violet-500/10 blur-[100px] md:blur-[120px] rounded-[100%] pointer-events-none opacity-60" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:sticky lg:top-32"
            >
              {/* Etched Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 text-xs font-mono font-medium tracking-widest text-zinc-600 dark:text-zinc-400 uppercase mb-6 md:mb-8">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>The Details</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-6">
                Frequently asked <br className="hidden lg:block" />
                <span className="text-zinc-400 dark:text-zinc-500">
                  questions.
                </span>
              </h3>

              <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 md:mb-10 max-w-md">
                Everything you need to know about the product and billing. Can’t
                find the answer you’re looking for?
              </p>

              <Link
                href="mailto:support@devlaunchai.com"
                className="group relative inline-flex h-12 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full bg-zinc-900 dark:bg-white px-8 font-medium text-white dark:text-zinc-900 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-900/10 dark:shadow-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0A]"
              >
                <span>Chat with our team</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Premium Accordions */}
          <div className="lg:col-span-7 w-full">
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
                    className={`relative overflow-hidden rounded-2xl md:rounded-[2rem] border backdrop-blur-xl transition-all duration-500 ${
                      isActive
                        ? "bg-white dark:bg-white/5 border-zinc-300 dark:border-white/10 shadow-lg shadow-zinc-200/50 dark:shadow-black/50"
                        : "bg-zinc-50/50 dark:bg-zinc-900/40 border-zinc-200/50 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-zinc-300/50 dark:hover:border-white/10"
                    }`}
                  >
                    <button
                      id={buttonId}
                      aria-expanded={isActive}
                      aria-controls={answerId}
                      onClick={() => setActiveIndex(isActive ? null : index)}
                      className="group flex w-full items-center justify-between px-5 py-5 md:px-8 md:py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500 rounded-2xl md:rounded-[2rem]"
                    >
                      <span
                        className={`text-base md:text-lg font-medium tracking-tight pr-6 transition-colors duration-300 ${
                          isActive
                            ? "text-zinc-900 dark:text-white"
                            : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200"
                        }`}
                      >
                        {faq.question}
                      </span>

                      <motion.div
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-300 ${
                          isActive
                            ? "bg-zinc-900 dark:bg-white border-transparent text-white dark:text-zinc-900"
                            : "bg-transparent border-zinc-200 dark:border-white/10 text-zinc-400 group-hover:border-zinc-300 dark:group-hover:border-white/20"
                        }`}
                      >
                        <Plus
                          className="h-4 w-4"
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                      </motion.div>
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
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <div className="px-5 pb-6 md:px-8 md:pb-8 pt-0 text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed pr-8 md:pr-12">
                            {faq.answer}
                          </div>
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

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  ArrowRight,
  Activity,
  Sparkles,
  CornerDownLeft,
} from "lucide-react";

// The consistent technical grid background
const AppWindowGrid = () => (
  <svg
    className="absolute inset-0 h-full w-full stroke-black/[0.02] dark:stroke-white/[0.02] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)] pointer-events-none"
    fill="none"
  >
    <defs>
      <pattern
        id="app-grid"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <path d="M 20 0 L 0 0 0 20" fill="none" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#app-grid)" />
  </svg>
);

const MOCK_ROASTS = [
  "This sounds like a 'vitamin' not a 'painkiller'. People say they want this, but they won't open their wallets for it. You need to tie this directly to revenue generation or cost-cutting to survive.",
  "You're entering a highly fragmented market with massive switching costs. Unless your UX is literally 10x better, incumbents will eat you alive. Your distribution strategy better be bulletproof.",
  "Classic solution looking for a problem. You're assuming behavior change in a user base that is notoriously stubborn. If you can't explain why they must switch in under 5 seconds, this is dead on arrival.",
  "Another AI wrapper? The barrier to entry here is zero. The moment OpenAI or Anthropic updates their UI, your entire value proposition evaporates. You need a proprietary data moat, fast.",
];

export default function RoastMyIdea() {
  const [idea, setIdea] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roast, setRoast] = useState<string | null>(null);

  const handleRoast = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!idea.trim() || idea.length < 10) return;

    setIsLoading(true);
    setRoast(null);

    // Simulate specialized agent analysis delay
    setTimeout(() => {
      const randomRoast =
        MOCK_ROASTS[Math.floor(Math.random() * MOCK_ROASTS.length)];
      setRoast(randomRoast);
      setIsLoading(false);
    }, 2500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleRoast();
    }
  };

  return (
    <section className="relative py-32 bg-white dark:bg-[#0A0A0A] overflow-hidden selection:bg-amber-500/30 border-t border-zinc-100 dark:border-white/5">
      {/* Ambient Background Glow (Shifted to an elegant amber/crimson) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 dark:bg-amber-500/10 blur-[120px] rounded-[100%] pointer-events-none" />
      <AppWindowGrid />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-medium tracking-wide uppercase mb-6 border border-amber-500/20">
              <Activity className="w-3.5 h-3.5" />
              <span>Reality Check Engine</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-6">
              Think your idea is flawless?
              <br className="hidden md:block" />
              <span className="text-zinc-400 dark:text-zinc-500">
                {" "}
                Let our AI find the cracks.
              </span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Pitch your startup idea in one sentence. Our specialized critique
              agent will analyze your business model and identify the biggest
              critical flaw in seconds.
            </p>
          </motion.div>
        </div>

        {/* The Interactive Application Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative max-w-3xl mx-auto rounded-[2rem] border border-zinc-200/80 dark:border-white/10 bg-white/50 dark:bg-zinc-900/40 shadow-2xl shadow-zinc-200/50 dark:shadow-black/50 p-2 backdrop-blur-2xl"
        >
          {/* Input Area */}
          <div
            className={`relative rounded-[1.5rem] transition-colors duration-500 overflow-hidden bg-white dark:bg-[#0A0A0A] border ${
              isFocused || idea.length > 0
                ? "border-amber-500/30 shadow-[0_0_30px_-5px_rgba(245,158,11,0.1)]"
                : "border-zinc-200/50 dark:border-white/5"
            }`}
          >
            {/* Cinematic Scanning Line during load */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ top: 0, opacity: 0 }}
                  animate={{ top: ["0%", "100%", "0%"], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 2.5,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  className="absolute left-0 right-0 h-[2px] bg-amber-500/50 shadow-[0_0_20px_2px_rgba(245,158,11,0.4)] z-20 pointer-events-none"
                />
              )}
            </AnimatePresence>

            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="e.g., A Tinder-style swiping app but for finding technical co-founders..."
              className="w-full bg-transparent text-xl md:text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 resize-none outline-none p-6 md:p-8 min-h-[180px] disabled:opacity-50 transition-opacity"
              maxLength={250}
            />

            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 pb-6 pt-2">
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 dark:text-zinc-500">
                <span>{idea.length} / 250</span>
                <span className="hidden sm:flex items-center gap-1">
                  Press{" "}
                  <kbd className="px-1.5 py-0.5 rounded border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 font-sans">
                    Return
                  </kbd>{" "}
                  to submit
                </span>
              </div>

              <button
                onClick={() => handleRoast()}
                disabled={idea.length < 10 || isLoading}
                className="group relative flex items-center gap-2 h-10 px-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 overflow-hidden"
              >
                {isLoading ? (
                  <>
                    <Activity className="w-4 h-4 animate-pulse text-amber-500" />
                    <span>Analyzing</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <CornerDownLeft className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-amber-500 dark:group-hover:text-amber-500 transition-colors" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Seamless Result Reveal */}
          <AnimatePresence>
            {roast && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.98 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.98 }}
                transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              >
                <div className="mt-2 p-6 md:p-8 rounded-[1.5rem] bg-amber-50/50 dark:bg-amber-500/5 border border-amber-200/50 dark:border-amber-500/10 relative overflow-hidden group">
                  {/* Subtle result background glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none group-hover:opacity-100 transition-opacity opacity-50" />

                  <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                      <Flame className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="text-amber-600 dark:text-amber-500 font-mono text-xs font-semibold tracking-widest uppercase">
                          Critical Flaw Detected
                        </h4>
                      </div>
                      <p className="text-xl md:text-2xl text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed tracking-tight mb-8">
                        "{roast}"
                      </p>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-amber-200/50 dark:border-amber-500/10">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Want the complete 10-page validation blueprint?
                        </p>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-amber-700 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-500/10 hover:bg-amber-200/50 dark:hover:bg-amber-500/20 transition-colors group/btn">
                          <Sparkles className="w-4 h-4" />
                          Generate Report
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

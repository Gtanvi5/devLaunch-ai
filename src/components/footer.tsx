"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Rocket, Sparkles, Mail, Loader2, Check } from "lucide-react";
import { motion } from "framer-motion";

// Reusable cinematic grid pattern with a radial spotlight fade
const FooterGrid = () => (
  <svg
    className="absolute inset-0 h-full w-full stroke-zinc-900/5 dark:stroke-white/5 mask-[radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
    fill="none"
  >
    <defs>
      <pattern
        id="footer-grid"
        width="32"
        height="32"
        patternUnits="userSpaceOnUse"
      >
        <path d="M 32 0 L 0 0 0 32" fill="none" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#footer-grid)" />
  </svg>
);

export default function Footer() {
  const { isSignedIn } = useAuth();
  const currentYear = new Date().getFullYear();

  // Newsletter State
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setStatus("success");
      setEmail(""); // Clear the input

      // Reset back to idle after a few seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer className="bg-white dark:bg-[#0A0A0A] pt-20 lg:pt-32 relative overflow-hidden selection:bg-violet-500/30">
      {/* Background ambient gradient to separate from previous section */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =========================================
            PART 1: THE FINAL CTA "BILLBOARD" 
            ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl md:rounded-[3rem] border border-zinc-200/50 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/20 overflow-hidden mb-20 md:mb-32 shadow-2xl shadow-black/5 dark:shadow-none backdrop-blur-xl"
        >
          <FooterGrid />

          {/* Core cinematic lighting inside the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[300px] md:h-[500px] bg-violet-500/15 dark:bg-violet-500/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

          <div className="relative px-6 py-16 md:py-32 text-center flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-8">
              <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span className="text-xs md:text-sm font-mono font-medium tracking-widest text-violet-600 dark:text-violet-400 uppercase">
                Launch your idea today
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-6 md:mb-8 max-w-3xl leading-[1.1]">
              Ready to validate your <br className="hidden sm:block" />
              <span className="text-zinc-400 dark:text-zinc-600">
                next big idea?
              </span>
            </h2>

            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
              Join hundreds of founders who are saving time, skipping the manual
              research, and building products people actually want to buy.
            </p>

            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="group relative inline-flex h-12 md:h-14 items-center justify-center overflow-hidden rounded-full bg-zinc-900 dark:bg-white px-6 md:px-8 font-medium text-white dark:text-zinc-900 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-900/10 dark:shadow-white/5"
              >
                <span>Go to Dashboard</span>
                <Rocket className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="group relative inline-flex h-12 md:h-14 items-center justify-center overflow-hidden rounded-full bg-zinc-900 dark:bg-white px-6 md:px-8 font-medium text-white dark:text-zinc-900 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-900/10 dark:shadow-white/5">
                  <span>Get Started for Free</span>
                  <Rocket className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </SignInButton>
            )}
          </div>
        </motion.div>

        {/* =========================================
            PART 2: THE FOOTER LINKS & NEWSLETTER
            ========================================= */}
        <div className="pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-3">
              <Link
                href="/"
                className="flex items-center gap-2 font-medium tracking-tight text-xl text-zinc-900 dark:text-white mb-6 group w-fit"
              >
                <div className="relative flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ease-out">
                  <div className="absolute inset-0 bg-violet-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Theme-aware logos (assumes you have a light-logo and dark-logo in your public folder) */}
                  <Image
                    src="/dark-logo.png"
                    alt="DevLaunch AI Logo"
                    width={28}
                    height={28}
                    className="hidden dark:block object-contain relative z-10"
                  />
                  <Image
                    src="/logo.png"
                    alt="DevLaunch AI Logo"
                    width={28}
                    height={28}
                    className="block dark:hidden object-contain relative z-10"
                  />
                </div>
                <span>DevLaunch</span>
              </Link>
              <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-xs mb-8 leading-relaxed">
                The multi-agent validation engine for modern indie hackers and
                startup founders. Turn shower thoughts into shipped products.
              </p>
              <div className="flex space-x-5">
                <a
                  href="https://x.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"
                >
                  <span className="sr-only">Twitter / X</span>
                  <FaXTwitter className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"
                >
                  <span className="sr-only">GitHub</span>
                  <FaGithub className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"
                >
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div className="col-span-1 lg:col-span-2">
              <h3 className="text-xs font-mono font-medium tracking-widest uppercase text-zinc-900 dark:text-white mb-6">
                Product
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/#features"
                    className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="col-span-1 lg:col-span-2">
              <h3 className="text-xs font-mono font-medium tracking-widest uppercase text-zinc-900 dark:text-white mb-6">
                Resources
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/blog"
                    className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/changelog"
                    className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
                  >
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/affiliate"
                    className="group flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
                  >
                    Affiliates
                    <span className="px-2 py-0.5 rounded-md bg-violet-100 dark:bg-violet-500/10 text-[9px] font-mono font-semibold tracking-wider text-violet-600 dark:text-violet-400 uppercase border border-violet-200/50 dark:border-violet-500/20 transition-colors group-hover:border-violet-300 dark:group-hover:border-violet-500/40">
                      Earn
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="col-span-1 lg:col-span-2">
              <h3 className="text-xs font-mono font-medium tracking-widest uppercase text-zinc-900 dark:text-white mb-6">
                Legal
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund"
                    className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
                  >
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="sm:col-span-2 lg:col-span-3">
              <h3 className="text-xs font-mono font-medium tracking-widest uppercase text-zinc-900 dark:text-white mb-6">
                Stay Updated
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
                Subscribe to our newsletter for the latest startup insights,
                product updates, and validation tips.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="relative mt-2 max-w-md sm:max-w-none"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={status === "loading" || status === "success"}
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-full py-3.5 pl-5 pr-14 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`absolute right-1.5 top-1.5 bottom-1.5 aspect-square flex items-center justify-center rounded-full transition-all duration-300 ${
                    status === "success"
                      ? "bg-green-500 text-white"
                      : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-105 active:scale-95 disabled:hover:scale-100"
                  } disabled:opacity-80`}
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : status === "success" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                  <span className="sr-only">Subscribe</span>
                </button>
              </form>

              {/* Optional Error Message */}
              {status === "error" && (
                <p className="text-xs text-red-500 mt-3 ml-4 font-medium">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="mt-20 pt-8 border-t border-zinc-200/80 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-400 dark:text-zinc-500">
            <p>© {currentYear} DevLaunch AI. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Engineered with{" "}
              <span className="text-zinc-600 dark:text-zinc-300">Next.js</span>{" "}
              & <span className="text-zinc-600 dark:text-zinc-300">OpenAI</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

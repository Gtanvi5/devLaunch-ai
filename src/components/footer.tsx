"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Reusable cinematic grid pattern with a radial spotlight fade
const FooterGrid = () => (
  <svg
    className="absolute inset-0 h-full w-full stroke-zinc-900/5 dark:stroke-white/[0.03] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
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

  return (
    <footer className="bg-white dark:bg-[#0A0A0A] pt-32 relative overflow-hidden selection:bg-violet-500/30">
      {/* Background ambient gradient to separate from previous section */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* =========================================
            PART 1: THE FINAL CTA "BILLBOARD" 
            ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[3rem] border border-zinc-200/50 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/20 overflow-hidden mb-32 shadow-2xl shadow-black/5 dark:shadow-none backdrop-blur-xl"
        >
          <FooterGrid />

          {/* Core cinematic lighting inside the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-500/10 dark:bg-violet-500/20 blur-[120px] rounded-[100%] pointer-events-none" />

          <div className="relative px-6 py-24 md:py-32 text-center flex flex-col items-center">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-mono font-medium tracking-widest text-violet-600 dark:text-violet-400 uppercase">
                Launch your idea today
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-8 max-w-3xl leading-[1.1]">
              Ready to validate your <br className="hidden md:block" />
              <span className="text-zinc-400 dark:text-zinc-600">
                next big idea?
              </span>
            </h2>

            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Join hundreds of founders who are saving time, skipping the manual
              research, and building products people actually want to buy.
            </p>

            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-zinc-900 dark:bg-white px-8 font-medium text-white dark:text-zinc-900 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-900/10 dark:shadow-white/5"
              >
                <span>Go to Dashboard</span>
                <Rocket className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-zinc-900 dark:bg-white px-8 font-medium text-white dark:text-zinc-900 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-900/10 dark:shadow-white/5">
                  <span>Get Started for Free</span>
                  <Rocket className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </SignInButton>
            )}
          </div>
        </motion.div>

        {/* =========================================
            PART 2: THE FOOTER LINKS 
            ========================================= */}
        <div className="pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="sm:col-span-2 md:col-span-12 lg:col-span-4">
              <Link
                href="/"
                className="flex items-center gap-2 font-medium tracking-tight text-xl text-zinc-900 dark:text-white mb-6 group w-fit"
              >
                <div className="relative flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ease-out">
                  <div className="absolute inset-0 bg-violet-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image
                    src="/dark-logo.png"
                    alt="DevLaunch AI Logo"
                    width={28}
                    height={28}
                    className="object-contain relative z-10"
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

            {/* Empty column for spacing on desktop */}
            <div className="hidden lg:block lg:col-span-2" />

            {/* Product Links */}
            <div className="md:col-span-4 lg:col-span-2">
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

            {/* Resources Links (NEW) */}
            <div className="md:col-span-4 lg:col-span-2">
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
            <div className="md:col-span-4 lg:col-span-2">
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
                <li>
                  <Link
                    href="/contact"
                    className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
                  >
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="mt-20 pt-8 border-t border-zinc-200/80 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-400 dark:text-zinc-500">
            <p>© {currentYear} DevLaunch AI. All rights reserved.</p>
            <p className="flex items-center gap-1">
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

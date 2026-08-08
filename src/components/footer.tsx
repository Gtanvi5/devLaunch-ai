"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Rocket, Mail, Loader2, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const { isSignedIn } = useAuth();
  const currentYear = new Date().getFullYear();

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
      setEmail("");

      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/#${targetId}`);
      }
    }
  };

  return (
    <footer className="bg-zinc-50 dark:bg-[#060608] pt-20 lg:pt-32 relative overflow-hidden selection:bg-violet-500/30 font-sans">
      <div className="absolute top-0 inset-x-0 h-px w-full bg-linear-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group relative rounded-3xl md:rounded-[3rem] bg-white dark:bg-[#0A0A0C] border border-zinc-200 dark:border-white/5 overflow-hidden mb-20 md:mb-32 shadow-2xl hover:shadow-violet-500/10 dark:hover:shadow-violet-500/5 transition-all duration-700 hover:-translate-y-1"
        >
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
              repeatDelay: 1,
            }}
            className="absolute top-0 left-0 h-0.5 w-1/2 bg-linear-to-r from-transparent via-violet-500 to-transparent z-20"
          />

          <div className="absolute inset-0 bg-linear-to-br from-violet-500/3 via-transparent to-blue-500/3 dark:from-violet-500/5 dark:to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714558602/dot-grid_lqmbm8.svg')] bg-center mask-[radial-gradient(ellipse_at_center,black_40%,transparent_80%)] dark:opacity-20 opacity-[0.15] pointer-events-none mix-blend-multiply dark:mix-blend-lighten" />

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute -top-32 -right-32 w-120 h-120 bg-blue-500/10 dark:bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -bottom-40 -left-40 w-120 h-120 bg-violet-500/10 dark:bg-violet-600/20 blur-[120px] rounded-full pointer-events-none"
          />

          <div className="relative px-6 py-24 md:py-32 text-center flex flex-col items-center z-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-50 dark:bg-violet-500/10 mb-8 shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-transform duration-500 group-hover:-translate-y-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              <span className="text-xs font-semibold tracking-wide text-violet-700 dark:text-violet-300 uppercase">
                Launch your idea today
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 md:mb-8 max-w-3xl leading-[1.1]">
              Ready to validate your <br className="hidden sm:block" />
              <span className="text-violet-600 dark:text-violet-400">
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
                className="group/btn relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-zinc-900 dark:bg-white px-10 font-medium text-white dark:text-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.12)] transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(139,92,246,0.3)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                <span className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-150%)] group-hover/btn:duration-1000 group-hover/btn:transform-[skew(-12deg)_translateX(150%)]">
                  <span className="relative h-full w-8 bg-white/20 dark:bg-black/10" />
                </span>

                <span className="relative z-10">Go to Dashboard</span>
                <Rocket className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="group/btn relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-zinc-900 dark:bg-white px-10 font-medium text-white dark:text-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.12)] transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(139,92,246,0.3)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
                  <span className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-150%)] group-hover/btn:duration-1000 group-hover/btn:transform-[skew(-12deg)_translateX(150%)]">
                    <span className="relative h-full w-8 bg-white/20 dark:bg-black/10" />
                  </span>

                  <span className="relative z-10">Get Started for Free</span>
                  <Rocket className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
              </SignInButton>
            )}
          </div>
        </motion.div>

        <div className="pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-3">
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

            <div className="col-span-1 lg:col-span-2">
              <h3 className="text-xs font-mono font-medium tracking-widest uppercase text-zinc-900 dark:text-white mb-6">
                Product
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/#features"
                    onClick={(e) => handleScroll(e, "features")}
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
                    onClick={(e) => handleScroll(e, "faq")}
                    className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

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
                className="relative mt-2 max-w-md sm:max-w-none group"
              >
                <div className="absolute -inset-0.5 rounded-full bg-linear-to-r from-violet-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={status === "loading" || status === "success"}
                  className="relative w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-full py-3.5 pl-5 pr-14 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all disabled:opacity-50 shadow-sm"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`absolute right-1.5 top-1.5 bottom-1.5 aspect-square flex items-center justify-center rounded-full transition-all duration-300 ${
                    status === "success"
                      ? "bg-green-500 text-white"
                      : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-105 active:scale-95 disabled:hover:scale-100"
                  } disabled:opacity-80 z-10`}
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

              {status === "error" && (
                <p className="text-xs text-red-500 mt-3 ml-4 font-medium">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </div>

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

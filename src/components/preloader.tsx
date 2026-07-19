"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // GSAP Timeline for sequential animations
    const tl = gsap.timeline({
      onComplete: () => setIsComplete(true),
    });

    // 1. Subtle, premium fade and scale in for the logo
    tl.fromTo(
      ".preloader-logo",
      { scale: 0.9, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    )
      // 2. Smooth reveal of the text masking
      .fromTo(
        ".preloader-text",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.5",
      )
      // 3. Fill the sleek, ultra-thin loading bar
      .fromTo(
        ".preloader-bar-inner",
        { width: "0%" },
        { width: "100%", duration: 1.2, ease: "expo.inOut" },
        "-=0.2",
      )
      // 4. Parallax effect: Content drops slightly before...
      .to(".preloader-content", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
      })
      // 5. Screen slides up to reveal the app
      .to(
        ".preloader-overlay",
        {
          yPercent: -100,
          duration: 0.8,
          ease: "expo.inOut",
        },
        "-=0.4",
      );
  }, []);

  if (isComplete) return null;

  return (
    <div className="preloader-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      {/* Subtle ambient glow matching the Hero section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="preloader-content relative flex flex-col items-center gap-6 z-10">
        {/* Logo block */}
        <div className="preloader-logo drop-shadow-sm">
          <Image
            src="/dark-logo.png"
            alt="DevLaunch AI Logo"
            width={64} // Slightly smaller for a more refined look
            height={64}
            className="object-contain"
            priority
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          {/* Main Title - Matches Hero font tracking */}
          <div className="overflow-hidden">
            <h1 className="preloader-text text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white flex gap-1.5">
              DevLaunch
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                AI
              </span>
            </h1>
          </div>

          {/* Subtitle - Using monospace to match the terminal theme in Hero */}
          <div className="overflow-hidden">
            <p className="preloader-text text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Initializing Engine...
            </p>
          </div>
        </div>

        {/* Ultra-thin premium loading bar */}
        <div className="mt-2 h-[2px] w-32 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800/80">
          <div className="preloader-bar-inner h-full w-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
        </div>
      </div>
    </div>
  );
}

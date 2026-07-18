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

    // 1. Pop in the custom logo
    tl.fromTo(
      ".preloader-logo",
      // Changed rotation from -45 to -15 so the "D" shape doesn't spin too wildly
      { scale: 0, opacity: 0, rotate: -15 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" },
    )
      // 2. Slide up the text
      .fromTo(
        ".preloader-text",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.4",
      )
      // 3. Fill the loading bar
      .fromTo(
        ".preloader-bar-inner",
        { width: "0%" },
        { width: "100%", duration: 1, ease: "power2.inOut" },
      )
      // 4. Slide the whole screen up and out
      .to(".preloader-overlay", {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2,
      });
  }, []);

  if (isComplete) return null;

  return (
    // Added support for light/dark mode background just in case
    <div className="preloader-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-6">
        {/* Replaced the BrainCircuit icon block with your new Logo */}
        <div className="preloader-logo drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]">
          <Image
            src="/dark-logo.png"
            alt="DevLaunch AI Logo"
            width={80}
            height={80}
            className="object-contain"
            priority // Ensures the logo loads immediately since it's a preloader
          />
        </div>

        <div className="overflow-hidden">
          <h1 className="preloader-text text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            DevLaunch {/* Updated the AI text to match your new gradient */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">
              AI
            </span>
          </h1>
        </div>

        <div className="overflow-hidden">
          <p className="preloader-text text-sm text-zinc-500 dark:text-zinc-400">
            Initializing validation engine...
          </p>
        </div>

        {/* Updated the progress bar track and inner gradient to match the new brand */}
        <div className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div className="preloader-bar-inner h-full w-0 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // GSAP Timeline for cinematic split-screen sequence
    const tl = gsap.timeline({
      onComplete: () => setIsComplete(true),
    });

    // 1. The glowing data line strikes across the center
    tl.to(".preloader-line", {
      width: "100%",
      duration: 1.2,
      ease: "expo.inOut",
    })
      // 2. The logo and text unfold from the laser line
      .fromTo(
        ".preloader-content",
        { opacity: 0, scale: 0.8, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6", // Start while the line is still expanding
      )
      // 3. Cinematic pause, then the laser line fades out
      .to(".preloader-line", { opacity: 0, duration: 0.4 }, "+=0.3")
      // 4. The logo zooms directly into the camera
      .to(
        ".preloader-content",
        {
          scale: 1.5,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.6,
          ease: "power3.in",
        },
        "-=0.2",
      )
      // 5. The screen completely splits open vertically (doors opening)
      .to(
        ".panel-top",
        { yPercent: -100, duration: 0.8, ease: "expo.inOut" },
        "-=0.3",
      )
      .to(
        ".panel-bottom",
        { yPercent: 100, duration: 0.8, ease: "expo.inOut" },
        "<", // Runs at the exact same time as panel-top
      );
  }, []);

  if (isComplete) return null;

  return (
    // Fixed wrapper. Pointer events are handled on the panels so we don't block the screen if unmount fails.
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none">
      {/* Top Half of the screen */}
      <div className="panel-top absolute top-0 left-0 w-full h-1/2 bg-zinc-50 dark:bg-[#0A0A0A] pointer-events-auto shadow-[0_1px_0_0_rgba(255,255,255,0.05)]" />

      {/* Bottom Half of the screen */}
      <div className="panel-bottom absolute bottom-0 left-0 w-full h-1/2 bg-zinc-50 dark:bg-[#0A0A0A] pointer-events-auto" />

      {/* The striking center laser line */}
      <div className="preloader-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent z-10 shadow-[0_0_20px_rgba(99,102,241,0.8)]" />

      {/* Center Content that unfolds */}
      <div className="preloader-content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-4 drop-shadow-2xl">
        <div className="relative">
          {/* Subtle back-glow for the logo */}
          <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
          <Image
            src="/dark-logo.png"
            alt="DevLaunch AI Logo"
            width={48}
            height={48}
            className="object-contain relative z-10"
            priority
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white flex gap-1.5">
          DevLaunch
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            AI
          </span>
        </h1>
      </div>
    </div>
  );
}

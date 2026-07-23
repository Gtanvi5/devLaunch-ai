"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("devlaunch-preloader") === "true";
  });
  const [shouldShow, setShouldShow] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("devlaunch-preloader") !== "true";
  });
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isComplete) return;

    // 2. Lock page scroll while preloading
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // 3. Mark as shown, restore scroll, and hide
          sessionStorage.setItem("devlaunch-preloader", "true");
          document.body.style.overflow = "";
          setIsComplete(true);
        },
      });

      tl.to(".preloader-line", {
        width: "100%",
        duration: 1.2,
        ease: "expo.inOut",
      })
        .fromTo(
          ".preloader-content",
          { opacity: 0, scale: 0.8, filter: "blur(10px)", rotation: -2 },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            rotation: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .to(".preloader-line", { opacity: 0, duration: 0.4 }, "+=0.4")
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
        .to(
          ".panel-top",
          { yPercent: -100, duration: 0.8, ease: "expo.inOut" },
          "-=0.3",
        )
        .to(
          ".panel-bottom",
          { yPercent: 100, duration: 0.8, ease: "expo.inOut" },
          "<",
        );
    }, container);

    return () => {
      ctx.revert();
      document.body.style.overflow = ""; // Safety cleanup on unmount
    };
  }, []);

  // Return nothing if already complete or shouldn't show
  if (isComplete || !shouldShow) return null;

  return (
    <div
      ref={container}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Top Half */}
      <div className="panel-top absolute top-0 left-0 w-full h-1/2 bg-zinc-50 dark:bg-[#0A0A0A] pointer-events-auto border-b border-zinc-200 dark:border-white/5" />

      {/* Bottom Half */}
      <div className="panel-bottom absolute bottom-0 left-0 w-full h-1/2 bg-zinc-50 dark:bg-[#0A0A0A] pointer-events-auto border-t border-zinc-200 dark:border-white/5" />

      {/* Laser Line */}
      <div className="preloader-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent z-10 shadow-[0_0_12px_rgba(99,102,241,0.4)] dark:shadow-[0_0_20px_rgba(99,102,241,0.8)]" />

      {/* Center Content */}
      <div className="preloader-content absolute w-full px-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center gap-3 sm:gap-4 md:gap-5 drop-shadow-xl dark:drop-shadow-2xl">
        {/* Responsive Logo Container */}
        <div className="relative flex items-center justify-center shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
          <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/20 blur-xl rounded-full" />
          <Image
            src="/logo.png"
            alt="DevLaunch AI Logo"
            fill
            className="object-contain relative z-10 block dark:hidden"
            priority
          />
          <Image
            src="/dark-logo.png"
            alt="DevLaunch AI Logo"
            fill
            className="object-contain relative z-10 hidden dark:block"
            priority
          />
        </div>

        {/* Responsive Typography */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white flex gap-1.5 sm:gap-2">
          DevLaunch
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            AI
          </span>
        </h1>
      </div>
    </div>
  );
}

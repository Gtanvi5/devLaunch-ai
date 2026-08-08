"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SESSION_KEY = "devlaunch-preloader";

export default function Preloader() {
  const [showPreloader, setShowPreloader] = useState(true);
  const container = useRef<HTMLDivElement>(null);

  const isDevMode = process.env.NODE_ENV === "development";

  useIsomorphicLayoutEffect(() => {
    const hasRun = isDevMode
      ? false
      : sessionStorage.getItem(SESSION_KEY) === "true";
    if (hasRun && container.current) {
      container.current.style.display = "none";
    }
  }, [isDevMode]);

  useEffect(() => {
    const hasRun = isDevMode
      ? false
      : sessionStorage.getItem(SESSION_KEY) === "true";

    if (hasRun) {
      setShowPreloader(false);
      return;
    }

    if (!showPreloader || !container.current) return;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(SESSION_KEY, "true");
          document.body.style.overflow = "";
          setShowPreloader(false);
        },
      });

      tl.to(".preloader-line", {
        width: "100%",
        duration: 1.2,
        ease: "power4.inOut",
      })
        .to(
          ".panel-top",
          { yPercent: -15, duration: 1, ease: "power3.inOut" },
          "-=0.2",
        )
        .to(
          ".panel-bottom",
          { yPercent: 15, duration: 1, ease: "power3.inOut" },
          "<",
        )
        .to(".preloader-line", { opacity: 0, duration: 0.3 }, "<0.2")

        .fromTo(
          ".preloader-content",
          { scale: 0.85, opacity: 0, filter: "blur(12px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "back.out(1.2)",
          },
          "-=0.8",
        )

        .to(".preloader-content", { scale: 1.05, duration: 0.8, ease: "none" })

        .to(".panel-top", { yPercent: -100, duration: 1, ease: "expo.inOut" })
        .to(
          ".panel-bottom",
          { yPercent: 100, duration: 1, ease: "expo.inOut" },
          "<",
        )

        .to(
          ".preloader-content",
          {
            scale: 1.4,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.8,
            ease: "power3.in",
          },
          "<0.1",
        );
    }, container.current);

    const failsafe = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "true");
      document.body.style.overflow = "";
      setShowPreloader(false);
    }, 5500);

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [showPreloader, isDevMode]);

  if (!showPreloader) return null;

  return (
    <div
      ref={container}
      aria-hidden="true"
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center pointer-events-none bg-zinc-950"
    >
      <div className="preloader-content absolute inset-0 z-10 flex flex-col items-center justify-center gap-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/20 dark:bg-indigo-500/30 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative flex items-center justify-center gap-4">
          <div className="preloader-logo relative flex items-center justify-center shrink-0 w-10 h-10 md:w-12 md:h-12">
            <Image
              src="/logo.png"
              alt="DevLaunch AI Logo"
              fill
              className="object-contain block dark:hidden drop-shadow-xl"
              priority
            />
            <Image
              src="/dark-logo.png"
              alt="DevLaunch AI Logo"
              fill
              className="object-contain hidden dark:block drop-shadow-xl"
              priority
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white flex gap-2">
            <span>DevLaunch</span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-500">
              AI
            </span>
          </h1>
        </div>
      </div>

      <div className="panel-top absolute top-0 left-0 w-full h-1/2 bg-zinc-50 dark:bg-[#060608] z-20 pointer-events-auto border-b border-zinc-200/50 dark:border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />

      <div className="preloader-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-0.5 w-0 bg-linear-to-r from-transparent via-indigo-500 to-transparent z-30 shadow-[0_0_15px_rgba(99,102,241,0.6)]" />

      <div className="panel-bottom absolute bottom-0 left-0 w-full h-1/2 bg-zinc-50 dark:bg-[#060608] z-20 pointer-events-auto border-t border-zinc-200/50 dark:border-white/5 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.5)]" />
    </div>
  );
}

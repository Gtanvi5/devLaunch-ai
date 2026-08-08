"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function DashboardTransition() {
  const container = useRef<HTMLDivElement>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!container.current) return;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setIsFinished(true);
        },
      });

      tl.to(".grid-block", {
        scale: 0,
        opacity: 0,
        borderRadius: "50%",
        duration: 0.8,
        stagger: {
          amount: 1,
          grid: [10, 10],
          from: "center",
        },
        ease: "power3.inOut",
      })

        .to(
          ".glass-backdrop",
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.8",
        );
    }, container.current);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      ref={container}
      className="fixed inset-0 z-9999 w-full h-full pointer-events-none"
    >
      <div className="glass-backdrop absolute inset-0 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl will-change-transform" />

      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 w-full h-full overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            /*
              Note: scale-[1.02] slightly overlaps the blocks.
              This hides any tiny browser rendering gaps, making it
              look like one solid, flawless wall of color until it animates!
            */
            className="grid-block w-full h-full bg-zinc-50 dark:bg-[#09090b] scale-[1.02] will-change-transform"
          />
        ))}
      </div>
    </div>
  );
}

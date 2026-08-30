"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Logo from "@/components/ui/Logo";

export default function CinematicIntro() {
  const [showIntro, setShowIntro] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let ctx: gsap.Context | null = null;

    if (prefersReducedMotion) {
      // Significantly simplified: brief hold, then a short restrained fade.
      // Still plays every time — never skipped.
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => setShowIntro(false),
        });

        tl.to(containerRef.current, { opacity: 0, duration: 0.3, ease: "power1.out" }, 0.15);
      });

      return () => {
        if (ctx) ctx.revert();
      };
    }

    // The logo is stable on the white panel from frame one. After a brief hold,
    // the logo and the panel move as a single unit: a soft fade paired with
    // the whole layer sliding up and off, like a curtain lifting away.
    // Total runtime ~1s: 0.35s hold, ~0.65s combined fade + slide.
    ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setShowIntro(false),
      });

      tl.to(
        titleRef.current,
        { opacity: 0.7, duration: 0.35, ease: "power1.inOut" },
        0.35
      ).to(
        containerRef.current,
        { yPercent: -100, duration: 0.65, ease: "power2.inOut" },
        0.35
      );
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  if (!showIntro) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-paper flex items-center justify-center select-none overflow-hidden"
      style={{ willChange: "transform, opacity" }}
    >
      <div ref={titleRef}>
        <Logo force="black" className="h-10 sm:h-14 md:h-16" />
      </div>
    </div>
  );
}

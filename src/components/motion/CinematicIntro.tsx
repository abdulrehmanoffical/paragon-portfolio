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
      // Significantly simplified: the arrival's scale is dropped (motion
      // sickness trigger), but the logo still fades in before the panel
      // fades out — still plays every time, never skipped.
      ctx = gsap.context(() => {
        gsap.set(titleRef.current, { opacity: 0 });
        const tl = gsap.timeline({
          onComplete: () => setShowIntro(false),
        });

        tl.to(titleRef.current, { opacity: 1, duration: 0.25, ease: "power1.out" })
          .to(containerRef.current, { opacity: 0, duration: 0.3, ease: "power1.out" }, "+=0.2");
      });

      return () => {
        if (ctx) ctx.revert();
      };
    }

    // Three beats, ~1.1s total: the logo arrives (scale + fade in, soft
    // decelerate) rather than being static from frame one, holds briefly
    // at full presence, then the logo settles back slightly while the
    // whole panel slides up and off as one unit, like a curtain lifting
    // away with the mark still readable as it goes.
    ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0, scale: 0.92, y: 6 });

      const tl = gsap.timeline({
        onComplete: () => setShowIntro(false),
      });

      tl.to(titleRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      })
        // "+=0.15" leaves a genuine 0.15s hold at full presence before the
        // next tween starts — an explicit position offset rather than a
        // same-property no-op tween, which would just get overwritten by
        // whatever runs on titleRef.current next (an earlier version of
        // this used a real 0.15s no-op tween followed by "<", which anchors
        // to the *start* of that no-op — not its end — so the exit-fade
        // below started 0.15s too early and silently overrode the hold).
        .to(titleRef.current, { opacity: 0.75, scale: 0.97, duration: 0.5, ease: "power1.inOut" }, "+=0.15")
        .to(containerRef.current, { yPercent: -100, duration: 0.55, ease: "power2.inOut" }, "<");
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

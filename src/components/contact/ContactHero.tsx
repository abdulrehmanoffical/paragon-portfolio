"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ContactHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      gsap.fromTo(
        [headingRef.current, introRef.current],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="w-full pt-28 sm:pt-36 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <h1
          ref={headingRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-strong uppercase mb-4"
        >
          LET&apos;S TALK
        </h1>
        <p ref={introRef} className="text-base sm:text-lg md:text-xl text-secondary font-normal max-w-2xl text-pretty">
          Tell us what you&apos;re working on and what you need.
        </p>
      </div>
    </section>
  );
}

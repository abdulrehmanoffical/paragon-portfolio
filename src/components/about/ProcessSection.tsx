"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  { phase: "DISCOVER", description: "Understand the goal." },
  { phase: "DEFINE", description: "Set the direction." },
  { phase: "CREATE", description: "Build and refine the work." },
  { phase: "DELIVER", description: "Prepare the final result." },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      itemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-strong tracking-tight mb-10 md:mb-14">
          PROCESS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, idx) => (
            <div
              key={step.phase}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="pt-5 border-t border-border"
            >
              <h3 className="text-base md:text-lg font-medium text-strong tracking-tight mb-1.5">
                {step.phase}
              </h3>
              <p className="text-sm text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

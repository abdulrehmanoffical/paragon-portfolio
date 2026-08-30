"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCategoryGrid from "./ProjectCategoryGrid";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeFeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        clearProps: "all",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24" id="featured-work">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 md:mb-14">
          <div className="w-12 h-px bg-border mb-6" aria-hidden="true" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-strong tracking-tight">
            FEATURED WORK
          </h2>
        </div>

        <ProjectCategoryGrid enableFeaturedPreview />
      </div>
    </section>
  );
}

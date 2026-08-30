"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTA() {
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
    <section
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-surface border-t border-border"
    >
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-strong tracking-tight uppercase">
            HAVE A PROJECT IN MIND?
          </h2>
          <p className="text-base sm:text-lg text-secondary max-w-md mx-auto">
            Let&apos;s talk about what you need and how we can help.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-strong text-background hover:bg-text py-4 px-9 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

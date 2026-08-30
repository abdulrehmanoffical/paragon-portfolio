"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const capabilities = [
  {
    title: "VIDEO EDITING",
    skills: ["Editing", "Color Grading", "Sound Design"],
    route: "/projects/video-editing",
  },
  {
    title: "GHL",
    skills: ["Funnels", "Automation", "CRM"],
    route: "/projects/ghl",
  },
  {
    title: "GRAPHIC DESIGN",
    skills: ["Branding", "Print", "Digital"],
    route: "/projects/graphic-design",
  },
  {
    title: "WORDPRESS",
    skills: ["Custom Themes", "E-commerce", "Performance"],
    route: "/projects/wordpress",
  },
];

export default function CapabilitiesList() {
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
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
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
          EXPERTISE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, idx) => (
            <div
              key={cap.title}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="p-6 md:p-8 rounded-xl border border-border bg-surface hover:bg-background transition-colors duration-300 flex items-start justify-between gap-4"
            >
              <div>
                <h3 className="text-lg md:text-xl font-medium text-strong mb-3">{cap.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cap.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] uppercase tracking-wide px-2.5 py-1 rounded bg-strong/5 text-text/70 border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={cap.route}
                aria-label={`View ${cap.title} projects`}
                className="shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center bg-background text-text hover:bg-strong hover:text-background hover:border-strong transition-all duration-300"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

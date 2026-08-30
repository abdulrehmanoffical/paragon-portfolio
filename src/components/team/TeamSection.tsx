"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamPortrait from "./TeamPortrait";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
}

// Only name + role for now — skills are added once real information is supplied.
export const TEAM_MEMBERS: TeamMemberData[] = [
  {
    id: "member-01",
    name: "MEMBER NAME",
    role: "Video & Motion",
  },
  {
    id: "member-02",
    name: "MEMBER NAME",
    role: "Systems & Automation",
  },
  {
    id: "member-03",
    name: "MEMBER NAME",
    role: "Design & Web",
  },
];

export default function TeamSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-strong tracking-tight mb-10 md:mb-14">
          TEAM
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={member.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="flex flex-col gap-5"
            >
              <div className="h-56 sm:h-64 w-full">
                <TeamPortrait memberIndex={idx} />
              </div>

              <div>
                <h3 className="text-lg font-medium text-strong">{member.name}</h3>
                <p className="text-sm text-secondary mt-0.5">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

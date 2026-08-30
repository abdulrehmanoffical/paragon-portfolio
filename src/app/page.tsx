"use client";

import { useEffect, useRef } from "react";
import CinematicIntro from "@/components/motion/CinematicIntro";
// import TeamVideo from "@/components/ui/CinematicHeroVideo"; — restore alongside SECTION 1 below
import HomeFeaturedWork from "@/components/portfolio/HomeFeaturedWork";
import HeroSceneGate from "@/components/three/HeroSceneGate";
import FinalCTA from "@/components/ui/FinalCTA";
import Footer from "@/components/layout/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  // TEAM VIDEO is temporarily unmounted below (see SECTION 1) — its ref and
  // reveal animation are commented out together so both can be restored in
  // one step alongside the section.
  // const videoSectionRef = useRef<HTMLDivElement>(null);
  const introSectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // if (videoSectionRef.current) {
      //   gsap.from(videoSectionRef.current, {
      //     opacity: 0,
      //     y: 20,
      //     duration: 1,
      //     ease: "power2.out",
      //     delay: 0.1,
      //     clearProps: "all",
      //   });
      // }

      // Above-the-fold now that the video is hidden — fires immediately on
      // mount (no scroll trigger) with a small stagger between the headline
      // and its supporting line, rather than animating both as one block.
      gsap.fromTo(
        [headlineRef.current, paragraphRef.current],
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.1 }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="w-full bg-background text-text flex flex-col min-h-screen">
      {/*
        ==================================================
        CINEMATIC INTRO (plays on every load)
        ==================================================
      */}
      <CinematicIntro />

      {/*
        ==================================================
        SECTION 1: TEAM VIDEO — temporarily hidden. Component
        (CinematicHeroVideo.tsx) kept intact; only this Home
        rendering is commented out, restore as one unit.
        ==================================================
      */}
      {/*
      <section
        ref={videoSectionRef}
        className="w-full pt-24 sm:pt-28 pb-6 md:pb-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <TeamVideo src="/media/team-video.mp4" />
        </div>
      </section>
      */}

      {/*
        ==================================================
        SECTION 2: SHORT INTRODUCTION (now the page's opening
        section — carries the top padding the video section
        used to own, plus a fuller vertical rhythm so it reads
        as an intentional opener, not a leftover mid-page block)
        ==================================================
      */}
      <section
        ref={introSectionRef}
        className="w-full pt-32 sm:pt-40 md:pt-44 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-border overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div className="text-left">
            {/* Compositional accent — a plain rule, not copy, giving the
                headline a deliberate anchor rather than starting cold */}
            <div className="w-12 h-px bg-border mb-6" aria-hidden="true" />
            <h1
              ref={headlineRef}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-strong leading-[1.15] mb-5 text-balance uppercase"
            >
              THREE MINDS.
              <br />
              ONE CREATIVE STANDARD.
            </h1>
            <p
              ref={paragraphRef}
              className="text-base sm:text-lg md:text-xl text-secondary font-normal leading-relaxed max-w-xl text-pretty"
            >
              We work across video, design, and digital to create work that is clear, purposeful, and built to perform.
            </p>
          </div>

          {/* Signature 3D moment — a single abstract, faceted glass form,
              not a device mockup. Desktop/tablet only (see HeroSceneGate);
              purely decorative, so it never competes with the text column
              for attention or tab order. */}
          <div className="hidden lg:block">
            <HeroSceneGate />
          </div>
        </div>
      </section>

      {/*
        ==================================================
        SECTION 3: FEATURED WORK (2x2 Grid, 4 Categories)
        ==================================================
      */}
      <HomeFeaturedWork />

      {/*
        ==================================================
        SECTION 4: FINAL CTA
        ==================================================
      */}
      <FinalCTA />

      {/*
        ==================================================
        SECTION 5: GLOBAL FOOTER
        ==================================================
      */}
      <Footer />
    </div>
  );
}

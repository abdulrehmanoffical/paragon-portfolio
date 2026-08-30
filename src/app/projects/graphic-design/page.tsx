"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES_INFO, getProjectsByService } from "@/lib/portfolioData";
import GraphicDesignCard from "@/components/portfolio/GraphicDesignCard";
import GraphicDesignLightbox from "@/components/portfolio/GraphicDesignLightbox";
import EmptyServiceState from "@/components/portfolio/EmptyServiceState";
import ServiceTestimonials from "@/components/testimonials/ServiceTestimonials";
import Footer from "@/components/layout/Footer";
import { EASE } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GraphicDesignPage() {
  const service = SERVICES_INFO["graphic-design"];
  const projects = getProjectsByService("graphic-design");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || projects.length === 0) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const cards = gridRef.current.querySelectorAll("[data-gallery-card]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: EASE.standard,
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [projects.length]);

  return (
    <div className="w-full bg-background text-text flex flex-col min-h-screen">
      <header className="w-full pt-28 sm:pt-36 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-strong uppercase mb-4">
            {service.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-secondary font-normal max-w-2xl text-pretty">
            {service.intro}
          </p>
        </div>
      </header>

      <main className="w-full flex-1 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div
          ref={gridRef}
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <GraphicDesignCard
                key={project.id}
                project={project}
                onSelect={() => setActiveIndex(index)}
              />
            ))
          ) : (
            <EmptyServiceState message="New graphic design work is on its way." />
          )}
        </div>
      </main>

      <GraphicDesignLightbox
        projects={projects}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />

      <ServiceTestimonials service="graphic-design" />

      <Footer />
    </div>
  );
}

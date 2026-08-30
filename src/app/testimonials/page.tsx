"use client";

import { useState } from "react";
import { SERVICES_INFO, ServiceType } from "@/lib/portfolioData";
import { TESTIMONIALS } from "@/lib/testimonialsData";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/motion/Reveal";

const FILTERS: { label: string; value: ServiceType | "all" }[] = [
  { label: "All", value: "all" },
  { label: SERVICES_INFO["video-editing"].title, value: "video-editing" },
  { label: SERVICES_INFO["ghl"].title, value: "ghl" },
  { label: SERVICES_INFO["graphic-design"].title, value: "graphic-design" },
  { label: SERVICES_INFO["wordpress"].title, value: "wordpress" },
];

export default function TestimonialsPage() {
  const [filter, setFilter] = useState<ServiceType | "all">("all");

  const testimonials =
    filter === "all" ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.service === filter);

  return (
    <div className="w-full bg-background text-text flex flex-col min-h-screen">
      <header className="w-full pt-28 sm:pt-36 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-strong uppercase mb-4">
            TESTIMONIALS
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-secondary font-normal max-w-2xl text-pretty mb-6">
            A few words from the people we&apos;ve worked with.
          </p>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-colors duration-200 border ${
                  filter === f.value
                    ? "bg-strong text-background border-strong"
                    : "bg-transparent text-text border-border hover:border-strong/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="w-full flex-1 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 md:p-8 rounded-xl border border-border bg-surface flex flex-col justify-between transition-all duration-300 hover:border-strong/30 hover:shadow-md hover:shadow-black/5"
              >
                <p className="font-display text-lg md:text-xl text-strong leading-snug mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <span className="text-sm font-medium text-strong">{t.name}</span>
                  {t.role && <span className="text-sm text-secondary"> &mdash; {t.role}</span>}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}

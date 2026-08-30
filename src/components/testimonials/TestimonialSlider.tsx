"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { Testimonial } from "@/lib/testimonialsData";
import { EASE, DURATION } from "@/lib/motion";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  intervalMs?: number;
}

export default function TestimonialSlider({
  testimonials,
  intervalMs = 6000,
}: TestimonialSliderProps) {
  const [index, setIndex] = useState(0);
  // The index actually rendered — swapped mid-crossfade so the outgoing
  // quote finishes fading before the incoming one appears.
  const [displayed, setDisplayed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const isFirstRender = useRef(true);

  const total = testimonials.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + total) % total);
    },
    [total]
  );

  // Real crossfade: fade the (still-mounted) quote out, swap its text, fade
  // it back in — replaces the old key-remount approach, which never had old
  // and new DOM overlapping and so never actually transitioned.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !quoteRef.current) {
      setDisplayed(index);
      return;
    }
    const tl = gsap.timeline();
    tl.to(quoteRef.current, { opacity: 0, duration: DURATION.fast, ease: EASE.standard })
      .call(() => setDisplayed(index))
      .to(quoteRef.current, { opacity: 1, duration: DURATION.fast, ease: EASE.standard });

    return () => {
      tl.kill();
    };
  }, [index]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total, intervalMs]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goTo(index - 1);
    else if (e.key === "ArrowRight") goTo(index + 1);
  };

  if (total === 0) return null;

  const current = testimonials[displayed];

  return (
    <div
      role="region"
      aria-label="Client testimonials"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="w-full max-w-2xl mx-auto text-center focus:outline-none"
    >
      <div className="relative min-h-[9rem] sm:min-h-[8rem] flex items-center justify-center">
        <p
          ref={quoteRef}
          className="font-display text-xl sm:text-2xl md:text-3xl text-strong leading-snug"
        >
          &ldquo;{current.quote}&rdquo;
        </p>
      </div>

      <div className="mt-6">
        <span className="text-sm font-medium text-strong">{current.name}</span>
        {current.role && <span className="text-sm text-secondary"> &mdash; {current.role}</span>}
      </div>

      {total > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text hover:bg-strong hover:text-background hover:border-strong transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "bg-strong w-4" : "bg-border"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text hover:bg-strong hover:text-background hover:border-strong transition-colors duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

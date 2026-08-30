"use client";

import React, { useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { X, Play, ArrowUpRight } from "lucide-react";
import { VideoProject } from "@/lib/videoEditingData";
import { EASE, DURATION } from "@/lib/motion";

interface VideoLightboxProps {
  project: VideoProject | null;
  onClose: () => void;
  /** Only set when opened from a context that isn't already the full
   * category page (e.g. Home's Featured Work) — renders a "See all …" link
   * to that page. Omitted everywhere else so normal in-page use of this
   * lightbox (the actual Video Editing page) doesn't gain a redundant button
   * linking to itself. */
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function VideoLightbox({ project, onClose, viewAllHref, viewAllLabel }: VideoLightboxProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  // Plays the exit tween, then hands off to the real onClose (which unmounts
  // this component via the parent clearing `project`).
  const handleClose = useCallback(() => {
    if (closingRef.current) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !backdropRef.current || !panelRef.current) {
      onClose();
      return;
    }

    closingRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        closingRef.current = false;
        onClose();
      },
    });
    tl.to(panelRef.current, { opacity: 0, scale: 0.97, duration: DURATION.fast, ease: EASE.standard }, 0);
    tl.to(backdropRef.current, { opacity: 0, duration: DURATION.fast, ease: EASE.standard }, 0);
  }, [onClose]);

  useEffect(() => {
    if (!project) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion && backdropRef.current && panelRef.current) {
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(panelRef.current, { opacity: 0, scale: 0.97 });
      gsap.to(backdropRef.current, { opacity: 1, duration: DURATION.fast, ease: EASE.standard });
      gsap.to(panelRef.current, { opacity: 1, scale: 1, duration: DURATION.base, ease: EASE.standard });
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
    // Intentionally scoped to `project` only — re-running this on every
    // handleClose identity change would replay the entrance mid-exit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  if (!project) return null;

  const isVertical = project.aspectRatio === "9/16";

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-ink/90 backdrop-blur-md"
      onClick={handleClose}
    >
      {/* Lightbox Modal Box */}
      <div
        ref={panelRef}
        className={`relative w-full ${
          isVertical ? "max-w-md sm:max-w-lg" : "max-w-5xl"
        } bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar — glass chrome */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50 bg-surface/70 backdrop-blur-md">
          <div>
            <h3
              id="video-lightbox-title"
              className="text-base sm:text-lg font-medium text-strong tracking-tight"
            >
              {project.title}
            </h3>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-text hover:bg-strong hover:text-background hover:border-strong transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Display Area */}
        <div className="relative w-full bg-ink flex items-center justify-center overflow-hidden">
          {project.videoSrc ? (
            <video
              src={project.videoSrc}
              poster={project.poster}
              controls
              autoPlay
              playsInline
              className={`w-full ${
                isVertical
                  ? "aspect-[9/16] max-h-[75vh] object-contain"
                  : "aspect-[16/9] max-h-[70vh] object-contain"
              } bg-ink`}
            >
              {/* Fallback frame if video asset is unavailable */}
              <div className="p-8 text-center text-paper">
                <p className="font-sans text-sm">{project.title}</p>
              </div>
            </video>
          ) : (
            <div
              className={`w-full ${
                isVertical ? "aspect-[9/16]" : "aspect-[16/9]"
              } flex flex-col items-center justify-center bg-gradient-to-br from-ink to-ink-surface p-8`}
            >
              <div className="w-16 h-16 rounded-full bg-paper/10 border border-paper/25 flex items-center justify-center shadow-lg mb-3">
                <Play className="w-6 h-6 text-paper fill-paper/30 translate-x-0.5" />
              </div>
              <span className="text-xs text-paper/70 tracking-widest uppercase">
                {project.title}
              </span>
            </div>
          )}
        </div>

        {viewAllHref && (
          <div className="flex items-center justify-end px-5 py-3.5 border-t border-border/50 bg-surface/70 backdrop-blur-md">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-strong hover:text-secondary transition-colors group"
            >
              <span>{viewAllLabel ?? "See all"}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { X, ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/lib/portfolioData";
import ProjectThumbnail from "./ProjectThumbnail";
import { EASE, DURATION } from "@/lib/motion";

interface GraphicDesignLightboxProps {
  projects: Project[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export default function GraphicDesignLightbox({
  projects,
  activeIndex,
  onClose,
  onNavigate,
}: GraphicDesignLightboxProps) {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragState = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const pinchState = useRef<{ distance: number; scale: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const wasOpenRef = useRef(false);

  const isOpen = activeIndex !== null;
  const project = isOpen ? projects[activeIndex] : null;

  // Plays the exit tween, then hands off to the real onClose.
  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !dialogRef.current || !stageRef.current) {
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
    tl.to(stageRef.current, { opacity: 0, scale: 0.97, duration: DURATION.fast, ease: EASE.standard }, 0);
    tl.to(dialogRef.current, { opacity: 0, duration: DURATION.fast, ease: EASE.standard }, 0);
  }, [onClose]);

  const resetView = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Which image within the active project's own gallery is showing — for
  // grouped multi-image projects (e.g. a client with several related posts).
  // The existing prev/next arrows keep navigating between projects; this is
  // a separate, secondary control scoped to the current project only.
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Reset zoom/pan/gallery position whenever the active item changes,
  // without a cascading effect render.
  const [lastIndex, setLastIndex] = useState(activeIndex);
  if (lastIndex !== activeIndex) {
    setLastIndex(activeIndex);
    if (scale !== 1) setScale(1);
    if (pan.x !== 0 || pan.y !== 0) setPan({ x: 0, y: 0 });
    if (galleryIndex !== 0) setGalleryIndex(0);
  }

  const goTo = useCallback(
    (next: number) => {
      const clamped = (next + projects.length) % projects.length;
      onNavigate(clamped);
    },
    [onNavigate, projects.length]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || activeIndex === null) return;
      if (e.key === "Escape") handleClose();
      else if (e.key === "ArrowRight") goTo(activeIndex + 1);
      else if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      else if (e.key === "+" || e.key === "=") setScale((s) => Math.min(MAX_SCALE, s + 0.4));
      else if (e.key === "-") setScale((s) => Math.max(MIN_SCALE, s - 0.4));
      else if (e.key === "0") resetView();
    },
    [isOpen, activeIndex, handleClose, goTo, resetView]
  );

  useEffect(() => {
    if (!isOpen) {
      wasOpenRef.current = false;
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    // Only play the open entrance the first time this lightbox appears —
    // not on every subsequent prev/next navigation while it stays open.
    if (!wasOpenRef.current) {
      wasOpenRef.current = true;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReducedMotion && dialogRef.current && stageRef.current) {
        gsap.set(dialogRef.current, { opacity: 0 });
        gsap.set(stageRef.current, { opacity: 0, scale: 0.97 });
        gsap.to(dialogRef.current, { opacity: 1, duration: DURATION.fast, ease: EASE.standard });
        gsap.to(stageRef.current, { opacity: 1, scale: 1, duration: DURATION.base, ease: EASE.standard });
      }
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const clampPan = useCallback((x: number, y: number, currentScale: number) => {
    if (currentScale <= 1) return { x: 0, y: 0 };
    const bound = (currentScale - 1) * 220;
    return {
      x: Math.max(-bound, Math.min(bound, x)),
      y: Math.max(-bound, Math.min(bound, y)),
    };
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => {
      const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, s - e.deltaY * 0.0025));
      if (next <= 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    dragState.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.x;
    const dy = e.clientY - dragState.current.y;
    setPan(clampPan(dragState.current.panX + dx, dragState.current.panY + dy, scale));
  };

  const endDrag = () => {
    dragState.current = null;
  };

  const touchDistance = (touches: React.TouchList) => {
    const [a, b] = [touches[0], touches[1]];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchState.current = { distance: touchDistance(e.touches), scale };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchState.current) {
      e.preventDefault();
      const newDistance = touchDistance(e.touches);
      const ratio = newDistance / pinchState.current.distance;
      const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, pinchState.current.scale * ratio));
      setScale(next);
      if (next <= 1) setPan({ x: 0, y: 0 });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) pinchState.current = null;
  };

  if (!isOpen || !project || activeIndex === null) return null;

  const images = project.gallery ?? [];
  const activeImage = images[galleryIndex];

  const goToImage = (index: number) => {
    setGalleryIndex((index + images.length) % images.length);
    resetView();
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="graphic-lightbox-title"
      className="fixed inset-0 z-50 flex flex-col bg-ink/90 backdrop-blur-md"
      onClick={handleClose}
    >
      {/* Header Bar */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-4 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="graphic-lightbox-title" className="text-sm sm:text-base font-medium text-paper">
          {project.title}
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(MIN_SCALE, s - 0.4))}
            aria-label="Zoom out"
            className="w-9 h-9 rounded-full border border-paper/20 bg-paper/5 backdrop-blur-sm flex items-center justify-center text-paper hover:bg-paper/15 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(MAX_SCALE, s + 0.4))}
            aria-label="Zoom in"
            className="w-9 h-9 rounded-full border border-paper/20 bg-paper/5 backdrop-blur-sm flex items-center justify-center text-paper hover:bg-paper/15 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={resetView}
            aria-label="Fit to view"
            className="w-9 h-9 rounded-full border border-paper/20 bg-paper/5 backdrop-blur-sm flex items-center justify-center text-paper hover:bg-paper/15 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full border border-paper/20 bg-paper/5 backdrop-blur-sm flex items-center justify-center text-paper hover:bg-paper/15 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stage */}
      <div
        className="relative flex-1 flex items-center justify-center overflow-hidden px-4 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        {projects.length > 1 && (
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous design"
            className="hidden sm:flex absolute left-4 z-10 w-11 h-11 rounded-full border border-paper/20 bg-paper/5 backdrop-blur-sm items-center justify-center text-paper hover:bg-paper/15 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div
          ref={stageRef}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full max-w-md aspect-[4/5] rounded-xl overflow-hidden border border-paper/15 shadow-2xl touch-none ${
            scale > 1 ? "cursor-grab active:cursor-grabbing" : ""
          }`}
        >
          <div
            className="relative w-full h-full transition-transform duration-150 ease-out"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            }}
          >
            {activeImage ? (
              <Image
                src={activeImage}
                alt=""
                fill
                sizes="(min-width: 640px) 448px, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <ProjectThumbnail service="graphic-design" />
            )}
          </div>
        </div>

        {projects.length > 1 && (
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next design"
            className="hidden sm:flex absolute right-4 z-10 w-11 h-11 rounded-full border border-paper/20 bg-paper/5 backdrop-blur-sm items-center justify-center text-paper hover:bg-paper/15 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Gallery sub-nav — which image within this project, only shown for
          grouped multi-image projects; independent of the project-to-project
          prev/next arrows above */}
      {images.length > 1 && (
        <div
          className="shrink-0 flex items-center justify-center gap-2 pb-1"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToImage(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === galleryIndex}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === galleryIndex ? "bg-paper w-4" : "bg-paper/30 w-1.5"
              }`}
            />
          ))}
        </div>
      )}

      {/* Footer: description + mobile nav */}
      <div
        className="shrink-0 px-4 sm:px-6 py-4 flex items-center justify-between gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm text-paper/70 max-w-md">{project.description}</p>
        {projects.length > 1 && (
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous design"
              className="w-9 h-9 rounded-full border border-paper/20 bg-paper/5 flex items-center justify-center text-paper"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next design"
              className="w-9 h-9 rounded-full border border-paper/20 bg-paper/5 flex items-center justify-center text-paper"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

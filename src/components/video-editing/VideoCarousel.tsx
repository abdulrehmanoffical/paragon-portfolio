"use client";

import React, { useState, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VideoProject } from "@/lib/videoEditingData";
import VideoThumbnail from "./VideoThumbnail";
import gsap from "gsap";
import { EASE, DURATION } from "@/lib/motion";

interface VideoCarouselProps {
  categoryTitle: string;
  items: VideoProject[];
  aspectRatio?: "16/9" | "9/16";
  onSelectVideo: (video: VideoProject) => void;
}

export default function VideoCarousel({
  categoryTitle,
  items,
  aspectRatio = "16/9",
  onSelectVideo,
}: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  // The item wrapping in to fill the vacated side slot mid-rotation — kept
  // as a transient overlay so it gets a real slide-in entrance instead of
  // popping into place once the main tween completes.
  const [incoming, setIncoming] = useState<{ direction: "next" | "prev"; item: VideoProject } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const incomingCardRef = useRef<HTMLDivElement>(null);

  const total = items.length;
  const hasMultiple = total > 1;
  const isVertical = aspectRatio === "9/16";

  // Helper indices for infinite rotating wrap-around
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const prevItem = items[prevIndex];
  const currentItem = items[currentIndex];
  const nextItem = items[nextIndex];

  // Rotate carousel smoothly with GSAP
  const handleRotate = useCallback(
    (direction: "next" | "prev") => {
      if (isAnimating || total <= 1) return;
      setIsAnimating(true);

      const targetIndex =
        direction === "next"
          ? (currentIndex + 1) % total
          : (currentIndex - 1 + total) % total;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        setCurrentIndex(targetIndex);
        setIsAnimating(false);
        return;
      }

      // The item two steps out from center is what will fill the vacated
      // side slot once this rotation lands — flush it into the DOM now so
      // its ref exists before the timeline below is built.
      const incomingIndex =
        direction === "next"
          ? (currentIndex + 2) % total
          : (currentIndex - 2 + total) % total;
      flushSync(() => {
        setIncoming({ direction, item: items[incomingIndex] });
      });

      // Context-safe animation
      const ctx = gsap.context(() => {
        if (incomingCardRef.current) {
          gsap.set(incomingCardRef.current, {
            xPercent: direction === "next" ? 55 : -55,
            scale: 0.75,
            opacity: 0,
          });
        }

        const tl = gsap.timeline({
          defaults: { duration: DURATION.carousel, ease: EASE.premium },
          onComplete: () => {
            setCurrentIndex(targetIndex);
            setIncoming(null);
            // Reset transforms cleanly after index state updates
            gsap.set([leftCardRef.current, centerCardRef.current, rightCardRef.current], {
              clearProps: "transform,opacity",
            });
            setIsAnimating(false);
          },
        });

        if (direction === "next") {
          // Center moves left and scales down
          tl.to(
            centerCardRef.current,
            {
              xPercent: -35,
              scale: 0.84,
              opacity: 0.7,
            },
            0
          );
          // Right moves into center and scales up
          tl.to(
            rightCardRef.current,
            {
              xPercent: -35,
              scale: 1.16,
              opacity: 1,
            },
            0
          );
          // Left exits further left and fades out
          tl.to(
            leftCardRef.current,
            {
              xPercent: -20,
              opacity: 0.3,
            },
            0
          );
          // New item slides in from off-stage right to fill the vacated slot
          if (incomingCardRef.current) {
            tl.to(incomingCardRef.current, { xPercent: 0, scale: 0.85, opacity: 0.65 }, 0);
          }
        } else {
          // Center moves right and scales down
          tl.to(
            centerCardRef.current,
            {
              xPercent: 35,
              scale: 0.84,
              opacity: 0.7,
            },
            0
          );
          // Left moves into center and scales up
          tl.to(
            leftCardRef.current,
            {
              xPercent: 35,
              scale: 1.16,
              opacity: 1,
            },
            0
          );
          // Right exits further right and fades out
          tl.to(
            rightCardRef.current,
            {
              xPercent: 20,
              opacity: 0.3,
            },
            0
          );
          // New item slides in from off-stage left to fill the vacated slot
          if (incomingCardRef.current) {
            tl.to(incomingCardRef.current, { xPercent: 0, scale: 0.85, opacity: 0.65 }, 0);
          }
        }
      }, containerRef);

      return () => ctx.revert();
    },
    [currentIndex, total, isAnimating, items]
  );

  // Swipe handling for mobile
  const minSwipeDistance = 45;

  const onTouchStartHandler = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMoveHandler = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleRotate("next");
    } else if (isRightSwipe) {
      handleRotate("prev");
    }
  };

  // Keyboard navigation when focusing carousel
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handleRotate("prev");
    } else if (e.key === "ArrowRight") {
      handleRotate("next");
    }
  };

  return (
    <section className="w-full py-8 md:py-12 border-b border-border last:border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-strong tracking-tight">
            {categoryTitle}
          </h2>
        </div>

        {/* Carousel Stage: arrows flank the [SMALL][LARGE][SMALL] row —
            with only one real item, rotating would show identical content
            in every slot, so the arrows and side previews are hidden and
            just the single large card is shown. */}
        <div className="flex items-center gap-1 sm:gap-3 md:gap-5">
          {hasMultiple && (
            <button
              type="button"
              onClick={() => handleRotate("prev")}
              disabled={isAnimating}
              aria-label={`Previous in ${categoryTitle}`}
              className="shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-border bg-surface/70 backdrop-blur-md hover:bg-strong hover:text-background hover:border-strong text-text flex items-center justify-center transition-all duration-200 active:scale-90 disabled:opacity-50 z-30"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={onTouchStartHandler}
            onTouchMove={onTouchMoveHandler}
            onTouchEnd={onTouchEndHandler}
            className="relative flex-1 min-w-0 overflow-hidden py-2 focus:outline-none select-none"
          >
            {/* w-fit + mx-auto so this row shrink-wraps to the visible card
                cluster instead of spanning the full track width — the
                incoming-item overlay below anchors to this row's true edge,
                which only matches the visible cards' edge when it isn't
                stretched wider than its content. */}
            <div className="relative flex items-center justify-center gap-3 sm:gap-6 md:gap-8 w-fit mx-auto">
              {/* LEFT ITEM (Small side preview) */}
              {hasMultiple && (
                <div
                  ref={leftCardRef}
                  onClick={() => handleRotate("prev")}
                  className={`hidden sm:block shrink-0 cursor-pointer transition-opacity duration-300 opacity-55 hover:opacity-80 ${
                    isVertical
                      ? "w-[19%] max-w-[155px] aspect-[9/16]"
                      : "w-[21%] max-w-[220px] aspect-[16/9]"
                  } rounded-xl overflow-hidden border border-border shadow-sm transform scale-[0.85]`}
                  title={prevItem.title}
                >
                  <VideoThumbnail project={prevItem} isCenter={false} />
                </div>
              )}

              {/* CENTER ITEM (Large active focus) */}
              <div
                ref={centerCardRef}
                onClick={() => onSelectVideo(currentItem)}
                className={`shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-[1.01] ${
                  isVertical
                    ? "w-[75%] sm:w-[48%] md:w-[38%] max-w-[340px] aspect-[9/16]"
                    : "w-[92%] sm:w-[62%] md:w-[60%] max-w-[700px] aspect-[16/9]"
                } rounded-2xl overflow-hidden border-2 border-strong/20 shadow-lg relative z-20`}
                title={currentItem.title}
              >
                <VideoThumbnail project={currentItem} isCenter={true} />

                {/* Minimal hover overlay showing video title */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-4 flex items-center justify-between text-paper pointer-events-none">
                  <span className="font-medium text-sm sm:text-base tracking-tight">
                    {currentItem.title}
                  </span>
                  <span className="text-[11px] text-paper/70 uppercase">
                    Click to play
                  </span>
                </div>
              </div>

              {/* RIGHT ITEM (Small side preview) */}
              {hasMultiple && (
                <div
                  ref={rightCardRef}
                  onClick={() => handleRotate("next")}
                  className={`hidden sm:block shrink-0 cursor-pointer transition-opacity duration-300 opacity-55 hover:opacity-80 ${
                    isVertical
                      ? "w-[19%] max-w-[155px] aspect-[9/16]"
                      : "w-[21%] max-w-[220px] aspect-[16/9]"
                  } rounded-xl overflow-hidden border border-border shadow-sm transform scale-[0.85]`}
                  title={nextItem.title}
                >
                  <VideoThumbnail project={nextItem} isCenter={false} />
                </div>
              )}

              {/* INCOMING ITEM (transient — slides in from off-stage to fill
                  the slot vacated by this rotation; unmounted on complete) */}
              {incoming && (
                <div
                  ref={incomingCardRef}
                  aria-hidden="true"
                  className={`hidden sm:block absolute top-1/2 -translate-y-1/2 pointer-events-none ${
                    incoming.direction === "next" ? "right-0" : "left-0"
                  } shrink-0 ${
                    isVertical
                      ? "w-[19%] max-w-[155px] aspect-[9/16]"
                      : "w-[21%] max-w-[220px] aspect-[16/9]"
                  } rounded-xl overflow-hidden border border-border shadow-sm`}
                >
                  <VideoThumbnail project={incoming.item} isCenter={false} />
                </div>
              )}
            </div>
          </div>

          {hasMultiple && (
            <button
              type="button"
              onClick={() => handleRotate("next")}
              disabled={isAnimating}
              aria-label={`Next in ${categoryTitle}`}
              className="shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-border bg-surface/70 backdrop-blur-md hover:bg-strong hover:text-background hover:border-strong text-text flex items-center justify-center transition-all duration-200 active:scale-90 disabled:opacity-50 z-30"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

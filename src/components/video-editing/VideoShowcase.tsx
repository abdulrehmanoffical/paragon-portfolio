"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoProject } from "@/lib/videoEditingData";
import VideoThumbnail from "./VideoThumbnail";
import { EASE } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface VideoShowcaseProps {
  categoryTitle: string;
  items: VideoProject[];
  aspectRatio?: "16/9" | "9/16";
  onSelectVideo: (video: VideoProject) => void;
}

export default function VideoShowcase({
  categoryTitle,
  items,
  aspectRatio = "16/9",
  onSelectVideo,
}: VideoShowcaseProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isVertical = aspectRatio === "9/16";
  const isSingle = items.length === 1;

  useEffect(() => {
    if (!gridRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const tiles = gridRef.current.querySelectorAll("[data-showcase-tile]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        tiles,
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
  }, [items]);

  // Horizontal (16:9) categories get fewer, wider columns; vertical (9:16)
  // categories get more, narrower columns — a grid that reads correctly for
  // its content's own proportions rather than one fixed layout for both.
  const gridColsClass = isSingle
    ? ""
    : isVertical
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <section className="w-full py-8 md:py-12 border-b border-border last:border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-strong tracking-tight">
            {categoryTitle}
          </h2>
        </div>

        <div
          ref={gridRef}
          className={isSingle ? "flex justify-center" : `grid ${gridColsClass} gap-5 md:gap-6`}
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              data-showcase-tile
              onClick={() => onSelectVideo(item)}
              title={item.title}
              className={`group text-left rounded-2xl overflow-hidden glass-subtle hover:glass-standard focus-visible:glass-standard transition-[background-color,backdrop-filter,box-shadow,border-color,transform] duration-300 p-2 sm:p-3 outline-none focus-visible:ring-2 focus-visible:ring-strong/30 ${
                isSingle ? "w-full max-w-2xl" : "w-full"
              }`}
            >
              <div
                className={`relative w-full rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.01] ${
                  isVertical ? "aspect-[9/16]" : "aspect-video"
                }`}
              >
                <VideoThumbnail project={item} isCenter={isSingle} />
              </div>

              <div className="flex items-center justify-between px-1.5 pt-3 pb-1">
                <span
                  className={`font-medium text-text group-hover:text-strong transition-colors ${
                    isVertical ? "text-xs sm:text-sm" : "text-sm sm:text-base"
                  }`}
                >
                  {item.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

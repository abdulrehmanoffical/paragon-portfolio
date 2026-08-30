"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

interface TeamVideoProps {
  src?: string;
  poster?: string;
}

export default function TeamVideo({
  src = "/media/team-video.mp4",
  poster,
}: TeamVideoProps) {
  const [videoAvailable, setVideoAvailable] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => setVideoAvailable(true);
      const handleError = () => setVideoAvailable(false);

      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("error", handleError);

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("error", handleError);
      };
    }
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden border border-border bg-ink shadow-sm">
      {/* Real Video Element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          videoAvailable ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Tasteful Finished Cinematic Geometric Visual */}
      {videoAvailable !== true && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-ink to-ink-surface flex items-center justify-center select-none">
          {/* Subtle architectural framing */}
          <div className="absolute inset-4 md:inset-8 border border-paper/15 rounded-xl flex items-center justify-center">
            <div className="absolute inset-4 md:inset-8 border border-paper/10 rounded-lg" />
          </div>

          {/* Centered vignette (not an off-center spotlight — kept per
              CLAUDE.md's documented exception) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(23,25,24,0.25)_0%,rgba(14,15,15,0.7)_80%)]" />

          {/* Subtle center badge / icon */}
          <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full border border-paper/20 bg-ink-surface/60 backdrop-blur-xs flex items-center justify-center shadow-lg transition-transform hover:scale-105 duration-300">
            <Play className="w-6 h-6 md:w-7 md:h-7 text-paper fill-paper/20 translate-x-0.5" />
          </div>

          {/* Viewfinder corner guides */}
          <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-paper/30 pointer-events-none" />
          <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-paper/30 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-paper/30 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-paper/30 pointer-events-none" />
        </div>
      )}
    </div>
  );
}

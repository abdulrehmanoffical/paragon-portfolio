"use client";

import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { VideoProject } from "@/lib/videoEditingData";

interface VideoThumbnailProps {
  project: VideoProject;
  isCenter?: boolean;
}

export default function VideoThumbnail({ project, isCenter = false }: VideoThumbnailProps) {
  const isVertical = project.aspectRatio === "9/16";

  const playBadge = (
    <div className="relative z-10 my-auto flex flex-col items-center justify-center">
      <div
        className={`rounded-full bg-paper/15 border border-paper/30 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-300 ${
          isCenter
            ? "w-12 h-12 sm:w-16 sm:h-16 group-hover:scale-110 group-hover:bg-paper/25"
            : "w-8 h-8 sm:w-10 sm:h-10"
        }`}
      >
        <Play
          className={`text-paper fill-paper/40 translate-x-0.5 ${
            isCenter ? "w-5 h-5 sm:w-6 sm:h-6" : "w-3.5 h-3.5 sm:w-4 sm:h-4"
          }`}
        />
      </div>
    </div>
  );

  // Real video: show its actual generated first-frame poster with a
  // minimal glass play-badge for affordance.
  if (project.poster) {
    return (
      <div className="relative w-full h-full bg-ink overflow-hidden select-none">
        <Image
          src={project.poster}
          alt=""
          fill
          sizes={isVertical ? "340px" : "700px"}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">{playBadge}</div>
      </div>
    );
  }

  // No real media yet — the neutral "camera UI" placeholder mockup.
  const timecodes = [
    "00:03:14:18",
    "00:06:42:09",
    "00:01:28:15",
    "00:04:55:03",
    "00:08:12:21",
    "00:02:40:07",
  ];
  const timecode = timecodes[project.accentIndex % timecodes.length];

  return (
    <div className="relative w-full h-full bg-ink overflow-hidden select-none flex flex-col justify-between p-4 sm:p-5">
      {/* Cinematic gradient backdrop — fixed dark regardless of site theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink to-ink-surface" />

      {/* Film letterbox guide lines / frame */}
      <div className="absolute inset-2 sm:inset-3 border border-paper/10 rounded-lg pointer-events-none" />

      {/* Top Header: REC badge & Timecode */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500/80 animate-pulse" />
          <span className="text-[9px] sm:text-[11px] tracking-wider text-paper/80 uppercase">
            REC
          </span>
        </div>
        <span className="text-[9px] sm:text-[11px] tracking-widest text-paper/55">
          {timecode}
        </span>
      </div>

      {playBadge}

      {/* Bottom Area: Audio Waveform Tracks & Scrubber */}
      <div className="relative z-10 space-y-1.5 sm:space-y-2">
        <div className="flex items-end gap-1 h-3 sm:h-4 opacity-75">
          {isVertical ? (
            <>
              <div className="w-1/4 h-2 bg-paper/20 rounded-xs" />
              <div className="w-1/3 h-3 bg-paper/40 rounded-xs" />
              <div className="w-1/4 h-2 bg-paper/25 rounded-xs" />
              <div className="w-1/6 h-3.5 bg-paper/50 rounded-xs" />
            </>
          ) : (
            <>
              <div className="w-1/6 h-2 bg-paper/20 rounded-xs" />
              <div className="w-1/4 h-3 bg-paper/40 rounded-xs" />
              <div className="w-1/5 h-2 bg-paper/25 rounded-xs" />
              <div className="w-1/4 h-3.5 bg-paper/50 rounded-xs" />
              <div className="w-1/6 h-1.5 bg-paper/20 rounded-xs" />
            </>
          )}
        </div>
        <div className="w-full h-1 bg-paper/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-paper/55 rounded-full"
            style={{ width: `${35 + (project.accentIndex * 12) % 55}%` }}
          />
        </div>
      </div>
    </div>
  );
}

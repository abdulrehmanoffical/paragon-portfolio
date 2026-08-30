"use client";

import React from "react";
import { Layers, BarChart3, Layout } from "lucide-react";
import { ServiceType } from "@/lib/portfolioData";

interface ProjectThumbnailProps {
  service: ServiceType;
  className?: string;
}

export default function ProjectThumbnail({
  service,
  className = "w-full h-full",
}: ProjectThumbnailProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border bg-ink select-none ${className}`}
    >
      {/* GHL — funnel / pipeline composition */}
      {service === "ghl" && (
        <div className="relative w-full h-full bg-gradient-to-br from-ink-surface to-ink p-6 flex flex-col justify-between">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(250,248,242,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(250,248,242,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="relative z-10 flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-paper/10 border border-paper/20">
              <BarChart3 className="w-3.5 h-3.5 text-paper" />
            </div>
          </div>
          <div className="relative z-10 my-auto w-full max-w-[260px] mx-auto space-y-2.5">
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-paper/10 border border-paper/15">
              <div className="w-2 h-2 rounded-full bg-paper/70 shrink-0" />
              <div className="h-2 w-full bg-paper/30 rounded-xs" />
            </div>
            <div className="flex justify-center">
              <div className="w-px h-3 bg-paper/30" />
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-paper/15 border border-paper/25 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-paper shrink-0" />
              <div className="h-2 w-3/4 bg-paper/50 rounded-xs" />
            </div>
          </div>
          <div className="relative z-10 h-1 w-full bg-paper/10 rounded-full" />
        </div>
      )}

      {/* Graphic Design — poster / layout composition */}
      {service === "graphic-design" && (
        <div className="relative w-full h-full bg-gradient-to-br from-ink to-ink-surface p-6 flex flex-col justify-between">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full border border-paper/15 pointer-events-none" />
          <div className="relative z-10 flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-paper/10 border border-paper/20">
              <Layers className="w-3.5 h-3.5 text-paper" />
            </div>
          </div>
          <div className="relative z-10 my-auto flex flex-col items-start space-y-2.5">
            <div className="h-6 w-3/4 bg-paper/80 rounded-xs" />
            <div className="h-3 w-1/2 bg-paper/40 rounded-xs" />
            <div className="flex gap-2 pt-2">
              <div className="w-8 h-8 rounded-sm bg-paper/20 border border-paper/30" />
              <div className="w-8 h-8 rounded-sm bg-ink-surface border border-paper/20" />
              <div className="w-8 h-8 rounded-sm bg-paper/35 border border-paper/20" />
            </div>
          </div>
        </div>
      )}

      {/* WordPress — website / browser composition */}
      {service === "wordpress" && (
        <div className="relative w-full h-full bg-gradient-to-br from-ink to-ink-surface flex flex-col">
          <div className="h-7 bg-paper/5 border-b border-paper/10 px-3 flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-paper/25" />
            <span className="w-2 h-2 rounded-full bg-paper/25" />
            <span className="w-2 h-2 rounded-full bg-paper/25" />
            <div className="ml-auto p-1 rounded bg-paper/10">
              <Layout className="w-3 h-3 text-paper" />
            </div>
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center gap-3">
            <div className="h-3 w-2/3 bg-paper/70 rounded-xs" />
            <div className="h-2 w-5/6 bg-paper/30 rounded-xs" />
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="h-10 rounded bg-paper/10 border border-paper/15" />
              <div className="h-10 rounded bg-paper/10 border border-paper/15" />
              <div className="h-10 rounded bg-paper/10 border border-paper/15" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

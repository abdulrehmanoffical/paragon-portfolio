"use client";

import React from "react";

interface TeamPortraitProps {
  memberIndex: number;
  className?: string;
}

export default function TeamPortrait({
  memberIndex,
  className = "w-full h-full"
}: TeamPortraitProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-border bg-surface flex items-center justify-center group/portrait select-none ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-border/30 pointer-events-none" />

      {/* Member 01: Lead Motion / Video */}
      {memberIndex === 0 && (
        <div className="relative w-full h-full p-6 flex flex-col justify-center items-center overflow-hidden">
          {/* Abstract Portrait Silhouette */}
          <div className="relative w-44 h-56 flex items-center justify-center">
            <div className="absolute w-36 h-48 rounded-t-full border border-border bg-background shadow-sm transition-transform duration-700 group-hover/portrait:-translate-y-1" />
            <div className="absolute top-6 w-20 h-20 rounded-full border border-strong/20 bg-strong/5 flex items-center justify-center transition-transform duration-700 group-hover/portrait:scale-105">
              <div className="w-10 h-10 rounded-full bg-strong/15" />
            </div>
            <div className="absolute bottom-2 w-32 h-20 rounded-t-2xl border-t border-x border-strong/15 bg-strong/8" />
          </div>
        </div>
      )}

      {/* Member 02: Systems / Automation */}
      {memberIndex === 1 && (
        <div className="relative w-full h-full p-6 flex flex-col justify-center items-center overflow-hidden">
          {/* Abstract Geometric Silhouette */}
          <div className="relative w-44 h-56 flex items-center justify-center">
            <div className="absolute w-36 h-48 rounded-lg border border-border bg-background shadow-sm transition-transform duration-700 group-hover/portrait:rotate-1" />
            <div className="absolute top-8 w-16 h-16 border border-strong/20 bg-strong/5 flex items-center justify-center rotate-45 transition-transform duration-700 group-hover/portrait:rotate-90">
              <div className="w-8 h-8 bg-secondary/30" />
            </div>
            <div className="absolute bottom-4 w-28 h-16 border border-border bg-strong/5 rounded grid grid-cols-2 gap-1 p-1">
              <div className="bg-strong/10 rounded-sm" />
              <div className="bg-strong/10 rounded-sm" />
            </div>
          </div>
        </div>
      )}

      {/* Member 03: Brand & Web Design */}
      {memberIndex === 2 && (
        <div className="relative w-full h-full p-6 flex flex-col justify-center items-center overflow-hidden">
          {/* Abstract Editorial Silhouette */}
          <div className="relative w-44 h-56 flex items-center justify-center">
            <div className="absolute w-36 h-48 rounded-full border border-border bg-background shadow-sm transition-transform duration-700 group-hover/portrait:scale-102" />
            <div className="absolute top-8 w-18 h-24 rounded-full border border-strong/20 bg-strong/[0.04] flex items-center justify-center">
              <span className="font-display text-2xl text-strong/40 italic">03</span>
            </div>
            <div className="absolute bottom-4 w-24 h-12 border-t border-strong/15 bg-strong/8 rounded-t-full" />
          </div>
        </div>
      )}

      {/* Hover vignette */}
      <div className="absolute inset-0 bg-strong/0 group-hover/portrait:bg-strong/[0.02] transition-colors duration-500 pointer-events-none" />
    </div>
  );
}

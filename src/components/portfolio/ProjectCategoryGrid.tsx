"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play, Layers, BarChart3, Layout } from "lucide-react";
import { VIDEO_CATEGORIES, VideoProject } from "@/lib/videoEditingData";
import { Project, getProjectsByService } from "@/lib/portfolioData";
import VideoLightbox from "@/components/video-editing/VideoLightbox";
import GraphicDesignLightbox from "./GraphicDesignLightbox";

interface FeaturedCategory {
  id: string;
  name: string;
  href: string;
  renderVisual: () => React.ReactNode;
}

const featuredCategories: FeaturedCategory[] = [
  {
    id: "video-editing",
    name: "Video Editing",
    href: "/projects/video-editing",
    renderVisual: () => (
      <div className="relative w-full h-full bg-gradient-to-br from-ink to-ink-surface flex flex-col justify-between p-6 overflow-hidden select-none">
        {/* Top bar: Recording status */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500/80 animate-pulse" />
            <span className="text-[11px] tracking-wider text-paper/80">REC</span>
          </div>
          <span className="text-[11px] tracking-widest text-paper/60">00:08:24:12</span>
        </div>

        {/* Center: Cinematic Play Frame */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-paper/10 border border-paper/25 backdrop-blur-xs flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            <Play className="w-5 h-5 text-paper fill-paper/30 translate-x-0.5" />
          </div>
        </div>

        {/* Bottom: Timeline scrubber & audio waveforms */}
        <div className="relative z-10 space-y-2 pt-2">
          <div className="flex items-center gap-1.5 h-6">
            <div className="w-1/4 h-3 bg-paper/20 rounded-xs" />
            <div className="w-1/3 h-4 bg-paper/35 rounded-xs" />
            <div className="w-1/5 h-3 bg-paper/20 rounded-xs" />
            <div className="w-1/4 h-5 bg-paper/45 rounded-xs" />
          </div>
          <div className="w-full h-1 bg-paper/15 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-paper/55 rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ghl",
    name: "GHL",
    href: "/projects/ghl",
    renderVisual: () => (
      <div className="relative w-full h-full bg-gradient-to-br from-ink-surface to-ink flex flex-col justify-between p-6 overflow-hidden select-none">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(250,248,242,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(250,248,242,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Top: Pipeline Header */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-paper/10 border border-paper/20">
            <BarChart3 className="w-3.5 h-3.5 text-paper" />
          </div>
          <span className="text-[11px] tracking-wider text-paper/90">PIPELINE AUTOMATION</span>
        </div>

        {/* Center: Automation workflow nodes */}
        <div className="relative z-10 my-auto w-full space-y-2.5 max-w-[280px] mx-auto">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-paper/10 border border-paper/15 backdrop-blur-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-paper/70" />
              <div className="h-2 w-20 bg-paper/40 rounded-xs" />
            </div>
            <div className="h-2 w-10 bg-paper/25 rounded-xs" />
          </div>

          <div className="flex justify-center">
            <div className="w-[1px] h-3 bg-paper/30" />
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-paper/15 border border-paper/25 backdrop-blur-xs shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-paper" />
              <div className="h-2 w-28 bg-paper/60 rounded-xs" />
            </div>
            <div className="h-2 w-8 bg-paper/40 rounded-xs" />
          </div>
        </div>

        {/* Bottom: automation status bar */}
        <div className="relative z-10 h-1 w-full bg-paper/10 rounded-full overflow-hidden">
          <div className="w-3/5 h-full bg-paper/50 rounded-full" />
        </div>
      </div>
    ),
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    href: "/projects/graphic-design",
    renderVisual: () => (
      <div className="relative w-full h-full bg-gradient-to-br from-ink to-ink-surface flex flex-col justify-between p-6 overflow-hidden select-none">
        {/* Editorial composition background */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full border border-paper/15 pointer-events-none" />
        <div className="absolute right-12 bottom-12 w-28 h-28 rounded-full border border-paper/10 pointer-events-none" />

        {/* Top: Minimalist tag */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-paper/10 border border-paper/20">
            <Layers className="w-3.5 h-3.5 text-paper" />
          </div>
          <span className="text-[11px] tracking-wider text-paper/90">VISUAL IDENTITY</span>
        </div>

        {/* Center: Typography & Layout Poster Composition */}
        <div className="relative z-10 my-auto flex flex-col items-start space-y-2">
          <div className="h-6 w-3/4 bg-paper/80 rounded-xs" />
          <div className="h-3 w-1/2 bg-paper/40 rounded-xs" />
          <div className="flex gap-2 pt-2">
            <div className="w-8 h-8 rounded-sm bg-paper/20 border border-paper/30" />
            <div className="w-8 h-8 rounded-sm bg-ink-surface border border-paper/20" />
            <div className="w-8 h-8 rounded-sm bg-paper/40 border border-paper/20" />
          </div>
        </div>

        {/* Bottom: composition guideline */}
        <div className="relative z-10 pt-2 border-t border-paper/10 text-[11px] text-paper/60">
          <span>LAYOUT GRID</span>
        </div>
      </div>
    ),
  },
  {
    id: "wordpress",
    name: "WordPress",
    href: "/projects/wordpress",
    renderVisual: () => (
      <div className="relative w-full h-full bg-gradient-to-br from-ink to-ink-surface flex flex-col select-none overflow-hidden">
        {/* Top: Browser Mockup Header */}
        <div className="relative z-10 flex items-center justify-between p-6 pb-3 border-b border-paper/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-paper/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-paper/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-paper/30" />
          </div>
          <div className="w-32 h-3.5 rounded-full bg-paper/10 flex items-center px-2">
            <div className="w-2 h-2 rounded-full bg-paper/40 mr-1.5" />
            <div className="w-16 h-1 bg-paper/20 rounded-full" />
          </div>
          <div className="p-1 rounded bg-paper/10">
            <Layout className="w-3 h-3 text-paper" />
          </div>
        </div>

        {/* Center: Modern Web Layout Structure */}
        <div className="relative z-10 flex-1 p-6 flex flex-col justify-center gap-3">
          <div className="space-y-1.5">
            <div className="h-3 w-2/3 bg-paper/70 rounded-xs" />
            <div className="h-2 w-5/6 bg-paper/30 rounded-xs" />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="h-12 rounded bg-paper/10 border border-paper/15 p-1.5 flex flex-col justify-end">
              <div className="h-1.5 w-3/4 bg-paper/40 rounded-xs" />
            </div>
            <div className="h-12 rounded bg-paper/10 border border-paper/15 p-1.5 flex flex-col justify-end">
              <div className="h-1.5 w-3/4 bg-paper/40 rounded-xs" />
            </div>
            <div className="h-12 rounded bg-paper/10 border border-paper/15 p-1.5 flex flex-col justify-end">
              <div className="h-1.5 w-3/4 bg-paper/40 rounded-xs" />
            </div>
          </div>
        </div>

        {/* Bottom: layout guideline */}
        <div className="relative z-10 px-6 pb-4 pt-2 border-t border-paper/10 text-[11px] text-paper/60">
          <span>RESPONSIVE LAYOUT</span>
        </div>
      </div>
    ),
  },
];

// The one real SaaS video and the Benetton poster — the only two pieces of
// real content that currently exist for Featured Work. GHL/WordPress have
// no real content yet, so they keep the abstract mockup + direct link
// unconditionally; fabricating a "best work" thumbnail for them would be
// exactly the invented content the content rules forbid.
const featuredVideoProject: VideoProject | null =
  VIDEO_CATEGORIES.find((c) => c.id === "saas-videos")?.items[0] ?? null;

const graphicDesignProjects: Project[] = getProjectsByService("graphic-design");
const featuredGraphicIndex = graphicDesignProjects.findIndex((p) => p.id === "des-benetton");
const featuredGraphicProject: Project | null =
  featuredGraphicIndex >= 0 ? graphicDesignProjects[featuredGraphicIndex] : null;

interface ProjectCategoryGridProps {
  /** When true (Home's Featured Work only — never the /projects overview
   * page, which must keep linking straight to each category per CLAUDE.md):
   * the Video Editing and Graphic Design cards preview real supplied work
   * and open the existing lightbox for it, with a "See all …" link out to
   * the full category page, instead of navigating away immediately. */
  enableFeaturedPreview?: boolean;
}

export default function ProjectCategoryGrid({ enableFeaturedPreview = false }: ProjectCategoryGridProps) {
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);
  const [graphicActiveIndex, setGraphicActiveIndex] = useState<number | null>(null);

  const cardClassName =
    "group block w-full text-left rounded-2xl bg-surface border border-border p-3 sm:p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-strong/40 hover:shadow-md hover:shadow-black/5";

  const cardInner = (name: string, visual: React.ReactNode) => (
    <>
      {/* Dominant Visual Thumbnail */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-border bg-ink transition-transform duration-300 group-hover:scale-[1.01]">
        {visual}
      </div>

      {/* Bottom Row: Service Name & Arrow (glass badge — the one deliberate
          glass touch in this grid, per the brief's "small floating UI
          elements" good-use case) */}
      <div className="flex items-center justify-between px-1 py-1">
        <span className="text-base sm:text-lg font-medium text-text group-hover:text-strong transition-colors">
          {name}
        </span>
        <div className="w-8 h-8 rounded-full bg-surface/70 backdrop-blur-md border border-border/50 flex items-center justify-center text-text group-hover:bg-strong group-hover:text-background group-hover:border-strong transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-10">
      {featuredCategories.map((category) => {
        if (enableFeaturedPreview && category.id === "video-editing" && featuredVideoProject?.poster) {
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setVideoLightboxOpen(true)}
              className={cardClassName}
            >
              {cardInner(
                category.name,
                <>
                  <Image
                    src={featuredVideoProject.poster}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-paper/15 border border-paper/30 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                      <Play className="w-5 h-5 text-paper fill-paper/40 translate-x-0.5" />
                    </div>
                  </div>
                </>
              )}
            </button>
          );
        }

        if (enableFeaturedPreview && category.id === "graphic-design" && featuredGraphicProject?.gallery?.[0]) {
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setGraphicActiveIndex(featuredGraphicIndex)}
              className={cardClassName}
            >
              {cardInner(
                category.name,
                <Image
                  src={featuredGraphicProject.gallery[0]}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
            </button>
          );
        }

        return (
          <Link key={category.id} href={category.href} className={cardClassName}>
            {cardInner(category.name, category.renderVisual())}
          </Link>
        );
      })}

      {enableFeaturedPreview && (
        <>
          <VideoLightbox
            project={videoLightboxOpen ? featuredVideoProject : null}
            onClose={() => setVideoLightboxOpen(false)}
            viewAllHref="/projects/video-editing"
            viewAllLabel="See all Video Editing"
          />
          <GraphicDesignLightbox
            projects={graphicDesignProjects}
            activeIndex={graphicActiveIndex}
            onClose={() => setGraphicActiveIndex(null)}
            onNavigate={setGraphicActiveIndex}
            viewAllHref="/projects/graphic-design"
            viewAllLabel="See all Graphic Design"
          />
        </>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { VIDEO_CATEGORIES, VideoProject } from "@/lib/videoEditingData";
import VideoCarousel from "@/components/video-editing/VideoCarousel";
import VideoLightbox from "@/components/video-editing/VideoLightbox";
import ServiceTestimonials from "@/components/testimonials/ServiceTestimonials";
import Footer from "@/components/layout/Footer";

export default function VideoEditingPortfolioPage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);

  return (
    <div className="w-full bg-background text-text flex flex-col min-h-screen">
      {/*
        ==================================================
        HEADER / PAGE TITLE & SHORT INTRODUCTION
        ==================================================
      */}
      <header className="w-full pt-28 sm:pt-36 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-strong uppercase mb-4">
            VIDEO EDITING
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-secondary font-normal max-w-2xl text-pretty">
            Cinematic edits with clear pacing, strong visual flow, and attention to detail.
          </p>
        </div>
      </header>

      {/*
        ==================================================
        VIDEO CATEGORIES (Exactly 4 categories in order)
        1. SAAS VIDEOS
        2. GAMING
        3. YOUTUBE
        4. REELS & SHORTS
        ==================================================
      */}
      <main className="w-full flex-1">
        {VIDEO_CATEGORIES.map((category) => (
          <VideoCarousel
            key={category.id}
            categoryTitle={category.title}
            items={category.items}
            aspectRatio={category.aspectRatio}
            onSelectVideo={(video) => setSelectedVideo(video)}
          />
        ))}
      </main>

      {/* Reusable Video Lightbox */}
      <VideoLightbox
        project={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      <ServiceTestimonials service="video-editing" />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

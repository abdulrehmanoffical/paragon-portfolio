"use client";

import React from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { Project } from "@/lib/portfolioData";
import ProjectThumbnail from "./ProjectThumbnail";

interface GraphicDesignCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function GraphicDesignCard({ project, onSelect }: GraphicDesignCardProps) {
  const cover = project.gallery?.[0];

  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className="group block w-full text-left rounded-2xl bg-surface border border-border p-3 sm:p-4 transition-all duration-300 hover:border-strong/40 hover:shadow-md hover:shadow-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-strong/30"
    >
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 border border-border transition-transform duration-300 group-hover:scale-[1.01]">
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <ProjectThumbnail service="graphic-design" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300">
          <div className="w-11 h-11 rounded-full bg-paper/90 text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="px-1 py-1">
        <h3 className="text-base sm:text-lg font-medium text-text group-hover:text-strong transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-secondary mt-1">{project.description}</p>
      </div>
    </button>
  );
}

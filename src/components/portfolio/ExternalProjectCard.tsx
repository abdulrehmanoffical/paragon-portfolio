"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/portfolioData";
import ProjectThumbnail from "./ProjectThumbnail";

interface ExternalProjectCardProps {
  project: Project;
}

export default function ExternalProjectCard({ project }: ExternalProjectCardProps) {
  const hasLink = Boolean(project.externalUrl);

  return (
    <a
      href={hasLink ? project.externalUrl : undefined}
      target={hasLink ? "_blank" : undefined}
      rel={hasLink ? "noopener noreferrer" : undefined}
      aria-disabled={!hasLink}
      className={`group block rounded-2xl bg-surface border border-border p-3 sm:p-4 transition-all duration-300 ${
        hasLink
          ? "hover:border-strong/40 hover:shadow-md hover:shadow-black/5 cursor-pointer"
          : "cursor-default"
      }`}
    >
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-border transition-transform duration-300 group-hover:scale-[1.01]">
        <ProjectThumbnail service={project.service} />
      </div>

      <div className="flex items-start justify-between gap-4 px-1 py-1">
        <div>
          <h3 className="text-base sm:text-lg font-medium text-text group-hover:text-strong transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-secondary mt-1 max-w-md">{project.description}</p>
        </div>
        <div className="shrink-0 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-text">
          <span>View Website</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
}

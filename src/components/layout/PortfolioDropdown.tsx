"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ArrowUpRight } from "lucide-react";

const projectItems = [
  { name: "Video Editing", href: "/projects/video-editing" },
  { name: "GHL", href: "/projects/ghl" },
  { name: "Graphic Design", href: "/projects/graphic-design" },
  { name: "WordPress", href: "/projects/wordpress" },
];

export default function ProjectsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/projects"
        className="flex items-center gap-1 py-2 text-xs uppercase tracking-[0.14em] font-medium text-text hover:text-strong transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        onClick={() => setIsOpen(false)}
      >
        <span>PROJECTS</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-secondary transition-transform duration-200 ${
            isOpen ? "rotate-180 text-strong" : ""
          }`}
        />
      </Link>

      {/* Elegant, compact dropdown menu — glass surface */}
      <div
        className={`absolute top-full left-0 pt-2 w-52 transition-all duration-200 z-50 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-surface/80 backdrop-blur-md border border-border/60 rounded-lg shadow-lg shadow-black/5 py-1.5 overflow-hidden">
          {projectItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 text-xs text-text hover:bg-background/60 hover:text-strong transition-colors font-medium group outline-none focus-visible:bg-background/60 focus-visible:text-strong"
            >
              <span>{item.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


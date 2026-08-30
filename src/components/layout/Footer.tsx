"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface text-text border-t border-border pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center mb-4 opacity-90 hover:opacity-100 transition-opacity">
                <Logo className="h-7" />
              </Link>
              <p className="text-sm text-secondary max-w-sm leading-relaxed">
                Video, design, and digital work for businesses that value clear, thoughtful execution.
              </p>
            </div>
            <div className="mt-8 text-xs text-secondary">
              &copy; {currentYear} PARAGON. All rights reserved.
            </div>
          </div>

          {/* Projects Col */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-strong block mb-2">
              Projects
            </span>
            <ul className="space-y-2 text-sm text-secondary">
              <li>
                <Link
                  href="/projects/video-editing"
                  className="hover:text-strong transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  Video Editing
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/ghl"
                  className="hover:text-strong transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  GHL
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/graphic-design"
                  className="hover:text-strong transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/wordpress"
                  className="hover:text-strong transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  WordPress
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Col */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-strong block mb-2">
              Navigation
            </span>
            <ul className="space-y-2 text-sm text-secondary">
              <li>
                <Link href="/" className="hover:text-strong transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-strong transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-strong transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-strong transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-strong transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
                  Testimonials
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-strong hover:text-secondary font-medium transition-colors"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Minimal Row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-secondary">
          <div>Creative Digital Studio</div>
          <div className="flex gap-6">
            <Link href="/projects" className="hover:text-strong transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
              Work
            </Link>
            <Link href="/contact" className="hover:text-strong transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
              Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

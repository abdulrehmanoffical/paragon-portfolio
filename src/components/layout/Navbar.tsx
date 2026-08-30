"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectsDropdown from "./PortfolioDropdown";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Logo from "@/components/ui/Logo";
import { ArrowUpRight, Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const projectLinks = [
    { name: "Video Editing", href: "/projects/video-editing" },
    { name: "GHL", href: "/projects/ghl" },
    { name: "Graphic Design", href: "/projects/graphic-design" },
    { name: "WordPress", href: "/projects/wordpress" },
  ];

  return (
    <>
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/75 backdrop-blur-md py-4 border-b border-border/50 shadow-sm shadow-black/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Left: Brand Logo */}
        <div className="w-1/4">
          <Link href="/" className="inline-flex items-center opacity-90 hover:opacity-100 transition-opacity">
            <Logo className="h-6 sm:h-7" />
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-[0.14em] font-medium text-text">
          <Link
            href="/"
            className="hover:text-strong transition-colors py-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            HOME
          </Link>
          <ProjectsDropdown />
          <Link
            href="/about"
            className="hover:text-strong transition-colors py-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            ABOUT
          </Link>
          <Link
            href="/testimonials"
            className="hover:text-strong transition-colors py-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            TESTIMONIALS
          </Link>
          <Link
            href="/contact"
            className="hover:text-strong transition-colors py-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            CONTACT
          </Link>
        </nav>

        {/* Right: Theme Toggle, CTA & Mobile Toggle */}
        <div className="w-1/4 flex justify-end items-center gap-1 sm:gap-3">
          <ThemeToggle />

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-medium text-strong bg-surface/70 backdrop-blur-md border border-border/50 hover:bg-strong hover:text-background hover:border-strong py-2.5 px-4 rounded-full transition-all duration-200 group"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text hover:text-strong transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>

      {/* Polished Mobile Menu Drawer (rendered outside <header> — a backdrop-blur
          ancestor creates a new containing block for position:fixed descendants,
          which previously collapsed this drawer to the header's own height) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bottom-0 bg-background border-t border-border z-40 overflow-y-auto px-6 py-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex flex-col space-y-4 text-sm uppercase tracking-[0.14em] font-medium text-text">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-border flex items-center justify-between"
              >
                <span>HOME</span>
              </Link>

              <div>
                <button
                  type="button"
                  onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                  className="w-full py-2 border-b border-border flex items-center justify-between text-left uppercase tracking-[0.14em] font-medium text-text"
                >
                  <span>PROJECTS</span>
                  <ChevronRight
                    className={`w-4 h-4 text-secondary transition-transform duration-200 ${
                      mobileProjectsOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {mobileProjectsOpen && (
                  <div className="pl-4 py-2 space-y-3 bg-surface rounded-md mt-2">
                    {projectLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs normal-case tracking-normal py-1 text-secondary hover:text-strong"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-border flex items-center justify-between"
              >
                <span>ABOUT</span>
              </Link>

              <Link
                href="/testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-border flex items-center justify-between"
              >
                <span>TESTIMONIALS</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-border flex items-center justify-between"
              >
                <span>CONTACT</span>
              </Link>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-strong text-background py-3 px-6 rounded-full text-xs uppercase tracking-[0.14em] font-medium shadow-sm"
            >
              <span>LET&apos;S TALK</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

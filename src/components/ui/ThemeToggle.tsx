"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={`relative flex items-center justify-center w-11 h-11 rounded-full text-text hover:text-strong hover:bg-surface/70 hover:backdrop-blur-md hover:border hover:border-border/50 active:scale-90 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      {/* Driven by the dark: CSS variant, not the `isDark` JS value — that
          value is briefly "light" on every first render (useSyncExternalStore
          reporting the SSR snapshot before it self-corrects), which caused a
          real flash of the wrong icon for dark-mode visitors. CSS resolves
          against the live [data-theme] attribute immediately, so there's
          nothing to visibly correct after the fact. */}
      <span className="relative block w-4 h-4" aria-hidden="true">
        <Sun className="absolute inset-0 w-4 h-4 transition-all duration-300 opacity-100 rotate-0 scale-100 dark:opacity-0 dark:-rotate-90 dark:scale-75" />
        <Moon className="absolute inset-0 w-4 h-4 transition-all duration-300 opacity-0 rotate-90 scale-75 dark:opacity-100 dark:rotate-0 dark:scale-100" />
      </span>
    </button>
  );
}

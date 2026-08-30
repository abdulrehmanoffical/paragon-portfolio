"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

// A restrained fade on navigation instead of the previous hard cut. Next's
// nested layouts mean this wrapper itself never remounts on navigation —
// only its children (the new page) do — so this is a soft entrance for the
// incoming page, not a true old/new crossfade (that needs the View
// Transitions API, which isn't reliably available yet); skipped on the
// very first paint since that's already covered by the cinematic intro
// and each page's own reveal motion.
export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!ref.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(ref.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}

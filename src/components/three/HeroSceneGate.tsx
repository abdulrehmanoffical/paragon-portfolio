"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

// The scene is real WebGL work for a purely decorative element — skip
// mounting it below the breakpoint where it'd actually render at a visible
// size, rather than paying init cost off-screen behind a CSS `hidden`.
const MIN_WIDTH_QUERY = "(min-width: 1024px)";
const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

// Same useSyncExternalStore-over-matchMedia shape as ThemeContext — reads
// the live media query directly rather than setState-in-effect, so there's
// no synchronous setState-during-effect render cascade to lint against.
function subscribeToQuery(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

function makeSnapshotGetter(query: string) {
  return () => window.matchMedia(query).matches;
}

const subscribeWidth = subscribeToQuery(MIN_WIDTH_QUERY);
const getWidthSnapshot = makeSnapshotGetter(MIN_WIDTH_QUERY);
const subscribeMotion = subscribeToQuery(REDUCE_MOTION_QUERY);
const getMotionSnapshot = makeSnapshotGetter(REDUCE_MOTION_QUERY);
const getServerSnapshot = () => false;

export default function HeroSceneGate() {
  const shouldRender = useSyncExternalStore(subscribeWidth, getWidthSnapshot, getServerSnapshot);
  const reduceMotion = useSyncExternalStore(subscribeMotion, getMotionSnapshot, getServerSnapshot);

  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-full max-w-md mx-auto rounded-3xl glass-strong overflow-hidden"
    >
      {shouldRender && <HeroScene reduceMotion={reduceMotion} />}
    </div>
  );
}

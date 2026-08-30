import Image from "next/image";

interface LogoProps {
  className?: string;
  /** Force a specific variant regardless of the active theme — used by the
   * cinematic intro, which is always a white panel + black logo by design. */
  force?: "black" | "white";
}

// Matches the visible wordmark's own aspect ratio inside the source SVGs
// (both LOGO.svg and white logo.svg embed the mark at the same placement:
// x=81.438 y=199.219 width=877.625 height=119.469 within a 1040x520 canvas).
// Cropping to this ratio with object-fit: cover removes the large transparent
// padding baked into the source files without touching the assets themselves.
const LOGO_ASPECT = "877.625 / 119.469";

export default function Logo({ className = "h-6", force }: LogoProps) {
  const wrapperClassName = `relative inline-block overflow-hidden shrink-0 ${className}`;
  const wrapperStyle = { aspectRatio: LOGO_ASPECT };

  // A forced variant doesn't depend on theme at all — same output on server
  // and client, so a single plain image is correct with no crossfade needed.
  if (force) {
    return (
      <span className={wrapperClassName} style={wrapperStyle}>
        <Image
          src={force === "black" ? "/branding/LOGO.svg" : "/branding/white logo.svg"}
          alt="Paragon"
          fill
          sizes="240px"
          className="object-cover object-center"
        />
      </span>
    );
  }

  // Theme-following: the crossfade is driven purely by the `dark:` CSS
  // variant — the same [data-theme] mechanism every color token uses —
  // rather than by React's `theme` value. That value comes from
  // useSyncExternalStore, which (correctly, to avoid a hydration mismatch)
  // reports "light" for the very first client render regardless of the
  // real theme, then self-corrects a moment later. Driving the crossfade
  // from that JS value caused a real, visible flash of the wrong logo for
  // dark-mode visitors on every load. Pure CSS resolves against the live
  // DOM attribute immediately, so there's nothing to correct after the
  // fact — no flash, matching CLAUDE.md's "no flash of the wrong logo".
  return (
    <span className={wrapperClassName} style={wrapperStyle}>
      <Image
        src="/branding/LOGO.svg"
        alt="Paragon"
        fill
        sizes="240px"
        className="object-cover object-center transition-opacity duration-300 opacity-100 dark:opacity-0"
      />
      <Image
        src="/branding/white logo.svg"
        alt=""
        aria-hidden="true"
        fill
        sizes="240px"
        className="object-cover object-center transition-opacity duration-300 opacity-0 dark:opacity-100"
      />
    </span>
  );
}

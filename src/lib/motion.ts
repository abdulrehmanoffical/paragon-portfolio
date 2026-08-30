export const EASE = {
  standard: "power2.out",
  emphasized: "power2.inOut",
  gentle: "power1.inOut",
  // A smoother, more decelerated curve than the power2 family — used where
  // a moment should read as considered/cinematic rather than snappy.
  premium: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

export const DURATION = {
  fast: 0.2,
  base: 0.35,
  carousel: 0.5,
  slow: 0.65,
} as const;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The Paragon logo assets are local, trusted SVGs (public/branding/) —
    // Next's image optimizer blocks SVG sources by default as a general
    // safety measure against untrusted uploads, which doesn't apply here.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

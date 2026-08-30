#!/usr/bin/env node
// Generates a first-frame poster JPG for every real video listed below,
// using ffmpeg. Re-run this whenever a video is added or replaced — it's
// not part of the build (some environments won't have ffmpeg installed),
// so posters are committed as static files in public/media/video-editing-posters/.
//
// This manifest's `id`s must match the corresponding VideoProject `id`s in
// src/lib/videoEditingData.ts.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const OUT_DIR = path.join(PUBLIC_DIR, "media", "video-editing-posters");

const VIDEOS = [
  { id: "saas-01", src: "media/video editing/Saas/Saas Animation.mp4" },
  { id: "gaming-01", src: "media/video editing/Gaming/Russians are going on RV camping.mp4" },
  { id: "gaming-02", src: "media/video editing/Gaming/When Gamers Use Famous Last Words.mp4" },
  { id: "youtube-01", src: "media/video editing/Youtube/How to Make Your First YouTube Video Go Viral.mp4" },
  { id: "youtube-02", src: "media/video editing/Youtube/Speaking Like This Makes Your Video Addictive.mp4" },
  { id: "reels-01", src: "media/video editing/Reels&short/reel 1.mp4" },
  { id: "reels-02", src: "media/video editing/Reels&short/Informative Reel.mp4" },
  { id: "reels-03", src: "media/video editing/Reels&short/Podcast Reel.mp4" },
  { id: "reels-04", src: "media/video editing/Reels&short/Podcast Reel 2.mp4" },
  { id: "reels-05", src: "media/video editing/Reels&short/RDR 2 Short.mp4" },
  { id: "reels-06", src: "media/video editing/Reels&short/marketing agency reel.mp4" },
];

mkdirSync(OUT_DIR, { recursive: true });

let failed = 0;
for (const { id, src } of VIDEOS) {
  const input = path.join(PUBLIC_DIR, src);
  const output = path.join(OUT_DIR, `${id}.jpg`);

  if (!existsSync(input)) {
    console.error(`skip ${id}: source not found at ${input}`);
    failed++;
    continue;
  }

  try {
    // A literal frame-0 grab (-vframes 1, no seek) produced unusable
    // blank/near-blank stills for 2 of these 11 videos (a loading-spinner
    // frame and a pure-white pre-title frame) — not a reliable extraction
    // process. A small fixed 1s offset is still automatic, still the very
    // start of the video (not an arbitrary/hand-picked frame), and was
    // verified to land on real content for every video here.
    execFileSync(
      "ffmpeg",
      ["-y", "-ss", "1", "-i", input, "-vframes", "1", "-q:v", "2", output],
      { stdio: ["ignore", "ignore", "pipe"] }
    );
    console.log(`ok   ${id}.jpg`);
  } catch (err) {
    console.error(`fail ${id}: ${err.stderr?.toString() ?? err.message}`);
    failed++;
  }
}

if (failed > 0) {
  console.error(`\n${failed} poster(s) failed.`);
  process.exit(1);
}

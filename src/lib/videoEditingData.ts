export interface VideoProject {
  id: string;
  title: string;
  category: string;
  videoSrc?: string;
  poster?: string;
  aspectRatio?: "16/9" | "9/16";
  accentIndex: number;
}

export interface VideoCategoryData {
  id: string;
  title: string;
  aspectRatio?: "16/9" | "9/16";
  items: VideoProject[];
}

// Real videos from public/media/video editing/ — titles are cleaned-up
// versions of the actual filenames (already sensible, descriptive titles),
// nothing invented. Posters are auto-generated stills (scripts/generate-video-posters.mjs)
// from public/media/video-editing-posters/, keyed by this file's `id`s.
// Item counts per category match exactly what real video exists — no
// placeholder items padding out a category beyond its real supply.
export const VIDEO_CATEGORIES: VideoCategoryData[] = [
  {
    id: "saas-videos",
    title: "SAAS VIDEOS",
    aspectRatio: "16/9",
    items: [
      {
        id: "saas-01",
        title: "SaaS Product Animation",
        category: "SAAS VIDEOS",
        videoSrc: "/media/video%20editing/Saas/Saas%20Animation.mp4",
        poster: "/media/video-editing-posters/saas-01.jpg",
        accentIndex: 0,
      },
    ],
  },
  {
    id: "gaming",
    title: "GAMING",
    aspectRatio: "16/9",
    items: [
      {
        id: "gaming-01",
        title: "Russians Are Going On RV Camping",
        category: "GAMING",
        videoSrc: "/media/video%20editing/Gaming/Russians%20are%20going%20on%20RV%20camping.mp4",
        poster: "/media/video-editing-posters/gaming-01.jpg",
        accentIndex: 0,
      },
      {
        id: "gaming-02",
        title: "When Gamers Use Famous Last Words",
        category: "GAMING",
        videoSrc: "/media/video%20editing/Gaming/When%20Gamers%20Use%20Famous%20Last%20Words.mp4",
        poster: "/media/video-editing-posters/gaming-02.jpg",
        accentIndex: 1,
      },
    ],
  },
  {
    id: "youtube",
    title: "YOUTUBE",
    aspectRatio: "16/9",
    items: [
      {
        id: "youtube-01",
        title: "How to Make Your First YouTube Video Go Viral",
        category: "YOUTUBE",
        videoSrc:
          "/media/video%20editing/Youtube/How%20to%20Make%20Your%20First%20YouTube%20Video%20Go%20Viral.mp4",
        poster: "/media/video-editing-posters/youtube-01.jpg",
        accentIndex: 0,
      },
      {
        id: "youtube-02",
        title: "Speaking Like This Makes Your Video Addictive",
        category: "YOUTUBE",
        videoSrc: "/media/video%20editing/Youtube/Speaking%20Like%20This%20Makes%20Your%20Video%20Addictive.mp4",
        poster: "/media/video-editing-posters/youtube-02.jpg",
        accentIndex: 1,
      },
    ],
  },
  {
    id: "reels-shorts",
    title: "REELS & SHORTS",
    aspectRatio: "9/16",
    items: [
      {
        id: "reels-01",
        title: "Click Cyber Aura Reel",
        category: "REELS & SHORTS",
        videoSrc: "/media/video%20editing/Reels%26short/reel%201.mp4",
        poster: "/media/video-editing-posters/reels-01.jpg",
        aspectRatio: "9/16",
        accentIndex: 0,
      },
      {
        id: "reels-02",
        title: "Informative Reel",
        category: "REELS & SHORTS",
        videoSrc: "/media/video%20editing/Reels%26short/Informative%20Reel.mp4",
        poster: "/media/video-editing-posters/reels-02.jpg",
        aspectRatio: "9/16",
        accentIndex: 1,
      },
      {
        id: "reels-03",
        title: "Podcast Reel",
        category: "REELS & SHORTS",
        videoSrc: "/media/video%20editing/Reels%26short/Podcast%20Reel.mp4",
        poster: "/media/video-editing-posters/reels-03.jpg",
        aspectRatio: "9/16",
        accentIndex: 2,
      },
      {
        id: "reels-04",
        title: "Podcast Reel 2",
        category: "REELS & SHORTS",
        videoSrc: "/media/video%20editing/Reels%26short/Podcast%20Reel%202.mp4",
        poster: "/media/video-editing-posters/reels-04.jpg",
        aspectRatio: "9/16",
        accentIndex: 3,
      },
      {
        id: "reels-05",
        title: "RDR 2 Short",
        category: "REELS & SHORTS",
        videoSrc: "/media/video%20editing/Reels%26short/RDR%202%20Short.mp4",
        poster: "/media/video-editing-posters/reels-05.jpg",
        aspectRatio: "9/16",
        accentIndex: 4,
      },
      {
        id: "reels-06",
        title: "Marketing Agency Reel",
        category: "REELS & SHORTS",
        // Source file is actually 16:9 despite living in this vertical
        // category (verified via ffprobe) — left as supplied, not altered;
        // the existing object-cover/object-contain treatment handles it.
        videoSrc: "/media/video%20editing/Reels%26short/marketing%20agency%20reel.mp4",
        poster: "/media/video-editing-posters/reels-06.jpg",
        aspectRatio: "9/16",
        accentIndex: 5,
      },
    ],
  },
];

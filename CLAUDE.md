@AGENTS.md

# PARAGON — SOURCE OF TRUTH

This file is the permanent governing document for this project. Every future session must follow it without needing prior conversation context. It supersedes ad-hoc decisions and describes the CURRENT project only — not its history. Priority order when guidance conflicts:

1. This CLAUDE.md
2. User-provided sketches / explicit new instructions
3. Existing project architecture (reuse before rebuilding)
4. Design/animation/taste skills (quality layer only — never structural authority)
5. Implementation judgement

---

## Identity

The website/studio name is **PARAGON**. This is a custom Next.js portfolio website — not built in WordPress. WordPress is only one of the four *services shown in the portfolio* (Video Editing, GHL, Graphic Design, WordPress).

Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, GSAP, `lucide-react`.

Never expose implementation info to visitors: no mentions of Next.js/React/GSAP/Tailwind, file paths, dev placeholders, or internal workflow in visible copy, metadata, or alt text.

## Routes

```
/
/projects
/projects/video-editing
/projects/ghl
/projects/graphic-design
/projects/wordpress
/about
/contact
/testimonials
```

No `/portfolio` route system. No `/project/[slug]` or `[service]/[slug]` case-study routes.

## Design direction

Premium, professional, trustworthy, authentic, minimalist, refined, interactive, calm.

Glass is a first-class structural material, not a restrained accent — see "Glass system" below. A single abstract 3D moment is permitted on Home (see "Motion & 3D system"). Both still answer to the same bar as everything else: premium and intentional, never templated or gimmicky.

Avoid: neon/glowing glass, colorful glass, decorative blobs, generic AI decoration, excessive rounded-card layouts, unnecessary visual effects, literal 3D device/product mockups.

## Glass system (locked)

Three tiers, defined once in `src/app/globals.css` via Tailwind v4's `@utility` API (`glass-subtle`, `glass-standard`, `glass-strong`) — built only from the locked palette's `--color-surface` / `--color-border` tokens plus blur/shadow, so Light and Dark stay the same material. `@utility` (not a plain class in `@layer utilities`) is what makes `hover:`/`group-hover:`/`focus-visible:` variants resolve against them.

- `glass-subtle` — `surface` at 60% + 12px blur + 40%-border. Chrome that exists in numbers on screen at once and sits at rest: showcase tiles, the graphic design gallery, the mobile nav drawer.
- `glass-standard` — `surface` at 45% + 24px blur + 50%-border + soft shadow. Chrome that exists in small numbers at once: the Navbar (always on, not just post-scroll), lightbox headers/footers, showcase tiles on hover.
- `glass-strong` — `surface` at 35% + 40px blur + 60%-border + stronger shadow. A hero focal panel (currently: the frame around Home's 3D element).

Performance discipline: a grid with many tiles on screen at once uses `-subtle` at rest and steps up to `-standard` only on hover, so at most one or two heavy-blur layers are ever active together — never seven always-on heavy-blur cards. Confirmed by inspecting computed styles directly (screenshots alone don't reliably show a working `backdrop-filter` at these opacities): see the Changelog entry on the Lightning CSS prefix bug this caught.

## Color system (locked)

**Light** — Background `#F3F1EC` · Surface `#E8E5DE` · Border `#D2CEC5` · Secondary `#77736B` · Text `#171717` · Strong `#0E0E0E`

**Dark** — Background `#0E0F0F` · Surface `#171918` · Border `#30312E` · Secondary `#A5A39C` · Text `#F1EFE8` · Strong `#FAF8F2`

No unrelated colors. Light and Dark must feel like the same Paragon brand, not two different designs.

## Typography (locked)

- **Playfair Display** — major page headings, important statements, major CTA headings, testimonial quotes.
- **Source Sans 3** — navigation, body copy, project titles, descriptions, buttons, forms, UI.

No third font, no monospace. Do not reintroduce Instrument Serif, DM Sans, IBM Plex Sans, or any other decorative/editorial font.

## Logo + favicon

Official Paragon logo assets live in `public/branding/` (separate black and white variants). Use the real supplied assets — do not recreate the logo. Favicon uses the supplied branding asset.

Theme behavior: **Light mode → black Paragon logo. Dark mode → white Paragon logo.**

## Theme system

Light and Dark, switchable from the Navbar. The selected theme persists between visits/reloads. No flash of the wrong theme, no flash of the wrong logo, no layout shift on switch — the transition is smooth.

## Cinematic intro

Home begins with a cinematic intro: white screen, centered **black** Paragon logo. Sequence: the logo *arrives* (scale + opacity in, soft decelerate — not static from frame one) → brief hold at full presence → logo settles back slightly while the entire intro layer moves upward together → Home is revealed underneath. Target total duration ~1.1–1.2 seconds. Feel: soft, smooth, premium, cinematic, natural.

No loaders, progress bars, bounce, elastic motion, overshoot, rotation, dramatic scaling, sessionStorage/ESC skipping, or skip buttons. Reduced-motion simplifies the sequence (drops the arrival scale, does a plain crossfade) but still plays it — never skips it.

## Home page

Structure, top to bottom, nothing else:

1. Cinematic Intro
2. Navbar
3. Short Introduction
4. Featured Work
5. Final CTA
6. Footer

Do not add: team/member section, services section, testimonials section, process section, statistics, awards, fake client logos, story/history section. Team members belong on `/about`, not Home. Home should feel substantial through spacing, composition, media, and hierarchy — not extra sections.

The Team Video is temporarily hidden. Do NOT delete its component or functionality — only its Home-page rendering is commented out, kept available for future use. Home must not read as having a large empty space because of this.

**Featured Work**: four service categories — Video Editing, GHL, Graphic Design, WordPress — in a balanced grid. Do not invent real project content; real assets will be added later.

## Projects overview (`/projects`)

Real overview page presenting the four service categories (Video Editing, GHL, Graphic Design, WordPress), each linking to its category page. Do not invent real projects.

## Video Editing (`/projects/video-editing`)

Categories, in this exact order: **SaaS Videos, Gaming, YouTube, Reels & Shorts.** Vlogs is removed and must not be recreated.

Showcase structure (`VideoShowcase.tsx`, replacing the old SMALL/LARGE/SMALL carousel): a responsive, content-aware CSS grid, not a rotating/looping mechanism.
- Exactly 1 item → one large featured tile, no grid.
- 2+ items → column count depends on the category's aspect ratio: horizontal/16:9 categories (SaaS Videos, Gaming, YouTube) use fewer, wider columns; vertical/9:16 categories (Reels & Shorts) use more, narrower columns.
- Every tile: real poster image, `glass-subtle` at rest intensifying to `glass-standard` on hover/focus, staggered scroll-triggered entrance (GSAP), click opens the existing `VideoLightbox` unchanged.

**Video thumbnails**: use the first frame of the video as the thumbnail once real videos are supplied — do not require manually created thumbnails unless the user specifically supplies one. Do not invent video descriptions; titles should be concise and professionally derived from actual supplied content. Reels & Shorts items use title only.

## Graphic Design (`/projects/graphic-design`)

No categories — a visual gallery. Each project may have a title and a very short purpose/detail line; the artwork is the main visual.

Lightbox supports: zoom, pan, reset, next/previous, keyboard controls, mobile touch/pinch where supported.

## GHL (`/projects/ghl`)

Real projects are not ready yet — do not invent projects or URLs. When supplied, each project needs: title, thumbnail, short description, external URL. Thumbnail, title, and arrow link to the configured external URL in a new tab.

## WordPress (`/projects/wordpress`)

Same pattern as GHL: real projects are not ready yet, do not invent. When supplied, each needs title, thumbnail, short description, external URL, opening in a new tab.

## About (`/about`)

No studio-history story. Focus on: the three team members (roles, skills), expertise, process, and a closing CTA. Do not invent biographies.

## Contact (`/contact`)

Fields: Name, Email, Service, Budget, Message. Service options: Video Editing, GHL, Graphic Design, WordPress, Other.

Do not claim a message was sent or received unless the backend actually provides that functionality.

## Testimonials

Main navbar: `HOME · PROJECTS · ABOUT · TESTIMONIALS · CONTACT`, right-aligned `LET'S TALK ↗`.

Testimonials also appear on each corresponding service page (service pages show only their relevant testimonials); `/testimonials` shows the complete collection.

Service-page testimonials use a slider: automatic advancement, smooth transition, manual arrows, dot navigation, keyboard navigation, pause on hover/focus, reduced-motion support. Do not invent real testimonials — use temporary generic data until real testimonials are supplied.

## Content rule — never invent

Never invent: project facts, client results, statistics, awards, client names, URLs, testimonials, bios, business claims. Use user-provided content or existing approved temporary data. Project titles may be professionally refined from raw user-provided information without changing their factual meaning, and should describe the actual work rather than only the client's brand name. Descriptions stay short and useful.

## Placeholder rule

Placeholders must represent the final type of content — a cinematic video frame, a realistic funnel preview, a website preview, a graphic composition. Never a gray box, "PLACEHOLDER", "IMAGE HERE", "MEDIA MISSING", fabricated numbers, or fake client claims.

## Animation principles

Use: soft reveals, restrained hover interactions, smooth transitions, refined carousel movement, lightbox transitions, small arrow movement, subtle button feedback, theme transitions.

Avoid: bounce, constant parallax, random floating elements, flying text, excessive scaling, rotation, glowing effects, animation everywhere.

Use GSAP when it meaningfully improves the interaction; use CSS transitions when GSAP is unnecessary.

## Responsive requirements

Intentionally responsive at 320, 375, 480, 640, 768, 1024, 1280, 1440, 1920 — in both Light and Dark. No horizontal overflow, clipping, overlap, broken media, fixed desktop widths, or awkward mobile layouts.

## Accessibility

Semantic HTML, correct heading hierarchy, full keyboard navigation, visible focus states, accessible buttons and modals/lightboxes, proper labels, logical tab order, reduced-motion behavior throughout.

## Existing-code rule

Before creating a component: check whether an existing component already solves the problem, and reuse/refactor it where practical. Create a new component only when there is a genuine need. Do not create `NavbarNew`, `HeroFinal`, `Component2`, `ComponentNew`, or otherwise duplicate functionality.

## Skills

Skills are refinement tools only — they must not override this file or user instructions.

- **Frontend Design** → UI composition, hierarchy, responsive design, premium visual execution.
- **Taste** → visual taste, anti-generic design, spacing, density, composition.
- **Emil motion skills** → cinematic intro, carousel, interaction motion, easing, transitions.
- **Impeccable** → critique, audit, distillation, and final polish after implementation.

Use the actual skill commands/names available in the current environment. Do not invent command names.

## QA

Before calling a feature complete: test desktop, tablet, mobile; test Light and Dark mode; test keyboard and touch interactions; check browser console, hydration, TypeScript, routes, media, animations, accessibility. Run `npm run build` and `npx eslint src`.

## Motion & 3D system

- Shared easing/duration tokens: `src/lib/motion.ts` (`EASE`, `DURATION`) — used by the showcase grid, both lightboxes, the testimonial crossfade, the theme toggle.
- Shared scroll-reveal: `src/components/motion/Reveal.tsx` — wraps a block, fades/slides it up on scroll (`top 85%` trigger), self-registers ScrollTrigger, skips the tween under `prefers-reduced-motion`. Used on every page's main content area except Home and About (their own per-section reveals) and the video/graphic-design grids (their own per-tile stagger, below).
- Route-level fade: `src/components/motion/RouteTransition.tsx`, wrapping `{children}` in `src/app/layout.tsx` — a soft entrance for the incoming page on navigation instead of a hard cut. Not a true old/new crossfade (that needs the View Transitions API); skips on first paint and under reduced motion.
- Cinematic intro: `src/components/motion/CinematicIntro.tsx` — see "Cinematic intro" above. Three-beat GSAP timeline: arrival (scale+opacity, 0.45s) → hold (0.15s, a real position offset, not a same-property tween — see Changelog) → exit fade+slide together (~0.5–0.55s).
- Video Editing showcase: `src/components/video-editing/VideoShowcase.tsx` — content-aware grid (see "Video Editing" above) with staggered GSAP scroll entrance. Replaces the old `VideoCarousel.tsx` (deleted, not renamed-and-kept — no rotation state left to degrade for 1/2-item categories, since a grid doesn't need it).
- Graphic Design gallery: `GraphicDesignCard.tsx` uses the same `glass-subtle → glass-standard` hover treatment as the video showcase; `src/app/projects/graphic-design/page.tsx` staggers the cards in on scroll the same way (replacing a single whole-grid `Reveal` fade).
- Lightboxes (`VideoLightbox`, `GraphicDesignLightbox`): GSAP entrance/exit (fade + slight scale), not a default modal pop. Both accept an optional `viewAllHref`/`viewAllLabel` pair, rendered only when passed, for non-category-page contexts (currently only Home's Featured Work preview).
- Navbar: active-page underline on top-level links and the Projects dropdown trigger; now a persistent `glass-standard` surface (see "Glass system" above).
- **3D: kept.** `src/components/three/HeroScene.tsx` + `HeroSceneGate.tsx`, on Home's intro section only (`src/app/page.tsx`), desktop/tablet (`lg:` and up — gated in JS via `useSyncExternalStore` over `matchMedia`, not just CSS `hidden`, so the WebGL context is never created off-screen on mobile). A single faceted/low-poly icosahedron with a glass-like `meshPhysicalMaterial` (transmission + clearcoat), lit with two directional lights tinted per-theme, sitting in a `glass-strong` panel. Slow constant rotation plus an eased tilt toward the pointer (`@react-three/fiber`'s `state.pointer`, lerped — not a hard snap). `prefers-reduced-motion` freezes all motion via the same `useSyncExternalStore`-over-`matchMedia` pattern used everywhere else in the codebase, rendering a static form. Lazy-loaded via `next/dynamic({ ssr: false })`. Deliberately not a device/laptop/monitor mockup — evaluated against exactly that templated pattern and steered away from it. This reverses the 2026-08-30 "evaluated and skipped" decision below now that real visual verification (headless Chromium + screenshot inspection, including a scripted pointer-move test) is available — see Changelog.

## Changelog — 2026-08-30

- **Dark mode fix**: color tokens were declared inside `@theme inline`, which bakes literal hex values into generated utilities instead of `var()` references — the `[data-theme="dark"]` override had nothing to attach to, so only the logo/theme-toggle (a separate `dark:`-variant mechanism) ever visibly switched. Moved the six color tokens to a plain `@theme` block; font tokens stay `inline` (they need to reference next/font's scoped variables).
- **Carousel collapse fix**: the SMALL/LARGE/SMALL row was `w-fit`, but its children are sized with percentage widths, which only resolve against a *definite* containing-block width — a shrink-to-fit row has none, so cards collapsed to near-zero. Changed to `w-full`.
- **Carousel duplicate-preview fix**: a category with exactly two items showed the same "other" video in both side slots (prev/next both wrap to the same item when total is 2). Now shows it once, on the side it actually sits.
- **Favicon cache-busting**: added `?v=2` to the favicon URLs.
- **Testimonial autoplay fix**: `prefers-reduced-motion` was killing the auto-advance `setInterval` entirely, not just the crossfade tween — testimonials never auto-advanced for anyone with that OS/browser setting. The reduced-motion check now only governs the crossfade animation; auto-advance always runs, pause-on-hover/focus remains the accessible way to stop it.
- **Home Featured Work real content**: the Video Editing and Graphic Design cards preview real supplied work (the SaaS video, the Benetton poster) and open the existing lightbox for it, with a "See all …" link to the full category page, via a new opt-in `enableFeaturedPreview` prop on `ProjectCategoryGrid`. GHL/WordPress are unchanged (no real content yet). `/projects` overview is unchanged (still links straight to each category).
- **Motion pass**: scroll-reveal added where missing (`/testimonials`, `/projects`, all four service pages, Contact's form/info columns), Navbar active-page indicator added, restrained route-change fade added. See "Motion & 3D system" above.
- **3D**: evaluated for Home/About; skipped. The bar for it was explicitly visual ("must look premium, not a tech demo," confirmed frame rate) and this environment has no way to visually verify that — shipping it unverified risked exactly the outcome the brief warned against. Skipping is the brief's own sanctioned valid outcome under "less, but better."

## Changelog — 2026-08-30 (rebuild)

Full creative rebuild: glass promoted to a structural material, the video carousel replaced with a grid, the cinematic intro re-choreographed, and 3D revisited and kept. Visual verification throughout used the local `@playwright/test` Chromium directly (headless, no MCP) — a throwaway `scratch-*.js` script per check, deleted after use; `scratch-*.js` is now gitignored so a forgotten one never lands in a commit.

- **Carousel → grid**: `VideoCarousel.tsx` (SMALL/LARGE/SMALL rotation, GSAP-tweened positions, wraparound/incoming-item machinery) deleted outright and replaced by `VideoShowcase.tsx`, a responsive CSS grid — see "Video Editing" and "Motion & 3D system" above. No rotation state to degrade for 1-/2-item categories anymore; a grid just renders however many tiles exist. Verified by real scrolling (not a full-page screenshot — see below) at 1 item (SaaS Videos), 2 items (Gaming), and a 4+2 partial-last-row case (Reels & Shorts, 6 items in a 4-column grid).
- **Glass system**: promoted from a restrained accent to a first-class three-tier system — see "Glass system" above. Applied to the Navbar (now always-on, not just post-scroll), the mobile nav drawer, both showcase grids, and a new hero panel around the 3D element.
- **Real bug caught mid-build — Lightning CSS silently drops `backdrop-filter`**: writing both `backdrop-filter: blur(Npx)` and a manual `-webkit-backdrop-filter: blur(Npx)` in the same custom `@utility` rule causes Tailwind v4's CSS transform (Lightning CSS) to deduplicate the pair down to *only* the prefixed declaration — the unprefixed `backdrop-filter` silently disappears from the compiled output. Screenshots alone never caught this (the blur's absence at these background opacities isn't visually obvious); it only surfaced by reading `getComputedStyle(...).backdropFilter` before/after a hover and seeing `"none"` in both states. Fix: write only the unprefixed property and let the build's own autoprefixing add the vendor-prefixed form — the same path Tailwind's built-in `backdrop-blur-*` utilities use. Lesson for future glass/blur work in this codebase: verify `backdrop-filter` with computed-style inspection, not just a screenshot diff.
- **Real bug caught mid-build — GSAP timeline position anchor**: the cinematic intro's exit tweens were positioned at `"<"` relative to a same-property no-op "hold" tween, which anchors to that tween's *start*, not its *end* — the exit tweens started 0.15s early and silently overrode the hold every frame it should have shown. Fix: replaced the no-op hold tween with a real position offset (`"+=0.15"`) on the next real tween. Caught by measuring actual DOM attached→detached duration rather than trusting the coded numbers.
- **Cinematic intro re-choreographed**: logo now arrives (scale 0.92→1 + fade in, `power2.out`) instead of being static from frame one; brief hold; exit is a synchronized fade+scale-down of the logo with the panel slide. Reduced-motion variant also updated to fade in before fading out, rather than only fading out.
- **3D reinstated**: see "Motion & 3D system" above for the shipped implementation. Verified via headless screenshots in both themes, a scripted three-position pointer-move test (confirmed the tilt reads as a smooth, intentional response rather than jitter), and a `prefers-reduced-motion` context check (motion freezes, form still renders).
- **New dependencies**: `three`, `@react-three/fiber`, `@react-three/drei` (drei installed for API consistency with the fiber ecosystem; not currently imported — `HeroScene.tsx` only needed fiber's primitives and a native `meshPhysicalMaterial`, not a drei helper).
- Full QA re-run for this pass: `npm run build` (clean, all 10 routes static) and `npx eslint src` (clean) both pass; verified in both themes at 320/375/1440 with no horizontal overflow; keyboard interaction (tab to a showcase tile, Enter opens its lightbox, Escape closes) confirmed programmatically; console/page errors checked across Home, Video Editing, and Graphic Design and came back clean.

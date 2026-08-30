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

Minimalism + restrained glassmorphism. Glass is a supporting treatment, not the main design language — use it selectively for: navbar, dropdowns, controls, theme toggle, selected/elevated surfaces, lightbox UI where appropriate. Do not turn the whole site into glass cards.

Avoid: excessive blur, neon/glowing glass, colorful glass, decorative blobs, generic AI decoration, excessive rounded-card layouts, unnecessary visual effects.

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

Home begins with a cinematic intro: white screen, centered **black** Paragon logo. Sequence: brief hold → logo fades subtly → the entire intro layer moves upward together → Home is revealed underneath. Target total duration ~1 second. Feel: soft, smooth, premium, cinematic, natural.

No loaders, progress bars, bounce, elastic motion, overshoot, rotation, dramatic scaling, sessionStorage/ESC skipping, or skip buttons. Reduced-motion simplifies the sequence but still plays it — never skips it.

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

Carousel structure is locked: `← [ SMALL ] [ LARGE ] [ SMALL ] →`, arrows outside the media, center item dominant. The carousel must physically animate between positions — never a simple fade/swap.

- Right movement: small → center, center → left, new item → right.
- Left movement is the reverse.

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

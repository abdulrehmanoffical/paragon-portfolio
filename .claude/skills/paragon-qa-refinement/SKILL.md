---
name: paragon-qa-refinement
description: Iterative inspect-test-fix-verify QA and refinement loop for the Paragon portfolio website — finds and fixes bugs, responsive issues, accessibility issues, motion/UX issues, and design-quality issues against CLAUDE.md until no known high-priority issue remains. Escalates to the user instead of guessing when a decision needs their preference, missing content, or a branding call. Use when asked to QA, test, refine, polish, harden, or "keep improving" the Paragon site, or to run a Paragon-specific review-and-fix loop.
user-invocable: true
---

# Paragon QA + Refinement

A reusable loop for this project only: inspect → test → identify → fix → re-check → improve → validate, repeated until the completion criteria below are genuinely met — not until the build merely compiles.

CLAUDE.md is the authority this skill serves. This skill never overrides it, never replaces it, and never contradicts it — it exists to keep the live site matching what CLAUDE.md already specifies, plus general quality (bugs, accessibility, responsiveness, console/build health) CLAUDE.md doesn't need to spell out.

## Before anything else

1. Read `CLAUDE.md` in full, every invocation — it may have changed since the last run. Do not rely on memory of a previous read.
2. Skim recent changes (e.g. `git status`/`git diff` if this becomes a git repo, or simply note which files look freshly touched) so fixes target what's actually current, not a stale mental model.
3. Confirm which skills are actually available in this environment right now (the skill listing surfaced to you at session start) before referencing any by name in step-by-step work. Do not assume a skill exists because an earlier document mentioned it.

## The loop

On each pass:

1. **Inspect.** Read the relevant source for the area under review.
2. **Test.** Run the real checks: `npm run build`, `npx eslint src`, and — when this environment genuinely provides a way to drive the running app (check for a `run` skill or equivalent interactive/browser tooling before assuming one exists) — actually load the rendered pages rather than reasoning from source alone. If no real browser-driving tool is available, say so plainly in your findings and final report instead of asserting visual confidence you don't have; a passing build and lint check verify correctness, not appearance.
3. **Identify.** Classify each finding as one of: bug, responsive issue, accessibility issue, UX/UI issue, motion issue, performance issue, design-quality issue, or user-decision-required. Rank by severity — broken/incorrect behavior first, then accessibility, then polish.
4. **Fix.** Resolve every finding that's a definite, in-scope defect. Don't fix what isn't broken and don't restyle things that already satisfy CLAUDE.md just to feel productive.
5. **Re-check.** Verify the specific fix, then look at the surrounding UI for anything the fix could have disturbed (spacing, adjacent hover states, both themes, both the component and the pages that reuse it).
6. **Repeat.** Move to the next-highest-priority finding. Stop only when the completion criteria are met or every remaining item requires user input.

Never declare the work done because `npm run build` passed. A clean build is a floor, not a finish line.

## User escalation (mandatory)

Stop and ask — do not guess, do not keep editing while waiting — whenever a finding genuinely depends on:
- the user's preference between two reasonable options,
- content that hasn't been supplied (real copy, project data, testimonials, brand facts),
- a branding decision not already settled by CLAUDE.md,
- or anything else CLAUDE.md's "never invent" rule would otherwise force you to fabricate.

When you ask, give: what's unclear, the real available choices, and which one you'd recommend. Keep it concise — one question, not a questionnaire.

## Design priorities (from CLAUDE.md — restated here as a working checklist, not a replacement for it)

Premium, professional, trustworthy, authentic, minimalist, restrained-glassmorphism, polished, interactive, calm. Glass is a refinement layer, not the dominant language. Never add visual complexity just to look impressive — when in doubt between another effect and better spacing/hierarchy/interaction, take the latter.

## Locked rules

- Never override or contradict CLAUDE.md.
- Never invent copy, clients, project information, statistics, URLs, testimonials, results, or awards.
- Never change approved routes, approved typography, the locked color system, or locked page structures.
- Never create a duplicate component (`FooNew`, `Foo2`, `FooFinal`, …) when an existing one can be refined instead — check for an existing solution before adding a new file.

## Skill integration

Resolve each of these roles to whatever skill is actually installed and listed in this environment at run time — do not hardcode a skill name that hasn't been confirmed present, and never invent a command that isn't in that skill's own documented interface:

- **Composition / hierarchy / responsive UI quality** → the frontend-design–type skill, if present.
- **Anti-generic design, visual density, spacing, AI-slop detection** → a dedicated taste-focused skill if one is listed; otherwise apply the same judgment via frontend-design's own guidance and Impeccable's `critique`/`audit`/`distill` commands.
- **Animation timing, easing, interaction motion, carousel/lightbox/transition quality** → a dedicated motion skill if one is listed; otherwise reason about timing/easing directly against CLAUDE.md's animation principles (soft, restrained, no bounce/overshoot/rotation/excess).
- **Critique, audit, distillation, layout refinement, final polish** → the Impeccable-type skill's own named commands, exactly as that skill documents them.

## Specific checks to run every pass

**Theme** — Light and Dark both genuinely work: correct tokens, no flash of the wrong theme on load or toggle, no layout shift.

**Branding** — Light mode shows the black Paragon logo; Dark mode shows the white Paragon logo; the swap is smooth, never flashes the wrong one.

**Cinematic intro** — PARAGON logo → short hold → subtle fade → the entire intro panel slides upward as one unit → Home is revealed. ~1 second total. No loader, no progress bar, no skip logic, no bounce/elastic/overshoot/rotation/dramatic scale.

**Home** — Team Video stays hidden but its component must remain intact and restorable; Home must not read as too short or empty because of that.

**Video Editing carousel** — exact `← [ SMALL ] [ LARGE ] [ SMALL ] →` structure; arrows stay outside the media; center is clearly dominant; movement is a real physical transition, never a fade/swap; Vlogs stays removed; categories stay SaaS Videos, Gaming, YouTube, Reels & Shorts, in that order.

**Projects** — `/projects` works as the overview page linking to all four service categories.

**Testimonials** — `/testimonials` exists, is reachable from the main nav, and shows the full collection; each service page shows only its own testimonials.

**Graphic Design** — the lightbox's zoom/pan/reset/next/previous/keyboard/touch controls all work.

**GHL / WordPress** — never fabricate projects or URLs for these; confirm they still correctly show an "awaiting real content" state rather than placeholder junk.

## Responsive checks

Where real browser-driving tooling is available, check at minimum: 320, 375, 480, 768, 1024, 1440 — in both Light and Dark. Look for: horizontal overflow, clipped content, overlap, broken interaction, awkward empty space. If no such tooling is available, say so and rely on responsive-class review in source instead of claiming a visual sweep happened.

## Animation quality

Alive through: subtle hover states, restrained reveals, polished transitions, useful motion feedback, refined carousel movement, smooth lightboxes. Never: bounce, excessive parallax, random motion, giant scale effects, glowing decoration, or animation added just because an element exists.

## Completion criteria

Only declare completion when all of the following hold:
- every intended route works
- Light/Dark mode both work
- the correct logo appears in each theme
- the cinematic intro works as specified
- Home is visually balanced despite the hidden team video
- the Video Editing carousel is correctly sized and animated
- the Graphic Design lightbox works
- Testimonials work (service pages filtered, `/testimonials` complete)
- mobile navigation works
- responsive layout is stable at the checked breakpoints
- no horizontal overflow exists
- no obvious high-priority UI issue remains
- no console errors remain
- no hydration errors remain
- no TypeScript errors remain
- no invented content has been added
- `npm run build` and `npx eslint src` both pass

## Iteration behavior

Don't stop at the first issue found. After each fix: verify it, look at the surrounding UI, find the next-highest-priority issue, continue. But don't manufacture cosmetic changes to look busy — only make changes that clearly improve the product against CLAUDE.md and the checklist above.

## Final output

Report, every run:
- issues found
- issues fixed
- tests actually performed (and honestly note anything that couldn't be performed, e.g. no real browser tooling available)
- remaining issues
- whether user input is required, and what question to ask
- build result
- lint result

If every completion criterion is satisfied, state clearly: **COMPLETE**.

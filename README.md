# Pharma Forward

Specialist training and knowledge initiative for pharmaceutical, biotechnology
and life sciences professionals. An initiative by Keynotive Limited.

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · Motion · GSAP ·
Lenis · Radix. Builds to a fully static site.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build

```bash
npm run build
npm start            # preview the production build
```

Every route is statically prerendered at build time — the build output marks
them all `○ (Static)` — so deploys serve prebuilt HTML with no per-request
rendering. On Vercel this needs no configuration: the default Next.js preset
is correct, and there should be no `vercel.json` and no `outputDirectory`
override.

To build a portable, host-anywhere copy instead, add `output: "export"` and
`images.unoptimized: true` to `next.config.ts` and point the host at `out/`.
Note that on Vercel a static export also needs `"framework": null` in
`vercel.json`, or the Next.js builder looks for a `routes-manifest.json` that
an export never emits.

## Verify before claiming done

```bash
npx tsc --noEmit && npm run lint && npm run build
```

## Where things live

| What | Where |
| --- | --- |
| **All copy, links, colours** | `src/content/site.ts` — the single source of truth |
| Colour → CSS variable injection | `src/app/layout.tsx` (`themeCss()`) |
| Token → Tailwind mapping | `src/app/globals.css` (`@theme inline`) — **no colour values here** |
| Shared layout kit | `src/components/section.tsx` |
| Page section order | `src/app/page.tsx` |
| Icon name → component registry | `src/components/icon.tsx` |
| Motion tokens | `src/lib/motion.ts` · GSAP registration `src/lib/gsap.ts` |

To change a word, a link or a colour, edit `src/content/site.ts` and nothing
else. To reorder the page, move a line in `src/app/page.tsx`.

## Design system

Cool clinical laboratory ground rather than warm paper. Space Grotesk for
display, Inter for body, JetBrains Mono for **data only** — stage numbers,
indices, spec labels, never decoration. Deep teal accent kept under ~10% of
surface, with a separate darker `accent-text` token for teal text on light
grounds (the fill tone fails contrast at small sizes).

Surfaces are hairline borders and `rounded-sm`. No shadows, no gradients except
the hero legibility scrim.

### The signature

The site's motif is a **specification band** — a measured value judged against a
justified limit, which is the central idea of specification setting, method
validation and control strategy. It appears three times:

- the hero SVG: a bioprocess trace drawn against upper/lower spec limits
- `.spec-band` in `globals.css`: the section divider, a tolerance interval
- the lifecycle axis: nine stages as ticks on an instrument scale

## Deliberate decisions

These differ from the previous build. They were chosen, not overlooked.

- **No in-house enquiry form.** The old form simulated submission with a
  `setTimeout` and a fake "Inquiry Received" message — nothing was sent, so
  every enquiry was silently discarded. It now links to the real Keynotive
  contact page, consistent with every other CTA and compatible with static
  export.
- **No faculty portrait.** The old profile used a stock Unsplash photograph of
  an unrelated person presented as the named trainer. A typeset profile is both
  truthful and better at this density.
- **No testimonials section.** `TESTIMONIALS` was an empty array, so the old
  section rendered nothing. Real participant quotes are needed before it ships;
  they were not invented.
- **Insight cards are inert.** They announce unpublished work, so they carry no
  link and are styled to read as pending rather than clickable.
- **FAQ is not an exclusive accordion.** A shared `<details name>` would let the
  browser force-close one of the two items that ship open.
- **Peer Learning is restored.** It existed fully written in the old codebase
  but was never imported, so it never rendered.

## Accessibility

Skip link, one `h1` with no skipped heading levels, visible `:focus-visible`
ring sitewide, ≥44px touch targets, labelled icon-only buttons, and
`prefers-reduced-motion` honoured in GSAP, Motion and Lenis (movement is
replaced with a crossfade, never removed entirely).

## Skills

`.claude/skills/` carries the design references this build was held to —
`frontend-design` and `design-taste-frontend` for visual direction and
critique, `ui-ux-promax` and `better-accessibility` for behaviour, `better-ui`,
`better-colors`, `better-typography`, `better-layout` for detail, and
`emil-design-eng` / `animate` for motion. A UI change should run the build pass
and then the critique pass; skipping the second is how the first pass's misses
ship.

---
name: gsap-master
description: Building animations with GSAP in this React/Next.js app — useGSAP scoping and cleanup, timelines, ScrollTrigger, SplitText, Flip, and the SSR/StrictMode pitfalls specific to the App Router. Use for scroll-driven sequences, text reveals, timeline choreography, FLIP transitions, or any animation touching more than one element in sequence. For simple component enter/exit and layout animation, use motion-framer instead.
---

# GSAP Master

GSAP is installed with every plugin — since 3.13 the entire "Club" set (SplitText, ScrollTrigger, ScrollSmoother, MorphSVG, DrawSVG, Flip, Observer, Inertia) ships free in the public npm package. Nothing here needs a license.

## Import from the project module, always

```ts
import { gsap, useGSAP, ScrollTrigger, SplitText } from "@/lib/gsap";
```

Never `import { gsap } from "gsap"` in a component. `src/lib/gsap.ts` is the single registration point — it calls `gsap.registerPlugin(...)` behind a `typeof window !== "undefined"` guard, because plugin registration touches `document` and throws during SSR. Registering in two places is harmless but registering in *no* place gives you the confusing "plugin not registered" runtime error.

Every file with a GSAP animation needs `"use client"`.

## useGSAP is not optional

`useGSAP` from `@gsap/react` wraps `gsap.context()`, which does two things you must have in React:

```tsx
const container = useRef<HTMLDivElement>(null);

useGSAP(
  () => {
    // Selectors here are scoped to `container` — ".card" only matches inside it.
    gsap.from(".card", { y: 24, opacity: 0, stagger: 0.08 });
  },
  { scope: container, dependencies: [items.length] },
);

return <div ref={container}>…</div>;
```

- **Scoping** means string selectors resolve inside the container, so a component mounted twice on a page does not animate its sibling's elements.
- **Cleanup** means every tween, timeline, and ScrollTrigger created inside the callback is reverted on unmount and before each re-run. Without it, React StrictMode's double-mount in dev leaves duplicate ScrollTriggers firing, and you get animations that run twice at half speed.

`dependencies` behaves like `useEffect`'s array; omit it and the callback runs once on mount. Anything you create *outside* the callback (an event listener, a `matchMedia`) must be returned as a cleanup function.

## Timelines over chained tweens

A sequence written as several `gsap.to()` calls with hand-computed `delay` values breaks the moment one duration changes. Use a timeline:

```ts
const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.6 } });
tl.from(".title", { yPercent: 110 })
  .from(".subtitle", { opacity: 0, y: 12 }, "-=0.35") // overlap 0.35s
  .from(".cta", { scale: 0.95, opacity: 0 }, "<0.1"); // 0.1s after previous start
```

Position parameters — `"-=0.35"`, `"<"`, `">"`, `"<0.1"`, or a label — are the whole point. Reach for them instead of `delay`.

## What to animate

Animate **transforms and opacity**. `x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`, `autoAlpha` are composited on the GPU and do not trigger layout.

Animating `width`, `height`, `top`, `left`, `margin`, or `padding` forces layout on every frame. When you need a size or position change, use **Flip** instead — it reads the before and after layout and animates the difference as a transform:

```ts
const state = Flip.getState(".item");
container.classList.toggle("grid-expanded"); // any DOM/class change
Flip.from(state, { duration: 0.5, ease: "power2.inOut", absolute: true });
```

Prefer `autoAlpha` over `opacity` when the element should also stop receiving pointer events at 0 — it manages `visibility` too.

## ScrollTrigger

```ts
gsap.to(".panel", {
  xPercent: -100,
  ease: "none",
  scrollTrigger: {
    trigger: container.current,
    start: "top top",
    end: "+=2000",
    scrub: 1,        // number = smoothing lag in seconds; `true` = 1:1
    pin: true,
    invalidateOnRefresh: true,
  },
});
```

Rules that save hours:

- **`scrub` animations use `ease: "none"`.** An ease on a scrubbed tween fights the scroll position and feels broken.
- **Call `ScrollTrigger.refresh()` after content height changes** — images loading, fonts swapping, a route transition. Positions are measured once at creation.
- **`invalidateOnRefresh: true`** when your start/end values depend on element size, so they are recomputed rather than cached.
- **`markers: true`** while developing. Delete before committing.
- **Pinning inside a scroll container** needs `scroller: <element>`. Default is the window.
- Next.js client-side navigation does not remount the page shell — `useGSAP` cleanup handles teardown, but if you see stale pins after navigating, you created a ScrollTrigger outside the `useGSAP` callback.

## SplitText

Two failure modes, both silent:

```ts
document.fonts.ready.then(() => {
  const split = SplitText.create(el, { type: "lines", mask: "lines" });
  gsap.from(split.lines, { yPercent: 110, stagger: 0.08, ease: "power4.out" });
});
```

1. **Split after fonts load.** Split before, and lines are measured against the fallback font, then re-wrap when the webfont swaps — text ends up broken mid-word.
2. **Revert on cleanup.** `split.revert()` restores the original DOM. Skip it and each re-render nests another layer of wrapper `<div>`s.

`mask: "lines"` (3.13+) wraps each line in an overflow-hidden parent, which is what makes the classic "lines slide up from behind a mask" reveal one option instead of hand-built markup. See `src/components/motion/split-headline.tsx` for the working version.

Never split text that a screen reader needs to read as prose without checking — SplitText sets `aria-label` on the container for you, but verify it survived.

## Responsive and reduced motion

`gsap.matchMedia()` scopes animations to breakpoints and reverts them automatically when the query stops matching:

```ts
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  // desktop-only scroll choreography
});

mm.add("(prefers-reduced-motion: reduce)", () => {
  gsap.set(".panel", { clearProps: "all", opacity: 1 });
});
```

Inside `useGSAP`, `matchMedia` contexts are cleaned up with everything else. Reduced motion is not optional — replace movement with an instant final state, never leave the element hidden.

## Debugging

- Animation does not run → element is not in the scope, or the selector matched nothing. `gsap.utils.toArray(".x")` and log the length.
- Animation runs twice / at half speed → StrictMode double-mount without `useGSAP` cleanup.
- Element jumps at the start → you animated `from` a state the CSS also sets. Use `fromTo` to make both ends explicit.
- ScrollTrigger fires at the wrong place → measured before layout settled. `ScrollTrigger.refresh()`.
- Flicker on first paint → set the initial hidden state in CSS (or `visibility: hidden` + `autoAlpha`), not in JS, so it applies before hydration.

---
name: motion-framer
description: Component animation with Motion (the package formerly called Framer Motion) in this app — variants, AnimatePresence exit animations, layout animation, springs, gestures, scroll-linked values, and the React Server Component boundary. Use for enter/exit transitions, list reordering, shared-layout morphs, drag, and hover/tap feedback. For scroll-driven timelines, text splitting, and multi-element choreography, use gsap-master instead.
---

# Motion for React

The package is `motion`, imported from `motion/react`. It is the current name of Framer Motion — `framer-motion` is the legacy package; do not install it alongside.

```tsx
"use client";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
```

Every file using `motion` needs `"use client"` — these are hooks and event handlers. Keep the boundary tight: wrap the animated leaf, not the page, so the rest stays a Server Component.

## Choosing Motion or GSAP

Both are installed. They solve different problems, and mixing them on the same element causes fights over the transform.

| Use Motion | Use GSAP |
| --- | --- |
| Component enters/exits with React state | Multi-element choreography with precise timing |
| List add/remove/reorder | Scroll-pinned sections, scrub-linked sequences |
| Shared-layout morph between routes or states | Character/line text reveals (SplitText) |
| Drag, hover, tap, focus gestures | FLIP across DOM restructuring |

Rule of thumb: if React state drives it, Motion. If a timeline drives it, GSAP.

## Variants, not per-element props

Inline `initial`/`animate` objects on ten children is ten places to change one value. Variants name the states once and propagate to descendants automatically:

```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="hidden" animate="visible">
  {rows.map((r) => (
    <motion.li key={r.id} variants={item} />
  ))}
</motion.ul>;
```

Children inherit the parent's *state name*, so `staggerChildren` works without any child knowing its index. A child that sets its own `animate` prop opts out of inheritance — that is the usual reason a stagger silently does nothing.

Shared tokens live in `src/lib/motion.ts` (`fadeUp`, `staggerContainer`, `transitions`). Use them so animation reads as one system rather than N one-offs, the same way you use color tokens.

## AnimatePresence

Exit animations require the element to stay mounted until the animation finishes; only `AnimatePresence` can do that.

```tsx
<AnimatePresence initial={false} mode="popLayout">
  {items.map((item) => (
    <motion.li
      key={item.id}            // stable and unique — this is load-bearing
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 24 }}
    />
  ))}
</AnimatePresence>
```

- The `key` must be stable and unique. Array index keys make exits animate the wrong element.
- `AnimatePresence` must not itself be conditionally rendered — it has to survive the removal it is animating. Put the condition on the child.
- `initial={false}` suppresses the entrance animation on first mount, so a list does not fly in on page load.
- `mode`: `"sync"` (default, overlapping), `"wait"` (finish exit before enter — right for tabs and route transitions), `"popLayout"` (removes the exiting element from layout flow immediately, so siblings close the gap — right for lists).

## Layout animation

`layout` animates any position or size change caused by a React render, using transforms rather than animating `width`/`height`:

```tsx
<motion.div layout />                    // position and size
<motion.div layout="position" />          // position only — no content squash
<motion.div layoutId="card-3" />          // morph between two mounted elements
```

`layoutId` is how you morph a grid card into a detail view: render the same `layoutId` in both places and Motion animates between them.

Two caveats:

- Layout animation distorts children as the box resizes. Give text children `layout="position"` to keep them from stretching.
- It does not compose with a CSS `transform` on the same element. Move the transform to a wrapper.

## Transitions

Prefer springs for anything the user initiated — they carry velocity and feel responsive:

```tsx
transition={{ type: "spring", stiffness: 400, damping: 32 }}
```

Higher `stiffness` = faster. Higher `damping` = less overshoot; below ~20 it bounces. `mass` above 1 feels heavy.

Use duration/ease for crossfades and non-physical properties (`opacity`, `color`), where a spring adds nothing: `{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }`.

Per-property transitions when one thing should outpace another:

```tsx
transition={{ default: { type: "spring" }, opacity: { duration: 0.15 } }}
```

## Gestures

`whileHover`, `whileTap`, `whileFocus`, `whileInView`, and `whileDrag` are declarative states — no event wiring, and they compose with variants by name.

```tsx
<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} />
```

Always pair `whileHover` with `whileFocus` or a `focus-visible` style; hover-only feedback is invisible to keyboard users. And apply gestures to real `<button>`/`<a>` elements — `motion.div` with an onClick is not accessible.

`whileInView` with `viewport={{ once: true, amount: 0.3 }}` replaces a hand-rolled IntersectionObserver. `once: true` matters: re-animating on every scroll-by is noise. `src/components/motion/reveal.tsx` wraps this.

## Scroll-linked values

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
const smooth = useSpring(y, { stiffness: 100, damping: 30 });

<motion.div style={{ y: smooth }} />;
```

MotionValues update outside React's render cycle — passing one through `style` costs no re-render. Reading it with `useMotionValueEvent` and calling `setState` reintroduces a render on every frame; do not.

For scroll work that pins sections or sequences many elements, GSAP ScrollTrigger is the better tool.

## Reduced motion

```tsx
const reduced = useReducedMotion();
<motion.div initial={reduced ? false : "hidden"} animate="visible" />;
```

`initial={false}` skips the entrance entirely and renders the final state. Do not simply shorten durations — users who set this preference are often reacting to vestibular symptoms, and fast movement is still movement. Crossfades are fine; translation and scale are not.

## Performance

- Animate `x`/`y`/`scale`/`opacity`, never `left`/`top`/`width`/`height`.
- Import from `motion/react-m` with `LazyMotion` when bundle size matters — it drops the full feature set from the initial chunk.
- Over ~50 simultaneously animating elements, reach for CSS or GSAP; per-element React overhead adds up.
- `will-change` is applied automatically during animation. Setting it permanently in CSS wastes memory.

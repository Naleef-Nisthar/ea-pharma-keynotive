import type { Transition, Variants } from "motion/react";

/**
 * Shared motion tokens. Treat these the way you treat Tailwind colour tokens:
 * animations across the app should read as one system, not as N one-offs.
 */
export const transitions = {
  /** Default for UI state changes - snappy, no overshoot. */
  snappy: { type: "spring", stiffness: 400, damping: 32 },
  /** Entrances and layout shifts - slightly softer settle. */
  smooth: { type: "spring", stiffness: 260, damping: 30 },
  /** Non-spring fallback for opacity/colour crossfades. */
  fade: { duration: 0.2, ease: [0.32, 0.72, 0, 1] },
} satisfies Record<string, Transition>;

/** Fade + rise. Pair with `staggerContainer` on the parent. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: transitions.smooth },
};

/**
 * `fadeUp`, adapted for prefers-reduced-motion.
 *
 * The `hidden` state is deliberately identical either way: it is what SSR
 * serialises into an inline style, and `useReducedMotion()` resolves to `null`
 * on the server but to the real value on the client's first render - so
 * branching on it there guarantees a hydration mismatch. Only the transition
 * changes, and that is only read after mount. Reduced motion gets a crossfade
 * with the travel removed rather than no animation at all.
 */
export const fadeUpFor = (reduced: boolean | null): Variants =>
  reduced
    ? {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { opacity: transitions.fade, y: { duration: 0 } },
        },
      }
    : fadeUp;

export const staggerContainer = (stagger = 0.06, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";

/**
 * Single registration point for GSAP plugins.
 *
 * Import `gsap` and `useGSAP` from HERE, never from "gsap" directly, so every
 * consumer gets the same registered instance. Registration is idempotent, but
 * it must not run during SSR - GSAP touches `document` on plugin init.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip, Observer);

  // Respect the OS-level reduced-motion setting globally.
  // Animations wrapped in mm.add("(prefers-reduced-motion: no-preference)")
  // are skipped automatically; everything else should be a state change, not
  // a movement.
  gsap.defaults({ ease: "power2.out", duration: 0.6 });
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, useGSAP, ScrollTrigger, SplitText, Flip, Observer };

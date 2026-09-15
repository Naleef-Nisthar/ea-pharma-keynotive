"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling.
 *
 * Three things this has to get right:
 *
 *  - `prefers-reduced-motion`: smooth scrolling is exactly the kind of
 *    hijacked motion that setting exists to switch off, so Lenis is never
 *    instantiated when it is set. Native scrolling stays.
 *  - Anchor links: Lenis owns the scroll position, so `href="#id"` jumps
 *    must be routed through it or they fight. `anchors` handles that, and
 *    the offset clears the fixed header.
 *  - `scroll` events: Lenis does not move the document scroll position the
 *    way native scrolling does, so listeners bound to `window`'s scroll
 *    event would go quiet. Lenis re-emits them, which keeps the header's
 *    scrolled state and the wave field's IntersectionObserver working.
 */
export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let raf = 0;

    const start = () => {
      if (lenis || mq.matches) return;

      lenis = new Lenis({
        // Slightly longer than default: the page is long and editorial, and
        // a fast decay makes the section rhythm feel choppy.
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Touch devices already have good native inertia; overriding it
        // makes the page feel laggy and breaks pull-to-refresh.
        syncTouch: false,
        anchors: { offset: -96 },
      });

      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      lenis?.destroy();
      lenis = null;
    };

    start();

    // Honour the setting being toggled mid-session.
    const onChange = () => {
      stop();
      start();
    };
    mq.addEventListener("change", onChange);

    return () => {
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}

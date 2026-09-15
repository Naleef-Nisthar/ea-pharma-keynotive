"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { brand, hero } from "@/content/site";
import { Container, Cta, Eyebrow, renderEmphasis } from "@/components/section";

/**
 * The hero's backdrop is the page's signature: a process trace judged against
 * a specification band.
 *
 * This is the one idea the whole business teaches — a measured value assessed
 * against a justified limit — so it opens the page rather than a decorative
 * gradient. The trace is real data shape (a bioprocess titre curve rising to
 * plateau), the dashed rules are its limits, and the shaded interval between
 * them is the acceptance range.
 *
 * It is `aria-hidden` and carries no information the copy does not state.
 */
function ProcessTrace() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 260"
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      {/* Acceptance band */}
      <rect
        x="0"
        y="92"
        width="800"
        height="76"
        className="fill-accent/[0.055]"
      />
      {/* Upper / lower specification limits */}
      <line
        x1="0"
        y1="92"
        x2="800"
        y2="92"
        className="stroke-accent/30"
        strokeWidth="1"
        strokeDasharray="5 6"
      />
      <line
        x1="0"
        y1="168"
        x2="800"
        y2="168"
        className="stroke-accent/30"
        strokeWidth="1"
        strokeDasharray="5 6"
      />
      {/* Target line */}
      <line
        x1="0"
        y1="130"
        x2="800"
        y2="130"
        className="stroke-border"
        strokeWidth="1"
      />
      {/* The measured trace: lag, exponential rise, plateau with noise. */}
      <path
        data-trace
        d="M0 232 C 60 231, 104 228, 140 220 C 178 211, 206 194, 232 172 C 256 152, 274 140, 300 132 C 322 125, 342 123, 366 126 C 388 129, 400 136, 422 134 C 446 132, 458 124, 482 126 C 506 128, 518 135, 542 132 C 566 129, 578 122, 602 125 C 628 128, 640 134, 664 131 C 688 128, 702 123, 726 126 C 750 129, 772 130, 800 128"
        fill="none"
        className="stroke-accent"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-anim]", root.current);
      const trace = root.current?.querySelector<SVGPathElement>("[data-trace]");

      if (prefersReducedMotion()) {
        // Reduced motion still needs the final state set, or .gsap-hidden
        // leaves the hero invisible.
        gsap.set(items, { autoAlpha: 1, y: 0 });
        if (trace) gsap.set(trace, { strokeDashoffset: 0 });
        return;
      }

      // Staggered entrance: semantic chunks ~100ms apart, so the sequence
      // communicates hierarchy rather than animating one container.
      if (items.length) {
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 16, filter: "blur(4px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
          },
        );
      }

      // Draw the trace left to right, as an instrument would plot it.
      if (trace) {
        const len = trace.getTotalLength();
        gsap.fromTo(
          trace,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 2.1,
            ease: "power2.inOut",
            delay: 0.25,
          },
        );
      }
    },
    { scope: root },
  );

  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32">
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[58%]">
        <ProcessTrace />
        {/* Legibility scrim: the trace is densest at the baseline, which is
            where the CTAs sit, so fade the lower half back toward the ground. */}
        <div className="from-background via-background/55 absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>

      <Container className="relative z-10">
        <div ref={root} className="max-w-3xl">
          <div data-anim className="gsap-hidden">
            <Eyebrow className="text-muted-foreground">{hero.eyebrow}</Eyebrow>
          </div>

          <h1
            data-anim
            className="gsap-hidden font-display mt-7 text-[clamp(2.35rem,1.4rem+4.2vw,4rem)] leading-[1.04] text-balance"
          >
            {renderEmphasis(hero.headline)}
          </h1>

          <p
            data-anim
            className="gsap-hidden text-muted-foreground mt-7 max-w-[62ch] text-base leading-relaxed text-pretty sm:text-lg"
          >
            {hero.body}
          </p>

          <div
            data-anim
            className="gsap-hidden mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Cta href={brand.links.programmes}>{hero.primaryCta}</Cta>
            <Cta href={hero.secondaryHref} tone="outline">
              {hero.secondaryCta}
            </Cta>
          </div>

          <div
            data-anim
            className="gsap-hidden border-border/70 mt-14 max-w-xl border-t pt-6"
          >
            <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
              {hero.footnote}
            </p>
            <p className="text-muted-foreground mt-3 font-mono text-[0.68rem] tracking-[0.14em] uppercase">
              Operated by{" "}
              <Link
                href={brand.links.operator}
                target="_blank"
                rel="noopener noreferrer"
                className="decoration-accent/50 hover:text-accent-text text-foreground underline underline-offset-4 transition-colors duration-150 ease-out"
              >
                {brand.operator}
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

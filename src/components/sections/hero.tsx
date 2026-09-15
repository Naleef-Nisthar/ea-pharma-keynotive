"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import {
  brand,
  hero,
  lifecycle,
  pillars,
  programmes,
} from "@/content/site";
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
        {/* Asymmetric split: the headline holds seven columns and the spec
            readout four, with a gutter between. A single centred or
            full-width column is what every templated hero does; an off-centre
            measure with a data panel beside it is what an instrument readout
            looks like, which is the subject. */}
        <div
          ref={root}
          className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16"
        >
          <div className="lg:col-span-7">
            <div data-anim className="gsap-hidden">
              <Eyebrow className="text-muted-foreground">{hero.eyebrow}</Eyebrow>
            </div>

            <h1
              data-anim
              className="gsap-hidden font-display mt-7 text-[clamp(2.35rem,1.3rem+4.6vw,4.25rem)] leading-[1.02] text-balance"
            >
              {renderEmphasis(hero.headline)}
            </h1>

            <p
              data-anim
              className="gsap-hidden text-muted-foreground mt-7 max-w-[58ch] text-base leading-relaxed text-pretty sm:text-lg"
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
          </div>

          {/* Scope readout. Not invented data — it counts what is actually on
              the page, so the figures stay true if the content changes. */}
          <div
            data-anim
            className="gsap-hidden border-border lg:col-span-5 lg:border-l lg:pl-10"
          >
            <dl className="grid grid-cols-3 gap-6 lg:grid-cols-1 lg:gap-0">
              {[
                { v: pillars.items.length, k: "Training areas" },
                { v: programmes.items.length, k: "Masterclasses" },
                { v: lifecycle.items.length, k: "Lifecycle stages" },
              ].map((s, i) => (
                <div
                  key={s.k}
                  className={
                    i > 0
                      ? "border-border lg:mt-5 lg:border-t lg:pt-5"
                      : undefined
                  }
                >
                  <dt className="text-muted-foreground/70 font-mono text-[0.6rem] tracking-[0.16em] uppercase">
                    {s.k}
                  </dt>
                  <dd className="font-display mt-1.5 text-[2rem] leading-none tabular-nums">
                    {String(s.v).padStart(2, "0")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

        </div>

        {/* Runs the full measure beneath both columns, closing the hero. */}
        <div
          data-anim
          className="gsap-hidden border-border/70 mt-14 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-muted-foreground max-w-[58ch] text-sm leading-relaxed text-pretty">
            {hero.footnote}
          </p>
          <p className="text-muted-foreground shrink-0 font-mono text-[0.68rem] tracking-[0.14em] uppercase">
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
      </Container>
    </section>
  );
}

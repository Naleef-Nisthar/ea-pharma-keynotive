"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HelpCircle } from "lucide-react";
import { lifecycle } from "@/content/site";
import {
  Chip,
  Container,
  Eyebrow,
  Headline,
  Lede,
  Section,
} from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * The lifecycle stepper — the page's one interactive centrepiece.
 *
 * Nine stages drawn as a measurement scale rather than a row of cards: each
 * stage is a tick on an axis, echoing the hero's specification band. The
 * numbering is real information here (the lifecycle IS a sequence), which is
 * the test a numbered treatment has to pass before it earns its place.
 *
 * The stage list is a tablist: one panel visible at a time, arrow keys move
 * between tabs. Radix would work, but the visual treatment is a custom axis,
 * so the roving-tabindex is hand-wired — it is small and fully specified.
 */
export function Lifecycle() {
  const [active, setActive] = useState<string>(lifecycle.defaultStage);
  const reduced = useReducedMotion();

  const index = lifecycle.items.findIndex((s) => s.id === active);
  const stage = lifecycle.items[index] ?? lifecycle.items[0];

  /**
   * Arrow keys move between stages, per the tablist pattern.
   *
   * Left/Right only — this axis is horizontal. Binding Up/Down here would
   * swallow the keypress via preventDefault and leave a keyboard user unable
   * to scroll the page while focus rests on a stage tab.
   */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = lifecycle.items.length - 1;
    let next: number | null = null;

    if (e.key === "ArrowRight") next = index + 1 > last ? 0 : index + 1;
    if (e.key === "ArrowLeft") next = index - 1 < 0 ? last : index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;

    if (next === null) return;
    e.preventDefault();
    const target = lifecycle.items[next];
    setActive(target.id);
    document.getElementById(`stage-tab-${target.id}`)?.focus();
  };

  return (
    <Section id={lifecycle.id} tone="muted" size="lg">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-muted-foreground">
            {lifecycle.eyebrow}
          </Eyebrow>
          <Headline text={lifecycle.title} className="mt-6" />
          <Lede className="mt-6">{lifecycle.body}</Lede>
        </Reveal>

        {/* ── The axis ──────────────────────────────────────────────────────
            Horizontally scrollable on small screens rather than wrapping: the
            stages are a sequence, and wrapping them into rows breaks the
            reading of that sequence. */}
        <Reveal className="mt-14">
          <div
            role="tablist"
            aria-label={lifecycle.eyebrow}
            onKeyDown={onKeyDown}
            className="border-border flex overflow-x-auto border-t [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {lifecycle.items.map((s, i) => {
              const on = s.id === active;
              return (
                <button
                  key={s.id}
                  id={`stage-tab-${s.id}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="stage-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "group relative flex min-w-[8.5rem] flex-1 flex-col items-start gap-2 px-3 pt-4 pb-5 text-left",
                    "[transition-property:color,background-color] duration-150 ease-out",
                    on
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {/* Tick mark: the active stage's tick is full height and
                      accent, the rest are hairline stubs. */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-0 left-0 w-px [transition-property:height,background-color] duration-200 ease-out",
                      on ? "bg-accent h-4" : "bg-border h-2",
                    )}
                  />
                  <span
                    className={cn(
                      "font-mono text-[0.68rem] tracking-[0.16em]",
                      on ? "text-accent-text" : "text-muted-foreground/60",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-[0.8125rem] leading-tight",
                      on && "font-medium",
                    )}
                  >
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── The panel ─────────────────────────────────────────────────── */}
        <Reveal className="mt-10">
          <div
            id="stage-panel"
            role="tabpanel"
            aria-labelledby={`stage-tab-${stage.id}`}
            tabIndex={0}
            className="border-border bg-card border p-7 sm:p-9"
          >
            {/* mode="wait" so the outgoing panel clears before the next
                arrives — a crossfade here would overlap two blocks of text. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={stage.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                className="grid gap-10 lg:grid-cols-12"
              >
                <div className="lg:col-span-6">
                  <p className="text-muted-foreground font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                    Stage {String(index + 1).padStart(2, "0")} of{" "}
                    {String(lifecycle.items.length).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-4 text-2xl leading-tight">
                    {stage.name}
                  </h3>
                  <p className="text-muted-foreground mt-4 text-[0.9375rem] leading-relaxed">
                    {stage.summary}
                  </p>

                  <div className="mt-8">
                    <p className="text-muted-foreground/70 font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                      {lifecycle.disciplinesLabel}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {stage.disciplines.map((d) => (
                        <Chip key={d}>{d}</Chip>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/60 border-border lg:col-span-6 lg:border-l lg:pl-9">
                  <p className="text-muted-foreground flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                    <HelpCircle aria-hidden className="size-3.5" />
                    {lifecycle.questionsLabel}
                  </p>
                  <ul className="mt-5 space-y-4">
                    {stage.questions.map((q) => (
                      <li
                        key={q}
                        className="border-accent/40 border-l-2 pl-4 text-[0.9375rem] leading-relaxed"
                      >
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            {lifecycle.footnote}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

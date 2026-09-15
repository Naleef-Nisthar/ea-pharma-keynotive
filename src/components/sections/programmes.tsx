"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog } from "radix-ui";
import { ArrowUpRight, Check, X } from "lucide-react";
import { brand, programmes } from "@/content/site";
import {
  ArrowLink,
  Chip,
  Container,
  Eyebrow,
  Headline,
  Lede,
  Section,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type Programme = (typeof programmes.items)[number];

/**
 * Filterable programme catalogue.
 *
 * The filter is client state, so this file is a client component — but it is a
 * leaf: everything above it on the page stays a Server Component.
 *
 * Details open in a Radix Dialog rather than a hand-rolled overlay, which
 * gives focus trapping, focus return to the trigger, Escape-to-close and the
 * correct aria wiring for free. The previous implementation hand-rolled all
 * four and got focus return wrong.
 */
export function Programmes() {
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<Programme | null>(null);

  const visible =
    filter === "all"
      ? programmes.items
      : programmes.items.filter((p) => p.pillarId === filter);

  return (
    <Section id={programmes.id}>
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow className="text-muted-foreground">
              {programmes.eyebrow}
            </Eyebrow>
            <Headline text={programmes.title} className="mt-6" />
            <Lede className="mt-6">{programmes.body}</Lede>
          </div>
          <ArrowLink
            href={brand.links.programmes}
            className="shrink-0 whitespace-nowrap"
          >
            {programmes.directoryCta}
          </ArrowLink>
        </Reveal>

        <div className="mt-12">
          <p className="text-muted-foreground/70 font-mono text-[0.62rem] tracking-[0.16em] uppercase">
            {programmes.filterLabel}
          </p>
          {/* A toolbar of toggles, deliberately not role="radiogroup": that
              role promises one Tab stop plus arrow-key selection, and these are
              independent Tab stops. `aria-pressed` describes what they actually
              are. */}
          <div
            role="group"
            aria-label={programmes.filterLabel}
            className="mt-4 flex flex-wrap gap-2"
          >
            {programmes.filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "inline-flex min-h-9 items-center rounded-sm border px-3 text-[0.8125rem]",
                    "[transition-property:background-color,border-color,color,scale] duration-150 ease-out",
                    "active:scale-[0.96]",
                    active
                      ? "border-accent bg-accent text-accent-foreground font-medium"
                      : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground",
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtering changes the grid silently for a screen-reader user;
            this announces the new count. */}
        <p role="status" aria-live="polite" className="sr-only">
          {visible.length} of {programmes.items.length} programmes shown
        </p>

        {visible.length === 0 ? (
          <div className="border-border mt-12 border border-dashed p-12 text-center">
            <p className="text-muted-foreground text-sm">
              {programmes.labels.empty}
            </p>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="text-accent-text mt-4 inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4"
            >
              {programmes.labels.reset}
            </button>
          </div>
        ) : (
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <Reveal key={item.id} className="h-full">
                <article className="border-border bg-card hover:border-accent/40 flex h-full flex-col border p-7 [transition-property:border-color] duration-150 ease-out">
                  <p className="text-accent-text font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                    {item.category}
                  </p>

                  <h3 className="font-display mt-4 text-lg leading-tight text-balance">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                    {item.body}
                  </p>

                  {"trainerName" in item && item.trainerName && (
                    <p className="text-muted-foreground mt-5 font-mono text-[0.62rem] tracking-[0.14em]">
                      {item.trainerName}
                    </p>
                  )}

                  <div className="mt-6 flex-1">
                    <ul className="flex flex-wrap gap-1.5">
                      {item.topics.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </ul>
                  </div>

                  <div className="border-border mt-8 border-t pt-4">
                    <button
                      type="button"
                      onClick={() => setOpen(item)}
                      className="group hover:text-accent-text inline-flex min-h-11 items-center gap-2 text-sm font-medium transition-colors duration-150 ease-out"
                    >
                      {programmes.labels.details}
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        )}
      </Container>

      <ProgrammeDialog
        programme={open}
        onOpenChange={(v) => !v && setOpen(null)}
      />
    </Section>
  );
}

function ProgrammeDialog({
  programme,
  onOpenChange,
}: {
  programme: Programme | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={programme !== null} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/55 backdrop-blur-[2px]" />
        <Dialog.Content
          className={cn(
            "bg-card fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2",
            "border-border max-h-[88svh] overflow-y-auto rounded-sm border p-7 sm:p-9",
            // Modals stay centre-origin — they are not anchored to a trigger.
            // The scale is neutralised under prefers-reduced-motion by a rule
            // in globals.css; the opacity crossfade survives, so the state
            // change keeps a visible cue.
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "duration-200",
          )}
        >
          {programme && (
            <>
              <div className="flex items-start justify-between gap-6">
                <p className="text-accent-text font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                  {programme.category}
                </p>
                <Dialog.Close
                  aria-label="Close programme details"
                  className="hover:text-accent-text -mt-2 -mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-sm transition-colors duration-150 ease-out"
                >
                  <X aria-hidden className="size-5" />
                </Dialog.Close>
              </div>

              <Dialog.Title className="font-display mt-4 text-2xl leading-tight text-balance">
                {programme.title}
              </Dialog.Title>

              <Dialog.Description className="text-muted-foreground mt-4 text-sm leading-relaxed">
                {programme.body}
              </Dialog.Description>

              {"trainerName" in programme && programme.trainerName && (
                <div className="border-border mt-6 border-y py-4">
                  <p className="text-sm font-medium">{programme.trainerName}</p>
                  <p className="text-muted-foreground mt-1 text-[0.8125rem]">
                    {programme.trainerRole}
                  </p>
                </div>
              )}

              <Field label={programmes.labels.overview}>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {programme.overview}
                </p>
              </Field>

              <Field label={programmes.labels.takeaways}>
                <ul className="space-y-2.5">
                  {programme.takeaways.map((t) => (
                    <li key={t} className="flex gap-2.5 text-sm leading-relaxed">
                      <Check
                        aria-hidden
                        className="text-accent-text mt-0.5 size-4 shrink-0"
                      />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </Field>

              <Field label={programmes.labels.attend}>
                <ul className="flex flex-wrap gap-1.5">
                  {programme.attend.map((a) => (
                    <Chip key={a}>{a}</Chip>
                  ))}
                </ul>
              </Field>

              <Field label={programmes.labels.topics}>
                <ul className="flex flex-wrap gap-1.5">
                  {programme.topics.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </ul>
              </Field>

              <div className="border-border mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-muted-foreground text-[0.8125rem]">
                  {programmes.labels.hosted}
                </p>
                <Link
                  href={programme.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-sm ps-6 pe-5 text-sm font-medium [transition-property:background-color,scale] duration-150 ease-out active:scale-[0.96]"
                >
                  {programmes.labels.register}
                  <ArrowUpRight aria-hidden className="size-4" />
                </Link>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7">
      <p className="text-muted-foreground/70 font-mono text-[0.62rem] tracking-[0.16em] uppercase">
        {label}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

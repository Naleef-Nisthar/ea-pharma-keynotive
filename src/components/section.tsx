import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Shell ──────────────────────────────────────────────────────────────── */

/**
 * `size` gives the page chapters.
 *
 * A single padding value across every section makes one continuous scroll with
 * no shape — the reader gets no signal about which sections carry the argument
 * and which connect it. `lg` marks the structural pivots, `sm` the connective
 * tissue, `default` everything else.
 */
export function Section({
  className,
  tone = "default",
  size = "default",
  children,
  ...props
}: ComponentProps<"section"> & {
  tone?: "default" | "muted" | "ink";
  size?: "sm" | "default" | "lg";
}) {
  return (
    <section
      className={cn(
        "relative",
        size === "sm" && "py-14 sm:py-20",
        size === "default" && "py-20 sm:py-28",
        size === "lg" && "py-28 sm:py-40",
        tone === "muted" && "bg-muted",
        tone === "ink" && "bg-ink text-ink-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}
      {...props}
    />
  );
}

/* ── Eyebrow ────────────────────────────────────────────────────────────────
   Mono, uppercase, preceded by a short accent rule. The rule is not
   decoration: it is the left limit mark of the spec band, marking where a new
   part of the argument begins. */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[0.68rem] tracking-[0.18em] uppercase",
        className,
      )}
    >
      <span aria-hidden className="bg-accent h-px w-6 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

/* ── Specification band ─────────────────────────────────────────────────────
   The site's signature divider. See the `.spec-band` comment in globals.css
   for why a tolerance interval is the right motif for this subject. */

export function SpecBand({ className }: { className?: string }) {
  return <div aria-hidden className={cn("spec-band w-full", className)} />;
}

/* ── Headline ───────────────────────────────────────────────────────────────
   Renders {braced} spans in the accent colour, so content authors can
   emphasise a word from site.ts without touching a component. */

export function Headline({
  text,
  className,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-display text-balance",
        // Deliberately well below the hero. The h1 tops out at 76px; holding
        // section headlines to 36px keeps the ratio near 4.5x across
        // h1 -> h2 -> body, so the page has one entry point rather than
        // seventeen competing ones.
        "text-[clamp(1.6rem,1.05rem+2.1vw,2.25rem)] leading-[1.14]",
        className,
      )}
    >
      {renderEmphasis(text)}
    </Tag>
  );
}

/** Splits on {…} and newlines. `{x}` → accent span, `\n` → line break. */
export function renderEmphasis(text: string) {
  return text.split("\n").map((line, li) => (
    <span key={li} className="block">
      {line.split(/(\{[^}]+\})/g).map((part, i) =>
        part.startsWith("{") && part.endsWith("}") ? (
          <em key={i} className="text-accent-text not-italic">
            {part.slice(1, -1)}
          </em>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  ));
}

/* ── Lede ───────────────────────────────────────────────────────────────────
   Standard body paragraph under a Headline. Measure capped near 70ch. */

export function Lede({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-muted-foreground max-w-[65ch] text-base leading-relaxed text-pretty sm:text-[1.0625rem]",
        className,
      )}
    >
      {children}
    </p>
  );
}

/* ── Links & buttons ────────────────────────────────────────────────────────
   Hand-rolled rather than shadcn's Button: this design wants a squared-off,
   wide-tracking treatment the default variants don't express. All keep a
   >=44px touch target.

   Press feedback is scale(0.96) at 150ms ease-out on named properties only -
   the exact values the better-ui reference prescribes. `static` opts out where
   the motion would distract. */

const TAP_SCALE = "active:not-disabled:scale-[0.96]";

type CtaProps = {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "accent" | "ink" | "outline" | "inverted";
  /** Suppress the press-scale where motion would distract. */
  static?: boolean;
};

export function Cta({
  href,
  children,
  className,
  tone = "accent",
  static: isStatic,
}: CtaProps) {
  const external = href.startsWith("http");

  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-sm",
        // Optical alignment: the trailing arrow makes symmetric padding look
        // right-heavy, so the icon side loses 2px.
        "ps-6 pe-5 py-3",
        "text-sm font-medium tracking-tight",
        "[transition-property:background-color,border-color,color,scale] duration-150 ease-out",
        !isStatic && TAP_SCALE,
        tone === "accent" &&
          "bg-accent text-accent-foreground hover:bg-accent/90",
        tone === "ink" && "bg-ink text-ink-foreground hover:bg-ink/90",
        tone === "outline" &&
          "border-border hover:border-accent hover:text-accent-text border",
        tone === "inverted" &&
          "bg-ink-foreground text-ink hover:bg-ink-foreground/90",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
      />
    </Link>
  );
}

/** Quiet text link with a moving arrow. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 text-sm font-medium",
        "hover:text-accent-text transition-colors duration-150 ease-out",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
      />
    </Link>
  );
}

/* ── Chip ───────────────────────────────────────────────────────────────────
   Topic / role tag. Squared, hairline, never filled - filled chips at this
   density would compete with the accent for attention. */

export function Chip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "border-border text-muted-foreground rounded-sm border px-2.5 py-1 text-[0.7rem] leading-none",
        className,
      )}
    >
      {children}
    </li>
  );
}

/* ── Index ──────────────────────────────────────────────────────────────────
   Zero-padded ordinal. Only use where the sequence is real information. */

export function Index({
  n,
  className,
}: {
  n: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-muted-foreground/60 font-mono text-[0.68rem] tracking-[0.16em]",
        className,
      )}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

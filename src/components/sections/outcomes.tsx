import { outcomes } from "@/content/site";
import {
  Container,
  Headline,
  Lede,
  Section,
  SectionMarker,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * Professional outcomes — the page's inverted band.
 *
 * Six statements, set as statements. Every other section on the page carries
 * its titles at body size inside some kind of container; here the title is the
 * content and the body is the gloss, so the type does the structuring and there
 * is no container at all. No borders, no boxes, no icons — on ink a border per
 * item reads as six trapped panels, and the dark ground stays continuous when
 * nothing is drawn on it.
 *
 * Separation comes from the row gap alone, which is deliberately larger than
 * the column gap: that difference is what tells the eye to read down each
 * column rather than across the pair.
 *
 * The ordinal sits inline ahead of the title rather than stacked above it, so
 * the six titles keep a single left edge and the sequence stays legible at a
 * glance.
 */
export function Outcomes() {
  return (
    <Section tone="ink">
      <Container>
        <Reveal>
          {/* `border-border` and `text-muted-foreground` are tuned for the
              light page and all but vanish on ink, so the marker is switched
              to its ink tone. */}
          <SectionMarker
            n={5}
            label={outcomes.eyebrow}
            tone="ink"
            className="border-ink-foreground/20"
          />
          <div className="mt-10 max-w-2xl">
            <Headline text={outcomes.title} />
            <Lede className="text-ink-foreground/70 mt-6">{outcomes.body}</Lede>
          </div>
        </Reveal>

        <RevealGroup className="mt-20 grid gap-x-16 gap-y-14 sm:grid-cols-2">
          {outcomes.items.map((item, i) => (
            <Reveal key={item.title}>
              <article>
                <h3 className="font-display text-[1.5rem] leading-[1.18] text-balance">
                  <span
                    aria-hidden
                    className="text-ink-foreground/40 me-3 align-[0.22em] font-mono text-[0.68rem] tracking-[0.16em]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </h3>
                <p className="text-ink-foreground/70 mt-4 max-w-[46ch] text-sm leading-relaxed text-pretty">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

import { outcomes } from "@/content/site";
import {
  Container,
  Eyebrow,
  Headline,
  Index,
  Lede,
  Section,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * Professional outcomes — the page's inverted band.
 *
 * No icons: the surrounding sections already carry a glyph per card, and a
 * third icon grid would turn a real distinction into wallpaper. The ordinal
 * carries the same wayfinding job with none of the noise, and here the sequence
 * is a genuine list of six, so `Index` is honest.
 *
 * Items are separated by top hairlines rather than boxed: on ink, a full border
 * per card reads as six trapped panels, while a single rule above each item
 * lets the dark ground stay continuous. Hairlines are `ink-foreground/15` —
 * `border-border` is tuned for the light ground and disappears here.
 */
export function Outcomes() {
  return (
    <Section tone="ink">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow className="text-ink-foreground/60">
              {outcomes.eyebrow}
            </Eyebrow>
            <Headline text={outcomes.title} className="mt-5" />
            <Lede className="text-ink-foreground/70 mt-6">{outcomes.body}</Lede>
          </div>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.items.map((item, i) => (
            <Reveal key={item.title}>
              <article className="border-ink-foreground/15 h-full border-t pt-5">
                <Index
                  n={i + 1}
                  className="text-ink-foreground/45"
                />
                <h3 className="mt-4 text-card-title font-semibold tracking-[-0.011em]">
                  {item.title}
                </h3>
                <p className="text-ink-foreground/70 mt-3 text-sm leading-relaxed text-pretty">
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

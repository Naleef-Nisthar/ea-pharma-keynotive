import { bioprocess, brand } from "@/content/site";
import {
  Container,
  Cta,
  Eyebrow,
  Headline,
  Index,
  Lede,
  Section,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * Digital bioprocessing.
 *
 * The six items are a progression — understand, then improve the data, then
 * model, then evaluate, then control, then govern — so they are indexed. The
 * ordinal is real information here, which is the only condition under which
 * `Index` should appear.
 *
 * The callout below the grid is the section's qualifier, not a seventh item:
 * full width, and set apart by a larger gap than the one between cards.
 */
export function Bioprocess() {
  return (
    <Section id={bioprocess.id} tone="muted">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow className="text-muted-foreground">
              {bioprocess.eyebrow}
            </Eyebrow>
            <Headline text={bioprocess.title} className="mt-5" />
            <Lede className="mt-6">{bioprocess.body}</Lede>
          </div>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {bioprocess.items.map((item, i) => (
            <Reveal key={item.title} className="h-full">
              <article className="border-border bg-background flex h-full flex-col rounded-sm border p-6">
                {/* The index and metric label carry this card's identity; a
                    decorative glyph alongside them is the third marker for one
                    idea. */}
                <div className="flex flex-col gap-2">
                  <Index n={i + 1} />
                  <p className="text-accent-text font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                    {item.metric}
                  </p>
                </div>

                <h3 className="mt-5 text-card-title font-semibold tracking-[-0.011em] text-balance">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed text-pretty">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal>
          <div className="border-border bg-background mt-8 flex flex-col gap-6 rounded-sm border p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="max-w-[52ch]">
              <h3 className="font-display text-panel-title tracking-tight text-balance">
                {bioprocess.callout.title}
              </h3>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed text-pretty sm:text-base">
                {bioprocess.callout.body}
              </p>
            </div>

            <div className="shrink-0">
              <Cta href={brand.links.programmes}>{bioprocess.callout.cta}</Cta>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

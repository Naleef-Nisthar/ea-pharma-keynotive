import { insights } from "@/content/site";
import {
  Container,
  Eyebrow,
  Headline,
  Lede,
  Section,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * Insights.
 *
 * Nothing here is published yet, so nothing here is a link. The cards are
 * announcements, and they are styled to say so: no hover state, no pointer
 * cursor, no arrow, and the whole card sits a step back in contrast from the
 * page's other card grids. The status badge is dashed — a border that reads as
 * provisional rather than as a button someone failed to wire up.
 *
 * The temptation is to make these look clickable "for consistency". That would
 * be a promise the site cannot keep, and a dead click costs more trust than a
 * quiet card does attention.
 */
export function Insights() {
  return (
    <Section id={insights.id} size="sm">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow className="text-muted-foreground">
              {insights.eyebrow}
            </Eyebrow>
            <Headline text={insights.title} className="mt-5" />
            <Lede className="mt-6">{insights.body}</Lede>
          </div>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {insights.items.map((item) => (
            <Reveal key={item.id} className="h-full">
              <article className="border-border bg-muted/40 flex h-full flex-col rounded-sm border p-6">
                <p className="text-muted-foreground font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                  {item.category}
                </p>

                <p className="mt-4">
                  <span className="border-border/80 text-muted-foreground inline-block rounded-sm border border-dashed px-2 py-1 font-mono text-[0.6rem] tracking-[0.14em] uppercase">
                    {item.status}
                  </span>
                </p>

                <h3 className="text-foreground mt-5 text-[0.9375rem] leading-snug font-semibold tracking-[-0.011em] text-balance">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed text-pretty">
                  {item.summary}
                </p>

                <p className="border-border/70 text-muted-foreground/80 mt-auto border-t pt-4 text-xs">
                  {/* Pushed to the card foot by mt-auto so the label lines up
                      across cards of unequal summary length. */}
                  {insights.pendingLabel}
                </p>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

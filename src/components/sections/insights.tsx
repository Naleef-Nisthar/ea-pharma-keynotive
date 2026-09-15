import { insights } from "@/content/site";
import {
  Container,
  Headline,
  Lede,
  Section,
  SectionMarker,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * Insights — a contents page for work that has not been published yet.
 *
 * Nothing here is a link, so nothing here is a card. Four boxes in a row invite
 * a click the site cannot honour; stacked rules read as a forthcoming contents
 * list, which is what this is. There is no hover state, no pointer cursor, no
 * arrow and no lift, deliberately: a dead click costs more trust than a quiet
 * row costs attention. The status badge keeps its dashed border — provisional,
 * rather than a button someone failed to wire up.
 *
 * Set on the narrow measure. With no grid to fill, the column can drop to
 * reading width and the summaries stop wrapping every four words.
 */
export function Insights() {
  return (
    <Section id={insights.id} size="sm">
      <Container width="narrow">
        <Reveal>
          <SectionMarker n={8} label={insights.eyebrow} />
          <div className="mt-10">
            <Headline text={insights.title} />
            <Lede className="mt-6">{insights.body}</Lede>
          </div>
        </Reveal>

        <RevealGroup className="border-border mt-14 border-b">
          {insights.items.map((item) => (
            <Reveal key={item.id}>
              <article className="border-border grid gap-3 border-t py-7 sm:grid-cols-[minmax(0,0.6fr)_minmax(0,1.9fr)] sm:gap-8">
                <div className="flex flex-col items-start gap-3">
                  <p className="text-muted-foreground font-mono text-[0.62rem] leading-none tracking-[0.16em] uppercase">
                    {item.category}
                  </p>
                  <span className="border-border/80 text-muted-foreground inline-block rounded-sm border border-dashed px-2 py-1 font-mono text-[0.6rem] leading-none tracking-[0.14em] uppercase">
                    {item.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-[0.9375rem] leading-snug font-semibold tracking-[-0.011em] text-balance sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed text-pretty">
                    {item.summary}
                  </p>
                  <p className="text-muted-foreground/80 mt-4 text-xs">
                    {insights.pendingLabel}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

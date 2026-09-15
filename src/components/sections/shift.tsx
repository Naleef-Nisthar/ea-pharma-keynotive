import { shift } from "@/content/site";
import {
  Container,
  Headline,
  Lede,
  Section,
  SectionMarker,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * What is changing, per discipline.
 *
 * This content is a two-column comparison across six rows, so it is built as
 * one — not as six cards that each repeat the same pair of labels. A table
 * states the comparison once in its header and lets the reader scan a single
 * column to see where the whole field is heading, which is the actual point of
 * the section.
 *
 * It degrades to stacked rows below `md`, where two columns of prose would be
 * too narrow to compare anyway.
 */
export function Shift() {
  return (
    <Section id={shift.id}>
      <Container>
        <Reveal>
          <SectionMarker n={1} label={shift.eyebrow} />
          <div className="mt-10 max-w-3xl">
            <Headline text={shift.title} />
            <Lede className="mt-6">{shift.body}</Lede>
          </div>
        </Reveal>

        {/* Column header. Sticky so the from/to framing stays visible while
            the reader scans down six rows of comparison. */}
        <Reveal className="mt-16">
          <div className="bg-background border-border sticky top-16 z-10 hidden border-b pb-3 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1.15fr)] md:gap-8">
            <span className="text-muted-foreground/70 font-mono text-[0.62rem] tracking-[0.16em] uppercase">
              Discipline
            </span>
            <span className="text-muted-foreground/70 font-mono text-[0.62rem] tracking-[0.16em] uppercase">
              {shift.fromLabel}
            </span>
            <span className="text-accent-text font-mono text-[0.62rem] tracking-[0.16em] uppercase">
              {shift.toLabel}
            </span>
          </div>
        </Reveal>

        <RevealGroup className="border-border border-b">
          {shift.items.map((item) => (
            <Reveal key={item.title}>
              <article className="border-border grid gap-4 border-t py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1.15fr)] md:gap-8">
                <h3 className="text-card-title font-semibold tracking-[-0.011em]">
                  {item.title}
                </h3>

                <div>
                  {/* Labels repeat only on small screens, where the column
                      header is hidden and the pairing would otherwise be
                      ambiguous. */}
                  <p className="text-muted-foreground/70 font-mono text-[0.6rem] tracking-[0.16em] uppercase md:hidden">
                    {shift.fromLabel}
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty md:mt-0">
                    {item.from}
                  </p>
                </div>

                <div className="border-accent border-l pl-4 md:border-l-0 md:pl-0">
                  <p className="text-accent-text font-mono text-[0.6rem] tracking-[0.16em] uppercase md:hidden">
                    {shift.toLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed font-medium text-pretty md:mt-0">
                    {item.to}
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

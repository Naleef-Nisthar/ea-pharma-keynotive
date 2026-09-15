import { shift } from "@/content/site";
import { Container, Eyebrow, Headline, Lede, Section } from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * What is changing, per discipline.
 *
 * Each card is a two-state comparison, and the comparison only works if the
 * two states are not given equal weight: the baseline is set in muted text at
 * body weight, the current direction in foreground text with a short accent
 * rule down its left edge. Same type size for both — the emphasis comes from
 * colour, weight and the rule, not from scale, so the reader can still compare
 * the two claims line for line.
 *
 * The accent appears twice per card (icon, direction rule) at hairline weight,
 * which keeps it well under the surface budget across a six-card grid.
 */
export function Shift() {
  return (
    <Section id={shift.id}>
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow className="text-muted-foreground">{shift.eyebrow}</Eyebrow>
            <Headline text={shift.title} className="mt-5" />
            <Lede className="mt-6">{shift.body}</Lede>
          </div>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shift.items.map((item) => (
            <Reveal key={item.title}>
              {/* No icon here. The from/to rule below already marks the card,
                  and a glyph per item across six items adds nothing the title
                  does not say. */}
              <article className="border-border flex h-full flex-col rounded-sm border p-6">
                <h3 className="text-card-title font-semibold tracking-[-0.011em]">
                  {item.title}
                </h3>

                {/* Baseline → direction. The gap between the two rows is wider
                    than the gap inside either one, so they read as two states
                    rather than four stacked lines. */}
                <div className="mt-6 flex flex-col gap-6">
                  <div>
                    <p className="text-muted-foreground/70 font-mono text-[0.6rem] tracking-[0.16em] uppercase">
                      {shift.fromLabel}
                    </p>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty">
                      {item.from}
                    </p>
                  </div>

                  <div className="border-accent border-l pl-4">
                    <p className="text-accent-text font-mono text-[0.6rem] tracking-[0.16em] uppercase">
                      {shift.toLabel}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed font-medium text-pretty">
                      {item.to}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

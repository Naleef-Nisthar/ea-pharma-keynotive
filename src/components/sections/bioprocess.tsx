import { bioprocess, brand } from "@/content/site";
import {
  Container,
  Cta,
  Headline,
  Index,
  Lede,
  Section,
  SectionMarker,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * Digital bioprocessing, as a process flow.
 *
 * The six items are one sequence — understand, improve the data, model,
 * evaluate, control, govern — and a card grid says nothing about order. So the
 * steps are hung off a single hairline that runs through all of them: each step
 * sits under a shared rule with its ordinal breaking that rule, which is what
 * makes the row read as a flow rather than as six boxes that happen to be
 * numbered. The ordinal is real information here, the only condition under
 * which `Index` should appear.
 *
 * The rule is drawn per-step as a top border rather than as one absolutely
 * positioned line, so it reflows correctly when the grid wraps from six columns
 * to three to one.
 *
 * The callout is the section's qualifier, not a seventh step. It inverts and
 * bleeds to the viewport edges so it reads as a band closing the sequence
 * rather than as another panel in it.
 */
export function Bioprocess() {
  return (
    <Section id={bioprocess.id} tone="muted">
      <Container width="wide">
        <Reveal>
          <SectionMarker n={3} label={bioprocess.eyebrow} />
          <div className="mt-10 max-w-3xl">
            <Headline text={bioprocess.title} />
            <Lede className="mt-6">{bioprocess.body}</Lede>
          </div>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {bioprocess.items.map((item, i) => (
            <Reveal key={item.title} className="h-full">
              <article className="flex h-full flex-col">
                {/* The metric is the step's kicker; it sits above the rule so
                    the rule itself stays unbroken except by the ordinal. */}
                <p className="text-accent-text font-mono text-[0.62rem] leading-none tracking-[0.16em] uppercase">
                  {item.metric}
                </p>

                {/* The shared hairline. The ordinal is pulled up onto it with a
                    matching ground behind it, so the line reads as running
                    through the sequence and being interrupted at each step. */}
                <div className="border-border relative mt-5 border-t pt-6">
                  <span className="bg-muted absolute -top-[0.62rem] left-0 pr-2.5">
                    <Index n={i + 1} />
                  </span>

                  <h3 className="text-card-title font-semibold tracking-[-0.011em] text-balance">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed text-pretty">
                    {item.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal>
          <div className="bg-ink text-ink-foreground -mx-5 mt-20 px-5 py-10 sm:-mx-8 sm:px-8 sm:py-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
              <div className="max-w-[52ch]">
                <h3 className="font-display text-panel-title tracking-tight text-balance">
                  {bioprocess.callout.title}
                </h3>
                <p className="text-ink-foreground/70 mt-4 text-sm leading-relaxed text-pretty sm:text-base">
                  {bioprocess.callout.body}
                </p>
              </div>

              <div className="shrink-0">
                <Cta href={brand.links.programmes} tone="inverted">
                  {bioprocess.callout.cta}
                </Cta>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

import { argument, brand } from "@/content/site";
import { Icon } from "@/components/icon";
import {
  Container,
  Cta,
  Eyebrow,
  Headline,
  Section,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * Science into practice.
 *
 * The section's whole claim is a comparison — what the guidance says against
 * what a team actually has to decide — so the layout states it as one: the
 * argument on the left, the two positions racked against each other on the
 * right. The second panel is the one being argued for, so it carries the
 * accent ground and the footnote; the first is deliberately quieter. Any
 * other weighting would make the comparison read as neutral, which it is not.
 *
 * Inverted band, so hairlines are struck from `ink-foreground` rather than
 * `border` — the light-ground border token disappears against the ink.
 */
export function Argument() {
  return (
    <Section tone="ink" size="lg">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Eyebrow className="text-ink-foreground/60">
              {argument.eyebrow}
            </Eyebrow>

            {/* Title carries a `\n`; Headline breaks on it. */}
            <Headline text={argument.title} className="mt-5" />

            <div className="mt-7 flex flex-col gap-5">
              {argument.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-ink-foreground/70 max-w-[62ch] text-base leading-relaxed text-pretty sm:text-[1.0625rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10">
              <Cta href={brand.links.programmes} tone="accent">
                {argument.cta}
              </Cta>
            </div>
          </Reveal>

          <RevealGroup className="flex flex-col gap-5 lg:col-span-5">
            {argument.panels.map((panel) => {
              const highlighted = "highlight" in panel && panel.highlight;

              return (
                <Reveal key={panel.label}>
                  <div
                    className={
                      highlighted
                        ? "border-accent/45 bg-accent/[0.09] rounded-sm border p-6 sm:p-7"
                        : "border-ink-foreground/15 rounded-sm border p-6 sm:p-7"
                    }
                  >
                    <p
                      className={
                        highlighted
                          ? "text-accent flex items-center gap-2.5 font-mono text-[0.68rem] tracking-[0.16em] uppercase"
                          : "text-ink-foreground/55 flex items-center gap-2.5 font-mono text-[0.68rem] tracking-[0.16em] uppercase"
                      }
                    >
                      <Icon name={panel.icon} className="size-4 shrink-0" />
                      <span>{panel.label}</span>
                    </p>

                    <p
                      className={
                        highlighted
                          ? "text-ink-foreground mt-4 text-base leading-relaxed text-pretty"
                          : "text-ink-foreground/70 mt-4 text-base leading-relaxed text-pretty"
                      }
                    >
                      {panel.body}
                    </p>

                    {/* Only the argued-for panel carries a footnote. */}
                    {"footnote" in panel && panel.footnote ? (
                      <p className="border-accent/25 text-ink-foreground/60 mt-5 border-t pt-4 font-mono text-[0.62rem] tracking-[0.14em] uppercase">
                        {panel.footnote}
                      </p>
                    ) : null}
                  </div>
                </Reveal>
              );
            })}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}

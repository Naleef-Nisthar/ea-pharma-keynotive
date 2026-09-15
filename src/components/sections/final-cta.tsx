import { brand, finalCta } from "@/content/site";
import {
  Container,
  Cta,
  Eyebrow,
  Headline,
  Section,
  SpecBand,
} from "@/components/section";
import { Reveal } from "@/components/motion/reveal";

export function FinalCta() {
  return (
    <Section tone="ink" className="overflow-hidden" size="lg">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          {/* The spec band closes the page the way it opened it. */}
          <SpecBand className="mx-auto mb-12 max-w-xs opacity-60" />

          <Eyebrow className="text-ink-foreground/60 justify-center">
            {finalCta.eyebrow}
          </Eyebrow>

          <Headline text={finalCta.title} className="mt-7" />

          <p className="text-ink-foreground/70 mx-auto mt-7 max-w-[58ch] text-base leading-relaxed text-pretty sm:text-lg">
            {finalCta.body}
          </p>

          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Cta href={brand.links.programmes}>{finalCta.primaryCta}</Cta>
            <Cta href={brand.links.contact} tone="inverted">
              {finalCta.secondaryCta}
            </Cta>
          </div>

          <p className="text-ink-foreground/50 mt-14 font-mono text-[0.68rem] tracking-[0.14em] uppercase">
            {finalCta.footnote}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

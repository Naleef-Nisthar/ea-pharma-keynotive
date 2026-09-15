import { Check } from "lucide-react";
import { brand, inHouse } from "@/content/site";
import {
  ArrowLink,
  Chip,
  Container,
  Cta,
  Eyebrow,
  Headline,
  Lede,
  Section,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * In-house training.
 *
 * There is deliberately no form here. The enquiry lives on Keynotive's own
 * contact page, which is where the operator already handles it; a second
 * capture surface on a microsite would split the trail and leave enquiries in
 * a place nobody monitors. The primary CTA therefore leaves the site, and the
 * `Cta` kit adds the external-link attributes.
 *
 * The twelve team chips are a scope statement — "is my function covered?" —
 * not navigation, so they stay unfilled and unlinked.
 */
export function InHouse() {
  return (
    <Section id={inHouse.id} tone="muted">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Eyebrow className="text-muted-foreground">
              {inHouse.eyebrow}
            </Eyebrow>
            <Headline text={inHouse.title} className="mt-5" />
            <Lede className="mt-6">{inHouse.body}</Lede>

            <div className="mt-10">
              <p className="text-muted-foreground font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                {inHouse.teamsLabel}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {inHouse.teams.map((team) => (
                  <Chip key={team}>{team}</Chip>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Cta href={brand.links.contact}>{inHouse.primaryCta}</Cta>
              <ArrowLink href={brand.links.inHouse}>
                {inHouse.secondaryCta}
              </ArrowLink>
            </div>
          </Reveal>

          <RevealGroup className="flex flex-col gap-5 lg:col-span-5">
            <Reveal>
              <div className="border-border bg-background rounded-sm border p-6 sm:p-7">
                <h3 className="text-card-title font-semibold tracking-[-0.011em]">
                  {inHouse.benefits.heading}
                </h3>

                <ul className="mt-5 flex flex-col gap-4">
                  {inHouse.benefits.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        aria-hidden
                        className="text-accent-text mt-0.5 size-4 shrink-0"
                        strokeWidth={2}
                      />
                      <span className="text-muted-foreground text-sm leading-relaxed text-pretty">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div className="border-border rounded-sm border p-6 sm:p-7">
                <h3 className="text-card-title font-semibold tracking-[-0.011em]">
                  {inHouse.publicSector.heading}
                </h3>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed text-pretty">
                  {inHouse.publicSector.body}
                </p>
              </div>
            </Reveal>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}

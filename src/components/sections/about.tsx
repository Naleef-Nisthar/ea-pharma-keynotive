import Link from "next/link";
import { Check, Mail, MapPin } from "lucide-react";
import { about, brand } from "@/content/site";
import {
  Container,
  Cta,
  Eyebrow,
  Headline,
  Section,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * About Keynotive.
 *
 * The operator card is the page's provenance: who actually runs this, where
 * they are registered, and how to reach them. It is set in the same register
 * as a company footer block — mono labels, plain address, no ornament —
 * because the value of the information is that it is verifiable, and anything
 * decorative would undercut that.
 *
 * The address uses a real `<address>` element with `not-italic`, so assistive
 * tech gets the semantics without the browser's default italic run.
 */
export function About() {
  return (
    <Section id={about.id}>
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Eyebrow className="text-muted-foreground">{about.eyebrow}</Eyebrow>
            <Headline text={about.title} className="mt-5" />

            <div className="mt-7 flex flex-col gap-5">
              {about.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-muted-foreground max-w-[62ch] text-base leading-relaxed text-pretty sm:text-[1.0625rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="text-muted-foreground/85 mt-6 max-w-[62ch] text-sm leading-relaxed text-pretty">
              {about.footnote}
            </p>

            <ul className="mt-10 flex flex-col gap-4">
              {about.badges.map((badge) => (
                <li key={badge} className="flex items-start gap-3">
                  <Check
                    aria-hidden
                    className="text-accent-text mt-0.5 size-4 shrink-0"
                    strokeWidth={2}
                  />
                  <span className="text-sm leading-relaxed">{badge}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Cta href={brand.links.operator}>{about.primaryCta}</Cta>
              <Cta href={brand.links.allProgrammes} tone="outline">
                {about.secondaryCta}
              </Cta>
            </div>
          </Reveal>

          <RevealGroup className="lg:col-span-5">
            <Reveal>
              <div className="border-border bg-muted/40 rounded-sm border p-6 sm:p-7">
                <h3 className="text-muted-foreground font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                  {about.card.heading}
                </h3>

                <div className="mt-5">
                  <p className="text-base font-medium tracking-tight">
                    {brand.operator}
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {about.card.registration}
                  </p>
                </div>

                <div className="border-border/70 mt-6 flex flex-col gap-4 border-t pt-6">
                  <div className="flex items-start gap-3">
                    <MapPin
                      aria-hidden
                      className="text-muted-foreground/70 mt-0.5 size-4 shrink-0"
                      strokeWidth={1.5}
                    />
                    <address className="text-muted-foreground text-sm leading-relaxed not-italic">
                      {brand.address.line1}
                      <br />
                      {brand.address.line2}
                      <br />
                      {brand.address.city}
                      <br />
                      {brand.address.country}
                    </address>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail
                      aria-hidden
                      className="text-muted-foreground/70 size-4 shrink-0"
                      strokeWidth={1.5}
                    />
                    <Link
                      href={`mailto:${brand.links.email}`}
                      className="decoration-accent/50 hover:text-accent-text text-sm underline underline-offset-4 transition-colors duration-150 ease-out"
                    >
                      {brand.links.email}
                    </Link>
                  </div>
                </div>

                {/* Card foot: the two facts a reader checks last — what this
                    company does, and where it operates. */}
                <div className="border-border/70 text-muted-foreground mt-6 flex flex-col gap-2 border-t pt-6 font-mono text-[0.62rem] tracking-[0.14em] uppercase sm:flex-row sm:justify-between sm:gap-5">
                  <p>{about.card.role}</p>
                  <p>{about.card.reach}</p>
                </div>
              </div>
            </Reveal>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}

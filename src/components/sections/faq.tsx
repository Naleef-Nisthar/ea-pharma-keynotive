import { faq } from "@/content/site";
import {
  Container,
  Eyebrow,
  Headline,
  Lede,
  Section,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * FAQ built on native <details>/<summary>.
 *
 * No JavaScript, no client boundary, and the answers stay in the DOM whether
 * open or closed — which matters both for search engines and for in-page find.
 *
 * Deliberately NOT an exclusive accordion. Giving every <details> a shared
 * `name` would make the browser enforce one-open-at-a-time, which (a) silently
 * force-closes one of the two items that ship open, and (b) stops a reader
 * comparing two answers side by side. Independent toggles match how the
 * previous build behaved and cost nothing.
 */
export function Faq() {
  return (
    <Section id={faq.id} size="sm">
      <Container className="max-w-3xl">
        <Reveal>
          <Eyebrow className="text-muted-foreground">{faq.eyebrow}</Eyebrow>
          <Headline text={faq.title} className="mt-6" />
          <Lede className="mt-6">{faq.body}</Lede>
        </Reveal>

        <RevealGroup className="border-border mt-14 border-t">
          {faq.items.map((item) => (
            <Reveal key={item.id}>
              <details
                open={(faq.defaultOpen as readonly string[]).includes(item.id)}
                className="border-border group border-b"
              >
                <summary
                  className={[
                    "flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4",
                    "hover:text-accent-text text-[0.9375rem] font-medium transition-colors duration-150 ease-out",
                    "[&::-webkit-details-marker]:hidden",
                  ].join(" ")}
                >
                  {item.question}
                  {/* Plus → minus. Two rules, the vertical one collapsing on
                      open, so the state change is visible without motion. */}
                  <span
                    aria-hidden
                    className="relative size-4 shrink-0"
                  >
                    <span className="bg-muted-foreground group-open:bg-accent absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 transition-colors duration-150 ease-out" />
                    <span className="bg-muted-foreground group-open:bg-accent absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 [transition-property:transform,opacity,background-color] duration-200 ease-out group-open:scale-y-0 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="text-muted-foreground max-w-[68ch] pr-10 pb-6 text-[0.9375rem] leading-relaxed">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Shift } from "@/components/sections/shift";
import { Pillars } from "@/components/sections/pillars";
import { Outcomes } from "@/components/sections/outcomes";
import { Argument } from "@/components/sections/argument";
import { Bioprocess } from "@/components/sections/bioprocess";
import { Programmes } from "@/components/sections/programmes";
import { Approach } from "@/components/sections/approach";
import { Audience } from "@/components/sections/audience";
import { Lifecycle } from "@/components/sections/lifecycle";
import { Faculty } from "@/components/sections/faculty";
import { Community } from "@/components/sections/community";
import { Insights } from "@/components/sections/insights";
import { InHouse } from "@/components/sections/in-house";
import { Faq } from "@/components/sections/faq";
import { About } from "@/components/sections/about";
import { FinalCta } from "@/components/sections/final-cta";

/**
 * Section order is the page's argument, so it lives here rather than in a
 * config array:
 *
 *   the problem      Shift — the science is moving
 *   the map          Pillars — where we teach
 *   the payoff       Outcomes — what you get from it
 *   the position     Argument — guidance vs. practice
 *   the spearhead    Bioprocess — the emerging focus
 *   the answer       Programmes — what you can actually book
 *   the method       Approach, Audience, Lifecycle — how and for whom
 *   proof            Faculty, Community
 *   forthcoming      Insights
 *   the other ask    InHouse
 *   objections       Faq
 *   who's behind it  About
 *   the ask          FinalCta
 *
 * To remove a section, delete its line. To reorder, move it.
 * All copy for every section lives in src/content/site.ts.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <TrustedBy />
        <Shift />
        <Pillars />
        <Outcomes />
        <Argument />
        <Bioprocess />
        <Programmes />
        <Approach />
        <Audience />
        <Lifecycle />
        <Faculty />
        <Community />
        <Insights />
        <InHouse />
        <Faq />
        <About />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}

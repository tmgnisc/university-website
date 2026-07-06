import { Award } from "lucide-react";

import { Reveal, SectionContainer } from "@/components/layout/layout-primitives";

export function AffiliationBanner() {
  return (
    <section className="relative z-10 bg-primary text-primary-foreground">
      <SectionContainer className="py-8 md:py-10">
        <Reveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-4">
              <Award className="size-4" />
              In Partnership with Kathmandu University
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              WCBT - Jhapa Campus
            </h2>
            <p className="mt-3 text-sm sm:text-base text-primary-foreground/85 max-w-2xl mx-auto">
              (Under the Management of WhiteHouse Education Foundation)
            </p>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

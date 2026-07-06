import { LAYOUT, Reveal, SectionContainer } from "@/components/layout/layout-primitives";
import { cn } from "@/lib/utils";

import campusImg from "@/assets/campus.jpg";
import smartClass from "@/assets/smart-classroom.jpg";
import aiLab from "@/assets/ai-lab.jpg";

export function Mosaic() {
  return (
    <section className={LAYOUT.section}>
      <SectionContainer>
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            By the numbers
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold max-w-3xl">
            A campus built for ambition
          </h2>
        </Reveal>
        <div
          className={cn(
            LAYOUT.contentGap,
            "grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px]",
            LAYOUT.gridGap,
          )}
        >
          <div className="row-span-2 col-span-2 rounded-3xl overflow-hidden relative group">
            <img
              src={campusImg}
              alt="Campus infrastructure"
              loading="lazy"
              className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent flex items-end text-white",
                LAYOUT.cardPadding,
              )}
            >
              <div>
                <div className="text-xs uppercase tracking-widest text-white/80">
                  Campus Infrastructure
                </div>
                <div className="font-display text-2xl mt-1">
                  Modern facilities, built for learning
                </div>
              </div>
            </div>
          </div>
          <div
            className={cn(
              "rounded-3xl bg-navy-deep text-white flex flex-col justify-between",
              LAYOUT.cardPadding,
            )}
          >
            <span className="text-xs uppercase tracking-widest text-white/80">
              Mentors & Tie-ups
            </span>
            <div>
              <div className="text-5xl font-display font-semibold text-white">150+</div>
              <div className="text-sm text-white/70 mt-1">Industry partners</div>
            </div>
          </div>
          <div
            className={cn(
              "rounded-3xl bg-primary text-primary-foreground flex flex-col justify-between",
              LAYOUT.cardPadding,
            )}
          >
            <span className="text-xs uppercase tracking-widest">Affiliation</span>
            <div>
              <div className="text-2xl font-display font-semibold">Kathmandu University</div>
              <div className="text-sm opacity-80 mt-1">Officially affiliated programs</div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden relative group">
            <img
              src={smartClass}
              alt="Smart classroom"
              loading="lazy"
              className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              className={cn(
                "absolute inset-0 bg-navy-deep/60 flex items-end text-white",
                LAYOUT.cardPadding,
              )}
            >
              <span className="font-medium">Smart Classrooms</span>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden relative group">
            <img
              src={aiLab}
              alt="AI labs"
              loading="lazy"
              className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              className={cn(
                "absolute inset-0 bg-navy-deep/60 flex items-end text-white",
                LAYOUT.cardPadding,
              )}
            >
              <span className="font-medium">AI Innovation Labs</span>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

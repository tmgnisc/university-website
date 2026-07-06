import { Quote } from "lucide-react";

import { LAYOUT, Reveal, SectionContainer } from "@/components/layout/layout-primitives";
import { cn } from "@/lib/utils";

import heroVisionImg from "@/assets/hero.png";

export function Vision() {
  return (
    <section
      id="tour"
      className={cn(LAYOUT.section, "bg-navy-deep text-white relative overflow-hidden")}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(134,0,29,0.15),transparent_60%)]" />
      <SectionContainer
        className={cn("grid lg:grid-cols-2 items-center relative", LAYOUT.splitGap)}
      >
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden cyan-glow">
            <img
              src={heroVisionImg}
              alt="WhiteHouse College of Business & Technology campus"
              loading="lazy"
              className="w-full aspect-video object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Quote className="size-10 text-white/80" />
          <p className="mt-4 text-2xl md:text-3xl font-display leading-snug">
            To establish a future-focused academic ecosystem in Eastern Nepal.
          </p>
          <div className={cn(LAYOUT.contentGap, "flex flex-wrap gap-2")}>
            {["Integrity", "Excellence", "Innovation", "Inclusiveness", "Leadership"].map((v) => (
              <span
                key={v}
                className="px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white text-sm"
              >
                {v}
              </span>
            ))}
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

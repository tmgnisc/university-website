import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LAYOUT, Reveal, SectionContainer } from "@/components/layout/layout-primitives";
import { cn } from "@/lib/utils";

const news = [
  { tag: "Hackathon", title: "48-hour AI Hackathon ignites student innovation" },
  { tag: "Workshop", title: "Hands-on Industrial IoT workshop with mentors" },
  { tag: "Seminar", title: "Future of EdTech: keynote by KU faculty" },
];

export function WhatsNew() {
  return (
    <section id="about" className={cn(LAYOUT.section, "bg-navy-deep text-white")}>
      <SectionContainer>
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-white/80">What's New</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold">Leadership & latest updates</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div
            className={cn(
              LAYOUT.contentGap,
              "grid lg:grid-cols-[1fr_2fr] items-center rounded-3xl bg-white/5 border border-white/10 backdrop-blur",
              LAYOUT.splitGap,
              LAYOUT.cardPadding,
            )}
          >
            <div className="flex justify-center">
              <div className="relative w-56 lg:w-72 aspect-[3/4] overflow-hidden rounded-2xl border-2 border-white/40 shadow-lg">
                <img
                  src="https://ik.imagekit.io/qn3m81dsk/university/president%201.jpg"
                  alt="Yuvraj Sharma, President"
                  loading="lazy"
                  className="size-full object-cover object-top"
                />
              </div>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.18em] text-white/80">
                From the President
              </span>
              <p className="mt-3 text-xl lg:text-2xl font-display leading-snug">
                "Our mission is to nurture an academic ecosystem where Eastern Nepal's brightest
                minds engineer the future — with integrity, excellence and global ambition."
              </p>
              <p className="mt-4 text-sm font-semibold text-white/90">Yuvraj Sharma</p>
              <p className="text-xs text-white/60">President</p>
              <Button className="mt-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                Read Full Message <ArrowRight className="ml-1 size-4" />
              </Button>
            </div>
          </div>
        </Reveal>
        <div className={cn(LAYOUT.contentGap, "grid md:grid-cols-3", LAYOUT.gridGap)}>
          {news.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.08}>
              <article
                className={cn(
                  "group rounded-3xl bg-white/5 border border-white/10 h-full transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/30",
                  LAYOUT.cardPadding,
                )}
              >
                <span className="text-[11px] uppercase tracking-[0.18em] text-white/80 font-semibold">
                  {n.tag}
                </span>
                <h3 className="mt-3 font-semibold text-lg leading-snug">{n.title}</h3>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-white/80 group-hover:text-white"
                >
                  Read more <ArrowRight className="size-4" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

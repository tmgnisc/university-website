import { Link } from "@tanstack/react-router";

import { LAYOUT, Reveal, SectionContainer } from "@/components/layout/layout-primitives";
import { cn } from "@/lib/utils";

import progAi from "@/assets/prog-ai.jpg";
import progEdtech from "@/assets/prog-edtech.jpg";

const programs = [
  {
    img: progAi,
    tag: "KU Affiliated",
    title: "BIT — Bachelor in Information Technology",
    desc: "Build the next generation of software, AI systems and intelligent platforms.",
    to: "/programs/bit" as const,
  },
  {
    img: progEdtech,
    tag: "KU Affiliated",
    title: "B.Tech Ed IT — Technology in Education",
    desc: "Equip educators with cutting-edge tools to reshape modern classrooms.",
    to: "/programs/btech-ed-it" as const,
  },
];

export function Programs() {
  return (
    <section id="programs" className={LAYOUT.section}>
      <SectionContainer>
        <Reveal className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Programs
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold">
            Future-ready degrees, designed with industry
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Affiliated to Kathmandu University. Built for global outcomes.
          </p>
        </Reveal>
        <div
          className={cn(
            LAYOUT.contentGap,
            "grid grid-cols-1 md:grid-cols-2 w-full",
            LAYOUT.gridGap,
          )}
        >
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Link
                to={p.to}
                className="group rounded-3xl overflow-hidden bg-card border border-border shadow-xl shadow-primary/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/15 h-full flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="size-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className={cn(LAYOUT.cardPadding, "flex-1 flex flex-col")}>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 font-semibold text-lg leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">{p.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

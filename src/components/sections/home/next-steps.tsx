import { Link } from "@tanstack/react-router";
import { ChevronRight, FileText, GraduationCap, MapPin, MessageSquare } from "lucide-react";

import { LAYOUT, Reveal, SectionContainer } from "@/components/layout/layout-primitives";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: FileText,
    title: "Admission Process",
    desc: "Eligibility, deadlines & documents.",
    to: "/academics/admissions",
  },
  {
    icon: GraduationCap,
    title: "Scholarship Schemes",
    desc: "Up to 75% merit-based aid.",
    to: "/academics/scholarships",
  },
  {
    icon: MessageSquare,
    title: "Academic Inquiry",
    desc: "Talk to our admissions team.",
    to: "/contact",
  },
  {
    icon: MapPin,
    title: "Jhapa Campus",
    desc: "Visit & explore our facilities.",
    to: "/visit",
  },
];

export function NextSteps() {
  return (
    <section id="admissions" className={cn(LAYOUT.section, "bg-secondary")}>
      <SectionContainer>
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-semibold text-center max-w-3xl mx-auto">
            Your next academic step
          </h2>
        </Reveal>
        <div
          className={cn(
            LAYOUT.contentGap,
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
            LAYOUT.gridGap,
          )}
        >
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <Link
                to={s.to}
                className={cn(
                  "group block rounded-3xl bg-card border border-border h-full transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30",
                  LAYOUT.cardPadding,
                )}
              >
                <div className="size-12 rounded-2xl bg-primary text-primary-foreground grid place-items-center group-hover:bg-primary/90 transition-colors">
                  <s.icon className="size-5" />
                </div>
                <h3 className="mt-5 flex items-center gap-1 font-semibold text-lg">
                  {s.title}
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-black" />
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

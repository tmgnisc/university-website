import { BookOpen, Cpu, Shield, Sparkles } from "lucide-react";

import { LAYOUT, Reveal, SectionContainer } from "@/components/layout/layout-primitives";
import { cn } from "@/lib/utils";

const HOME_IMAGE_1 = "https://ik.imagekit.io/qn3m81dsk/university/clz%201.jpg";

const topics = [
  { icon: Cpu, label: "AI & ML" },
  { icon: Sparkles, label: "Robotics" },
  { icon: Shield, label: "IoT Systems" },
  { icon: BookOpen, label: "Innovation Labs" },
];

export function Research() {
  return (
    <section id="research" className={LAYOUT.section}>
      <SectionContainer className={cn("grid lg:grid-cols-2 items-center", LAYOUT.splitGap)}>
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Research
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
            Research & Innovation Ecosystem
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Hands-on labs in AI, Robotics, IoT and applied innovation — preparing students to solve
            real-world problems alongside industry mentors.
          </p>
          <div className={cn(LAYOUT.contentGap, "grid grid-cols-2", LAYOUT.gridGap)}>
            {topics.map((x) => (
              <div
                key={x.label}
                className={cn(
                  "rounded-2xl border border-border flex items-center gap-3 bg-card",
                  LAYOUT.cardPadding,
                )}
              >
                <div className="size-10 rounded-xl bg-muted text-black grid place-items-center">
                  <x.icon className="size-5" />
                </div>
                <span className="font-medium">{x.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl border border-primary/30" />
            <img
              src={HOME_IMAGE_1}
              alt="AI Robotics & IoT Innovation"
              loading="lazy"
              className="relative rounded-3xl w-full aspect-[4/3] object-cover shadow-2xl shadow-primary/20"
            />
            <div className="mt-3 text-center">
              <p className="text-sm font-medium text-foreground">
                Premises of Nidi Secondary School & Indreni Campus
              </p>
            </div>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

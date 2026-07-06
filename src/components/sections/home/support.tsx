import { motion } from "framer-motion";
import { Briefcase, HeartHandshake, Laptop } from "lucide-react";

import { LAYOUT, Reveal, SectionContainer } from "@/components/layout/layout-primitives";
import { cn } from "@/lib/utils";

import studentLifeImg from "@/assets/student-life.jpg";

const supports = [
  {
    icon: Briefcase,
    title: "Paid Internships",
    value: 92,
    desc: "Industry placements with stipends.",
  },
  {
    icon: Laptop,
    title: "Laptop Installment Plan",
    value: 100,
    desc: "Flexible monthly EMI for every student.",
  },
  {
    icon: HeartHandshake,
    title: "Counseling Services",
    value: 80,
    desc: "Mental health & academic guidance.",
  },
];

export function Support() {
  return (
    <section id="campus-life" className={cn(LAYOUT.section, "bg-secondary")}>
      <SectionContainer className={cn("grid lg:grid-cols-2 items-center", LAYOUT.splitGap)}>
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Student Support
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
            Beyond the classroom — we back every student
          </h2>
          <div className={cn(LAYOUT.contentGap, "space-y-4")}>
            {supports.map((s) => (
              <div
                key={s.title}
                className={cn("rounded-2xl bg-card border border-border", LAYOUT.cardPadding)}
              >
                <div className="flex items-start gap-4">
                  <div className="size-11 rounded-xl bg-muted text-black grid place-items-center shrink-0">
                    <s.icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold">{s.title}</h3>
                      <span className="text-sm text-muted-foreground">{s.value}%</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                    <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <img
            src={studentLifeImg}
            alt="Student life — clubs & hackathons"
            loading="lazy"
            className="rounded-3xl w-full aspect-[4/5] object-cover shadow-2xl shadow-primary/10"
          />
        </Reveal>
      </SectionContainer>
    </section>
  );
}

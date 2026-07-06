import { ArrowRight, Calendar, Clock } from "lucide-react";

import { LAYOUT, Reveal, SectionContainer } from "@/components/layout/layout-primitives";
import { cn } from "@/lib/utils";

import campusImg from "@/assets/campus.jpg";
import progAi from "@/assets/prog-ai.jpg";
import studentLifeImg from "@/assets/student-life.jpg";
import aiLab from "@/assets/ai-lab.jpg";

const events = [
  { title: "Orientation Program 2026", date: "Jan 12, 2026", time: "9:00 AM", img: campusImg },
  { title: "Guest Lecture: AI Ethics", date: "Jan 20, 2026", time: "2:00 PM", img: aiLab },
  { title: "Tech Bootcamp — Web3", date: "Feb 04, 2026", time: "10:00 AM", img: progAi },
  {
    title: "Inter-college Sports Week",
    date: "Feb 18, 2026",
    time: "All Day",
    img: studentLifeImg,
  },
];

export function Events() {
  return (
    <section className={LAYOUT.section}>
      <SectionContainer>
        <Reveal className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Events</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold">Upcoming on campus</h2>
          </div>
          <a href="#" className="text-sm font-medium inline-flex items-center gap-1.5">
            All events <ArrowRight className="size-4" />
          </a>
        </Reveal>
        <div
          className={cn(
            LAYOUT.contentGap,
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
            LAYOUT.gridGap,
          )}
        >
          {events.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <article className="group rounded-3xl bg-card border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 h-full flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={e.img}
                    alt={e.title}
                    loading="lazy"
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className={cn(LAYOUT.cardPadding, "flex-1 flex flex-col")}>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {e.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {e.time}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug flex-1">{e.title}</h3>
                  <a
                    href="#"
                    className="mt-4 text-sm font-medium text-black inline-flex items-center gap-1 group-hover:text-black/70"
                  >
                    View Details <ArrowRight className="size-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import aiLab from "@/assets/ai-lab.jpg";
import campusImg from "@/assets/campus.jpg";
import progAi from "@/assets/prog-ai.jpg";
import studentLifeImg from "@/assets/student-life.jpg";
import { PageHero } from "@/components/sections/bento";
import { CtaBand, PageSection } from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "Upcoming campus events, lectures, bootcamps, and student activities at WCBT.",
      },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

const EVENT_ITEMS = [
  { title: "Orientation Program 2026", date: "Jan 12, 2026", time: "9:00 AM", img: campusImg },
  { title: "Guest Lecture: AI Ethics", date: "Jan 20, 2026", time: "2:00 PM", img: aiLab },
  { title: "Tech Bootcamp - Web3", date: "Feb 04, 2026", time: "10:00 AM", img: progAi },
  {
    title: "Inter-college Sports Week",
    date: "Feb 18, 2026",
    time: "All Day",
    img: studentLifeImg,
  },
];

function EventsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Events"
        title="Upcoming on campus"
        description="Stay updated on orientation, lectures, bootcamps, student activities, and community events."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%201.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <PageSection eyebrow="Calendar" title="Campus events">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {EVENT_ITEMS.map((event) => (
            <article
              key={event.title}
              className="overflow-hidden rounded-3xl border border-border bg-card"
            >
              <img src={event.img} alt={event.title} className="aspect-video w-full object-cover" />
              <div className="p-6">
                <h3 className="font-semibold leading-snug">{event.title}</h3>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-primary" />
                    {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="size-4 text-primary" />
                    {event.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="size-4 text-primary" />
                    WCBT Jhapa Campus
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <CtaBand
        title="Planning a campus visit?"
        description="Meet the team, explore facilities, and learn about upcoming events in person."
        primaryLabel="Visit Campus"
        secondaryLabel="Contact Us"
      />
    </PageShell>
  );
}

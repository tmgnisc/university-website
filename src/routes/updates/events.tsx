import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Presentation, Trophy, Users } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/updates/events")({
  head: () => ({
    meta: [
      { title: "Events — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "Campus events, lectures, workshops, and student activities at WCBT.",
      },
    ],
    links: [{ rel: "canonical", href: "/updates/events" }],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Events"
        title="Life on campus"
        description="From orientation to guest lectures and student activities, here's the kind of events that take place at WCBT."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%201.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <PageSection
        eyebrow="Event Types"
        title="What happens on campus"
        description="Specific dates and details are announced through official college notices and the admissions office as events are scheduled."
      >
        <IconFeatureGrid
          items={[
            {
              icon: GraduationCap,
              title: "Orientation Sessions",
              description: "Welcome programs that help new students settle into campus life.",
            },
            {
              icon: Presentation,
              title: "Guest Lectures & Workshops",
              description: "Sessions led by academic and industry speakers on relevant topics.",
            },
            {
              icon: Users,
              title: "Bootcamps & Team Activities",
              description: "Hands-on sessions and collaborative projects for students.",
            },
            {
              icon: Trophy,
              title: "Campus & Sports Activities",
              description: "Sports, cultural programs, and community events across the year.",
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Stay Updated" title="Planning a visit?" className="bg-muted/30">
        <p className="mx-auto max-w-3xl text-center text-muted-foreground leading-relaxed">
          Specific event dates aren't listed yet. Contact the campus office for the current
          schedule, or plan a visit to see campus life firsthand.
        </p>
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

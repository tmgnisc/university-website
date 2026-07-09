import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/sections/bento";
import {
  CareerGrid,
  CtaBand,
  HighlightBand,
  IconFeatureGrid,
  PageSection,
  SplitSection,
  Timeline,
} from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";
import { resolveIcons } from "@/lib/icon-registry";

import content from "@/data/pages/student-experience.json";

const CLUBS = content.clubs;
const EVENTS = content.events;
const ENRICHMENT_ACTIVITIES = resolveIcons(content.enrichmentActivities);
const ORIENTATION = resolveIcons(content.orientation);

export const Route = createFileRoute("/student-life/student-experience")({
  head: () => ({
    meta: [
      { title: "Wider Student Experience — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Clubs, societies, enrichment activities, orientation, and the student events calendar at WCBT Jhapa.",
      },
    ],
    links: [{ rel: "canonical", href: "/student-life/student-experience" }],
  }),
  component: StudentExperiencePage,
});

function StudentExperiencePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Wider Student Experience"
        title="Grow beyond the classroom"
        description="At WCBT, your education extends into clubs, activities, events, and a supportive community that helps you build skills, friendships, and confidence."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <HighlightBand
        badge="Student Community"
        title="Learn, build, and belong"
        description="Join a vibrant campus where technology enthusiasts and future educators collaborate, compete, and grow together."
      />

      <SplitSection
        eyebrow="Our Colleges"
        title="A connected learning community"
        description="WCBT operates alongside established partner institutions, giving students access to shared facilities, faculty, and a broader academic network in Eastern Nepal."
        image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
        bullets={[
          "Shared campus facilities and resources",
          "Cross-institution faculty and mentorship",
          "Access to a wide student and alumni network",
          "Collaborative academic and cultural events",
        ]}
      />

      <PageSection
        eyebrow="Enrichment Activities"
        title="Opportunities to explore and lead"
        description="Develop leadership, creativity, and teamwork through activities designed to complement your degree."
        className="bg-muted/30"
      >
        <IconFeatureGrid items={ENRICHMENT_ACTIVITIES} />
      </PageSection>

      <PageSection
        eyebrow="Clubs & Societies"
        title="Find your community"
        description="Join one or more student organizations to build skills, friendships, and leadership experience."
      >
        <CareerGrid items={CLUBS} />
      </PageSection>

      <PageSection
        eyebrow="Welcome & Orientation"
        title="A confident start to college"
        description="New students are welcomed with a structured orientation that makes settling in easy."
        className="bg-muted/30"
      >
        <IconFeatureGrid items={ORIENTATION} />
      </PageSection>

      <PageSection
        eyebrow="Student Events Calendar"
        title="Something happening all year"
        description="Mark your calendar — WCBT keeps the campus active with events every term."
      >
        <Timeline items={EVENTS} />
      </PageSection>

      <CtaBand
        title="Experience WCBT for yourself"
        description="Schedule a campus visit to meet students, tour facilities, and feel the energy of our community."
        primaryLabel="Schedule a Visit"
        secondaryLabel="View Programs"
      />
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";

import { BentoGrid, PageHero, type BentoItem } from "@/components/sections/bento";
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

import content from "@/data/pages/campus-life.json";

const CAMPUS_BENTO = content.bento as BentoItem[];
const CLUBS = content.clubs;
const EVENTS = content.events;
const CAMPUS_GALLERY = content.gallery as BentoItem[];
const WELLBEING = resolveIcons(content.wellbeing);

export const Route = createFileRoute("/campus-life")({
  head: () => ({
    meta: [
      { title: "Campus Life — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Discover student life at WCBT — clubs, events, facilities, and community in Jhapa, Nepal.",
      },
    ],
    links: [{ rel: "canonical", href: "/campus-life" }],
  }),
  component: CampusLifePage,
});

function CampusLifePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Campus Life"
        title="More than classrooms"
        description="At WCBT, learning extends beyond lectures — through clubs, events, sports, and a vibrant student community in Jhapa."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <HighlightBand
        badge="Student Community"
        title="Learn, build, and belong"
        description="Join a supportive campus where technology enthusiasts and future educators collaborate, compete, and grow together."
      />

      <PageSection
        eyebrow="On campus"
        title="Spaces designed for student life"
        description="From collaborative lounges to annual festivals, WCBT offers an environment where students thrive inside and outside the classroom."
      >
        <BentoGrid items={CAMPUS_BENTO} />
      </PageSection>

      <PageSection
        eyebrow="Gallery"
        title="Campus life in pictures"
        description="A visual tour of student activities, learning spaces, and campus events that shape daily life at WCBT."
        className="bg-muted/30"
      >
        <BentoGrid items={CAMPUS_GALLERY} />
      </PageSection>

      <SplitSection
        eyebrow="Student experience"
        title="A balanced college life"
        description="We encourage students to pursue passions beyond academics — whether that's competitive coding, sports, creative arts, or community service."
        image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
        bullets={[
          "Active clubs for every interest and skill level",
          "Regular workshops, hackathons, and cultural events",
          "Mentorship from seniors, faculty, and alumni",
          "Safe, inclusive campus environment in Jhapa",
        ]}
      />

      <PageSection
        eyebrow="Clubs & societies"
        title="Find your community"
        description="Join one or more student organizations to build skills, friendships, and leadership experience."
        className="bg-muted/30"
      >
        <CareerGrid items={CLUBS} />
      </PageSection>

      <PageSection
        eyebrow="Wellbeing"
        title="Support beyond academics"
        description="Student services help you stay healthy, connected, and motivated throughout your degree."
      >
        <IconFeatureGrid items={WELLBEING} />
      </PageSection>

      <SplitSection
        eyebrow="Housing"
        title="Living near campus"
        description="While WCBT does not operate on-campus hostels, our team helps students find safe, affordable accommodation options in Jhapa with easy access to campus."
        image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80"
        imageLeft
        bullets={[
          "Recommended lodging list updated each intake",
          "Shared and private room options nearby",
          "Walking distance and public transport routes",
          "Contact admissions for current housing guidance",
        ]}
      />

      <PageSection
        eyebrow="Annual calendar"
        title="Events throughout the year"
        description="Mark your calendar — there's always something happening on campus."
        className="bg-muted/30"
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

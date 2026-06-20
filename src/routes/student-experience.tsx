import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Users, Compass, Trophy, HeartHandshake, Calendar } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import {
  CareerGrid,
  CtaBand,
  HighlightBand,
  IconFeatureGrid,
  PageSection,
  SplitSection,
  Timeline,
} from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

const CLUBS = [
  {
    title: "Coding & Robotics",
    description: "Competitive programming, hackathons, and hands-on robotics projects.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Ed-Tech Circle",
    description: "Explore digital learning tools, LMS platforms, and classroom innovation.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Sports & Recreation",
    description: "Football, cricket, basketball, and inter-college tournaments.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Arts, Music & Media",
    description: "Photography, performance, and content creation for campus channels.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Community Outreach",
    description: "Tech-literacy workshops and volunteering in local schools.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Entrepreneurship Hub",
    description: "Pitch nights, startup mentoring, and innovation challenges.",
    image: "https://placehold.co/500x300",
  },
];

const EVENTS = [
  {
    year: "Jan",
    title: "Welcome & Orientation",
    description: "Campus tours, mentor meetups, and team-building for new students.",
  },
  {
    year: "Mar",
    title: "Enrichment Week",
    description: "Workshops, guest talks, and skill sessions beyond the curriculum.",
  },
  {
    year: "Jun",
    title: "Summer Hackathon",
    description: "A 48-hour build sprint with mentors, prizes, and recruiter networking.",
  },
  {
    year: "Oct",
    title: "WCBT Annual Fest",
    description: "Culture, tech expo, sports, and performances — the highlight of the year.",
  },
];

export const Route = createFileRoute("/student-experience")({
  head: () => ({
    meta: [
      { title: "Wider Student Experience — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Clubs, societies, enrichment activities, orientation, and the student events calendar at WCBT Jhapa.",
      },
    ],
    links: [{ rel: "canonical", href: "/student-experience" }],
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
        image="https://placehold.co/800x600"
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
        <IconFeatureGrid
          items={[
            {
              icon: Compass,
              title: "Skill Workshops",
              description: "Regular sessions on emerging tools, soft skills, and career readiness.",
            },
            {
              icon: Trophy,
              title: "Competitions",
              description: "Hackathons, quizzes, and inter-college contests across disciplines.",
            },
            {
              icon: HeartHandshake,
              title: "Volunteering",
              description: "Community service and outreach that create real-world impact.",
            },
            {
              icon: Sparkles,
              title: "Cultural Events",
              description: "Music, art, and celebration events that build campus pride.",
            },
          ]}
        />
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
        <IconFeatureGrid
          items={[
            {
              icon: Compass,
              title: "Campus Tour",
              description: "Get familiar with facilities, classrooms, and key student services.",
            },
            {
              icon: Users,
              title: "Mentor Pairing",
              description: "Connect with senior students who guide you through your first weeks.",
            },
            {
              icon: HeartHandshake,
              title: "Team Building",
              description: "Icebreakers and group activities to help you make friends fast.",
            },
            {
              icon: Calendar,
              title: "Intro Sessions",
              description: "Briefings on academics, expectations, and campus life essentials.",
            },
          ]}
        />
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

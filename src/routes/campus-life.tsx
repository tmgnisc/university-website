import { createFileRoute } from "@tanstack/react-router";
import { Coffee, Dumbbell, Music, Users } from "lucide-react";

import { BentoGrid, PageHero, type BentoItem } from "@/components/sections/bento";
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

const CAMPUS_BENTO: BentoItem[] = [
  {
    title: "Student Lounge",
    description: "Relaxed spaces to study, collaborate, and connect between classes.",
    image: "https://placehold.co/700x500",
    className: "sm:col-span-2 lg:col-span-2",
  },
  {
    title: "Clubs & Societies",
    description: "15+ active student organizations across tech, arts, and community service.",
    variant: "stat",
    stat: "15+",
    className: "lg:col-span-1",
  },
  {
    title: "Cafeteria",
    description: "Affordable meals and refreshments throughout the academic day.",
    image: "https://placehold.co/500x400",
    className: "lg:col-span-1",
  },
  {
    title: "Annual Fest",
    description: "Culture, music, hackathons, and sports come together each spring.",
    image: "https://placehold.co/700x500",
    badge: "Events",
    className: "sm:col-span-2 lg:col-span-2",
  },
];

const CLUBS = [
  {
    title: "Coding Club",
    description: "Weekly meetups, competitive programming, and open-source contributions.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Robotics Society",
    description: "Build and compete with robots — from line followers to autonomous projects.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Ed-Tech Circle",
    description: "Explore digital tools, LMS platforms, and classroom innovation.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Photography & Media",
    description: "Capture campus life and produce content for college channels.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Sports Association",
    description: "Football, cricket, basketball, and inter-college tournaments.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Community Outreach",
    description: "Tech literacy workshops and volunteer programs in local schools.",
    image: "https://placehold.co/500x300",
  },
];

const EVENTS = [
  {
    year: "Jan",
    title: "Orientation Week",
    description:
      "Welcome new students with campus tours, mentor meetups, and team-building activities.",
  },
  {
    year: "Mar",
    title: "Industry Speaker Series",
    description: "Monthly talks from IT leaders, educators, and startup founders.",
  },
  {
    year: "Jun",
    title: "Summer Hackathon",
    description: "48-hour build sprint with prizes, mentors, and recruiter networking.",
  },
  {
    year: "Oct",
    title: "WCBT Annual Fest",
    description:
      "The biggest celebration of the year — culture, tech expo, sports, and performances.",
  },
];

const CAMPUS_GALLERY: BentoItem[] = [
  {
    title: "Campus Festivities",
    description:
      "Live performances, cultural nights, and student celebrations from across the year.",
    image: "https://placehold.co/700x500",
    className: "sm:col-span-2 lg:col-span-2",
  },
  {
    title: "Study Spaces",
    description: "Quiet corners and collaborative zones where students focus, create, and connect.",
    image: "https://placehold.co/500x400",
  },
  {
    title: "Sports Spirit",
    description: "Team matches, fitness sessions, and outdoor games keep the campus active.",
    image: "https://placehold.co/500x400",
    className: "lg:col-span-2",
  },
  {
    title: "Creative Labs",
    description: "Workshops, media projects, and innovation challenges in every semester.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Team Projects",
    description:
      "Collaborative student work that bridges classroom learning with real-world impact.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Campus Evenings",
    description: "Friendly social spaces and events that bring students together after classes.",
    image: "https://placehold.co/500x300",
  },
];

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
        image="https://placehold.co/800x600"
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
        <IconFeatureGrid
          items={[
            {
              icon: Users,
              title: "Peer mentoring",
              description:
                "Senior students guide newcomers through academics and campus navigation.",
            },
            {
              icon: Coffee,
              title: "Study spaces",
              description: "Quiet zones and group rooms available throughout the day.",
            },
            {
              icon: Dumbbell,
              title: "Sports & fitness",
              description: "Intramural leagues and fitness activities promote physical wellbeing.",
            },
            {
              icon: Music,
              title: "Cultural activities",
              description: "Music, dance, and celebration events build community pride.",
            },
          ]}
        />
      </PageSection>

      <SplitSection
        eyebrow="Housing"
        title="Living near campus"
        description="While WCBT does not operate on-campus hostels, our team helps students find safe, affordable accommodation options in Jhapa with easy access to campus."
        image="https://placehold.co/800x600"
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

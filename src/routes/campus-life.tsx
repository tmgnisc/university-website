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
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
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
    image:
      "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=800&q=80",
    className: "lg:col-span-1",
  },
  {
    title: "Annual Fest",
    description: "Culture, music, hackathons, and sports come together each spring.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
    badge: "Events",
    className: "sm:col-span-2 lg:col-span-2",
  },
];

const CLUBS = [
  {
    title: "Coding Club",
    description: "Weekly meetups, competitive programming, and open-source contributions.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Robotics Society",
    description: "Build and compete with robots — from line followers to autonomous projects.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Ed-Tech Circle",
    description: "Explore digital tools, LMS platforms, and classroom innovation.",
    image:
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Photography & Media",
    description: "Capture campus life and produce content for college channels.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Sports Association",
    description: "Football, cricket, basketball, and inter-college tournaments.",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Community Outreach",
    description: "Tech literacy workshops and volunteer programs in local schools.",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    className: "sm:col-span-2 lg:col-span-2",
  },
  {
    title: "Study Spaces",
    description: "Quiet corners and collaborative zones where students focus, create, and connect.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Sports Spirit",
    description: "Team matches, fitness sessions, and outdoor games keep the campus active.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    className: "lg:col-span-2",
  },
  {
    title: "Creative Labs",
    description: "Workshops, media projects, and innovation challenges in every semester.",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Team Projects",
    description:
      "Collaborative student work that bridges classroom learning with real-world impact.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Campus Evenings",
    description: "Friendly social spaces and events that bring students together after classes.",
    image:
      "https://images.unsplash.com/photo-1530099486328-e021101a494a?auto=format&fit=crop&w=800&q=80",
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

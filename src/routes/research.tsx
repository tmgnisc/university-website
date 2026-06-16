import { createFileRoute } from "@tanstack/react-router";
import { Cpu, FlaskConical, Lightbulb, Microscope } from "lucide-react";

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

const RESEARCH_BENTO: BentoItem[] = [
  {
    title: "AI & Machine Learning Lab",
    description: "Experiment with neural networks, computer vision, and natural language processing projects.",
    image: "https://placehold.co/800x600",
    badge: "AI / ML",
    className: "sm:col-span-2 lg:col-span-3 lg:row-span-2 min-h-[320px]",
  },
  {
    title: "Active Projects",
    description: "Student and faculty research initiatives running each semester.",
    variant: "stat",
    stat: "20+",
    className: "lg:col-span-1",
  },
  {
    title: "IoT & Robotics",
    description: "Sensors, embedded systems, and autonomous robot prototypes.",
    image: "https://placehold.co/600x450",
    className: "lg:col-span-2",
  },
  {
    title: "Ed-Tech Research",
    description: "Studies on digital learning tools, classroom analytics, and instructional design.",
    image: "https://placehold.co/600x450",
    className: "lg:col-span-2",
  },
];

const PROJECTS = [
  { title: "Smart Agriculture IoT", description: "Soil moisture sensors and automated irrigation for local farms.", image: "https://placehold.co/500x300" },
  { title: "Nepali NLP Toolkit", description: "Open-source language tools for Nepali text processing and chatbots.", image: "https://placehold.co/500x300" },
  { title: "VR Classroom Pilot", description: "Immersive learning modules for science and IT education.", image: "https://placehold.co/500x300" },
  { title: "Cybersecurity Audit", description: "Vulnerability assessment framework for small business networks.", image: "https://placehold.co/500x300" },
  { title: "Learning Analytics", description: "Dashboard tracking student engagement in digital courses.", image: "https://placehold.co/500x300" },
  { title: "Green Campus Initiative", description: "Energy monitoring and sustainability reporting system.", image: "https://placehold.co/500x300" },
];

const PUBLICATIONS = [
  { year: "2025", title: "Applied ML in Eastern Nepal", description: "Conference paper on deploying machine learning solutions for regional agriculture." },
  { year: "2024", title: "Digital Pedagogy Review", description: "Faculty publication on LMS adoption in Nepali secondary schools." },
  { year: "2024", title: "IoT for Smart Cities", description: "Student-led research presented at the National Innovation Summit." },
  { year: "2023", title: "Open Data in Education", description: "White paper on transparent academic data sharing practices." },
];

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — WhiteHouse College of Business & Technology" },
      { name: "description", content: "Explore research labs, innovation projects, and publications at WCBT Jhapa Campus." },
    ],
    links: [{ rel: "canonical", href: "/research" }],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Research & Innovation"
        title="Where ideas become impact"
        description="WCBT fosters a hands-on research culture in AI, IoT, ed-tech, and applied innovation — connecting students with real-world problems."
        image="https://placehold.co/900x600"
      />

      <HighlightBand
        badge="Innovation Ecosystem"
        title="Labs built for discovery"
        description="From freshman projects to faculty-led studies, research at WCBT bridges academic theory and practical solutions for Nepal and beyond."
      />

      <PageSection
        eyebrow="Research facilities"
        title="Explore our labs"
        description="State-of-the-art spaces where students and faculty experiment, prototype, and publish."
      >
        <BentoGrid items={RESEARCH_BENTO} />
      </PageSection>

      <SplitSection
        eyebrow="Our approach"
        title="Research that solves real problems"
        description="We prioritize applied research with community and industry relevance. Students don't just read about technology — they build solutions that matter."
        image="https://placehold.co/800x600"
        bullets={[
          "Faculty mentorship on every major project",
          "Cross-disciplinary teams from BIT and B.Tech Ed IT",
          "Partnerships with local industry and schools",
          "Annual innovation expo showcasing outcomes",
        ]}
      />

      <PageSection
        eyebrow="Focus areas"
        title="What we explore"
        description="Core research domains aligned with our programs and regional needs."
        className="bg-muted/30"
      >
        <IconFeatureGrid
          items={[
            { icon: Cpu, title: "Artificial Intelligence", description: "Machine learning, computer vision, and intelligent systems for local applications." },
            { icon: FlaskConical, title: "IoT & Embedded Systems", description: "Connected devices, sensor networks, and automation prototypes." },
            { icon: Microscope, title: "Ed-Tech Research", description: "Digital learning effectiveness, instructional design, and classroom technology." },
            { icon: Lightbulb, title: "Innovation & Startups", description: "Idea incubation, prototyping support, and entrepreneurship mentoring." },
          ]}
        />
      </PageSection>

      <PageSection
        eyebrow="Active projects"
        title="Student & faculty research"
        description="A sample of ongoing and recent projects from our innovation community."
      >
        <CareerGrid items={PROJECTS} />
      </PageSection>

      <SplitSection
        eyebrow="Industry collaboration"
        title="Partnering for applied outcomes"
        description="We work with technology firms, NGOs, and educational institutions to ensure research addresses genuine needs and creates pathways to deployment."
        image="https://placehold.co/800x600"
        imageLeft
        bullets={[
          "Sponsored capstone projects with partner organizations",
          "Internship-linked research placements",
          "Guest researchers and visiting faculty sessions",
          "Joint workshops and publication support",
        ]}
      />

      <PageSection
        eyebrow="Publications"
        title="Sharing what we learn"
        description="Selected papers, presentations, and reports from the WCBT research community."
        className="bg-muted/30"
      >
        <Timeline items={PUBLICATIONS} />
      </PageSection>

      <CtaBand
        title="Join our research community"
        description="Whether you're a prospective student or industry partner, we'd love to explore collaboration opportunities."
        primaryLabel="Contact Research Office"
        secondaryLabel="View Programs"
      />
    </PageShell>
  );
}

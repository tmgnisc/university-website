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
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    className: "lg:col-span-2",
  },
  {
    title: "Ed-Tech Research",
    description: "Studies on digital learning tools, classroom analytics, and instructional design.",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&q=80",
    className: "lg:col-span-2",
  },
];

const PROJECTS = [
  { title: "Smart Agriculture IoT", description: "Soil moisture sensors and automated irrigation for local farms.", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80" },
  { title: "Nepali NLP Toolkit", description: "Open-source language tools for Nepali text processing and chatbots.", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80" },
  { title: "VR Classroom Pilot", description: "Immersive learning modules for science and IT education.", image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=800&q=80" },
  { title: "Cybersecurity Audit", description: "Vulnerability assessment framework for small business networks.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" },
  { title: "Learning Analytics", description: "Dashboard tracking student engagement in digital courses.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" },
  { title: "Green Campus Initiative", description: "Energy monitoring and sustainability reporting system.", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80" },
];

const PUBLICATIONS = [
  {
    year: "2025",
    title: "Applied ML in Eastern Nepal",
    description:
      "Conference paper on deploying machine learning solutions for regional agriculture.",
  },
  {
    year: "2024",
    title: "Digital Pedagogy Review",
    description: "Faculty publication on LMS adoption in Nepali secondary schools.",
  },
  {
    year: "2024",
    title: "IoT for Smart Cities",
    description: "Student-led research presented at the National Innovation Summit.",
  },
  {
    year: "2023",
    title: "Open Data in Education",
    description: "White paper on transparent academic data sharing practices.",
  },
];

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Explore research labs, innovation projects, and publications at WCBT Jhapa Campus.",
      },
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
        title="Research & Innovation Ecosystem"
        description="Research is an integral part of the academic culture at WhiteHouse College. Our commitment to research helps create a learning environment where curiosity is encouraged, ideas are tested, and knowledge is continuously expanded."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%203.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <HighlightBand
        badge="From Classroom to Innovation"
        title="Hands-on labs in AI, Robotics, IoT and applied innovation"
        description="Through research projects, collaborations, and academic initiatives, students gain the opportunity to explore real-world challenges and develop practical solutions."
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
        image="https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=1200&q=80"
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
            {
              icon: Cpu,
              title: "Artificial Intelligence",
              description:
                "Machine learning, computer vision, and intelligent systems for local applications.",
            },
            {
              icon: FlaskConical,
              title: "IoT & Embedded Systems",
              description: "Connected devices, sensor networks, and automation prototypes.",
            },
            {
              icon: Microscope,
              title: "Ed-Tech Research",
              description:
                "Digital learning effectiveness, instructional design, and classroom technology.",
            },
            {
              icon: Lightbulb,
              title: "Innovation & Startups",
              description: "Idea incubation, prototyping support, and entrepreneurship mentoring.",
            },
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
        image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
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

      <PageSection eyebrow="AI LABS" title="Artificial Intelligence Research">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            The Artificial Intelligence (AI) Labs at WhiteHouse College provide students with
            hands-on experience in one of the fastest-growing fields of technology. Our labs are
            equipped with modern computing resources and guided by experienced faculty, where
            students can explore machine learning, data analytics, computer vision, natural language
            processing, and intelligent systems.
          </p>
        </div>
      </PageSection>

      <PageSection eyebrow="IOT LABS" title="Internet of Things Innovation">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            The Internet of Things (IoT) Labs are designed to give students practical exposure to
            connected technologies and smart systems. Through hands-on learning, students work with
            sensors, microcontrollers, networking technologies, and embedded systems to develop
            innovative solutions for real-world applications. These labs support experimentation,
            project-based learning, project development, research, theoretical application and
            development of various other skills.
          </p>
        </div>
      </PageSection>

      <PageSection
        eyebrow="INNOVATION CENTERS"
        title="Centers for Creativity & Entrepreneurship"
        className="bg-muted/30"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            By bringing together students, faculty members, industry professionals, and researchers,
            the centers create opportunities for collaboration, innovation, and interdisciplinary
            learning. The goal is to nurture a mindset of continuous improvement, leadership, and
            problem-solving while supporting the development of future innovators and entrepreneurs.
            The Innovation Centers at WhiteHouse College serve as hubs for creativity,
            entrepreneurship, and technological development. Students are encouraged to transform
            ideas into practical projects, prototypes, and solutions that address real-world needs.
          </p>
        </div>
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

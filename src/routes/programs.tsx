import { createFileRoute } from "@tanstack/react-router";

import { BentoGrid, PageHero, type BentoItem } from "@/components/sections/bento";
import {
  CareerGrid,
  CtaBand,
  HighlightBand,
  PageSection,
  ProgramCompare,
  ProgramQuickLinks,
  ProgramSpotlight,
  StepGrid,
} from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

const FACILITIES_BENTO: BentoItem[] = [
  {
    title: "AI & Innovation Lab",
    description: "Experiment with machine learning, robotics, and prototype development.",
    image: "https://placehold.co/600x450/86001d/ffffff?text=AI+Lab",
    className: "lg:col-span-2",
  },
  {
    title: "24/7 Library Access",
    description: "Digital and print resources for research and self-study.",
    variant: "stat",
    stat: "24/7",
    className: "lg:col-span-1",
  },
  {
    title: "Smart Classrooms",
    description: "Interactive displays and collaborative tools for modern teaching.",
    image: "https://placehold.co/500x400/4d0012/ffffff?text=Classroom",
    className: "lg:col-span-1",
  },
  {
    title: "Industry Mentorship",
    description: "Guest lectures, hackathons, and placement workshops year-round.",
    variant: "text",
    badge: "Support",
    className: "lg:col-span-2",
  },
];

const COMPARE_ROWS = [
  { label: "Degree focus", bit: "Software & IT systems", btech: "Technology in education" },
  { label: "Duration", bit: "4 years (8 semesters)", btech: "4 years (8 semesters)" },
  { label: "Ideal for", bit: "Aspiring developers & IT professionals", btech: "Future educators & ed-tech leaders" },
  { label: "Core skills", bit: "Programming, databases, networking, AI basics", btech: "Instructional design, LMS, digital pedagogy" },
  { label: "Internships", bit: "Software houses & IT firms", btech: "Schools, training centers & ed-tech startups" },
  { label: "KU affiliation", bit: "Yes", btech: "Yes" },
];

const ADMISSION_STEPS = [
  { step: "01", title: "Check eligibility", description: "Review academic requirements for +2 or equivalent qualifications in relevant streams." },
  { step: "02", title: "Submit application", description: "Complete the online form with transcripts, identification, and program preference." },
  { step: "03", title: "Entrance assessment", description: "Attend the admission test and interview scheduled by the admissions office." },
  { step: "04", title: "Enrollment", description: "Confirm your seat, complete fee payment, and join orientation week." },
];

const CAREER_PATHS = [
  {
    title: "Software Developer",
    description: "Build web and mobile applications for startups, enterprises, and government projects.",
    image: "https://placehold.co/500x300/86001d/ffffff?text=Developer",
  },
  {
    title: "IT Support & Systems Admin",
    description: "Manage networks, cloud infrastructure, and enterprise systems for organizations.",
    image: "https://placehold.co/500x300/4d0012/ffffff?text=IT+Admin",
  },
  {
    title: "Ed-Tech Specialist",
    description: "Design digital curricula and learning platforms for schools and training institutes.",
    image: "https://placehold.co/500x300/86001d/ffffff?text=EdTech",
  },
  {
    title: "ICT Teacher / Trainer",
    description: "Lead technology classrooms and professional development programs nationwide.",
    image: "https://placehold.co/500x300/4d0012/ffffff?text=Teacher",
  },
  {
    title: "Data & AI Analyst",
    description: "Turn data into insights for business, research, and public-sector innovation.",
    image: "https://placehold.co/500x300/86001d/ffffff?text=Data+AI",
  },
  {
    title: "Startup Founder",
    description: "Launch ventures in software, education technology, and digital services.",
    image: "https://placehold.co/500x300/4d0012/ffffff?text=Startup",
  },
];

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Explore BIT and B.Tech Ed IT programs at WCBT Jhapa Campus — Kathmandu University partnered degrees in Jhapa, Nepal.",
      },
      { property: "og:title", content: "Academic Programs at WCBT" },
      { property: "og:description", content: "BIT and B.Tech Ed IT — modern technology programs in Eastern Nepal." },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Academic Programs"
        title="Future-ready degrees in technology & education"
        description="KU-partnered undergraduate programs designed for careers in software, IT services, and technology-enabled teaching across Nepal and beyond."
      />

      <PageSection
        eyebrow="Choose your pathway"
        title="Two programs, one standard of excellence"
        description="Both degrees are delivered in partnership with Kathmandu University. Select the pathway that matches your career goals."
      >
        <ProgramQuickLinks
          programs={[
            {
              id: "bit",
              title: "BIT — Bachelor in Information Technology",
              summary: "Software engineering, databases, networking, and AI fundamentals for tech careers.",
              image: "https://placehold.co/500x350/86001d/ffffff?text=BIT",
            },
            {
              id: "btech-ed-it",
              title: "B.Tech Ed IT — Technology in Education",
              summary: "Digital pedagogy, instructional design, and IT integration for modern educators.",
              image: "https://placehold.co/500x350/4d0012/ffffff?text=B.Tech+Ed+IT",
            },
          ]}
        />
      </PageSection>

      <HighlightBand
        badge="KU Partnered"
        title="Nationally recognized qualifications"
        description="Every program follows Kathmandu University curriculum standards, ensuring your degree is respected by employers and institutions across Nepal."
      />

      <ProgramSpotlight
        id="bit"
        eyebrow="Program 01"
        title="BIT — Bachelor in Information Technology"
        description="A four-year undergraduate program for students who want to design, build, and maintain software systems. From programming fundamentals to capstone projects, BIT graduates leave with a portfolio that proves their skills."
        image="https://placehold.co/900x700/86001d/ffffff?text=BIT+Program"
        duration="4 Years · 8 Semesters"
        credits="126 Credit Hours"
        highlights={[
          "Object-oriented programming, web development, and mobile apps",
          "Database design, cloud computing, and network administration",
          "AI & machine learning fundamentals with lab projects",
          "Agile team projects and industry capstone in final year",
          "Internship placement with software and IT companies",
        ]}
        careers={[
          "Full-stack / frontend / backend developer",
          "Systems analyst or IT consultant",
          "DevOps and cloud support engineer",
          "Cybersecurity and network administrator",
          "Tech entrepreneur or product builder",
        ]}
      />

      <ProgramSpotlight
        id="btech-ed-it"
        eyebrow="Program 02"
        title="B.Tech Ed IT — Technology in Education"
        description="Designed for future educators and training professionals, this program blends information technology with pedagogy. Graduates lead digital transformation in classrooms, training centers, and educational institutions."
        image="https://placehold.co/900x700/4d0012/ffffff?text=B.Tech+Ed+IT"
        duration="4 Years · 8 Semesters"
        credits="126 Credit Hours"
        imageLeft
        highlights={[
          "Instructional design and learning management systems",
          "Educational multimedia, content authoring, and e-learning",
          "Classroom technology integration and digital assessment",
          "Teaching practicum in partner schools and institutions",
          "Research projects in ed-tech innovation",
        ]}
        careers={[
          "ICT teacher in schools and colleges",
          "Ed-tech content developer or instructional designer",
          "Training coordinator at NGOs and corporate L&D teams",
          "Learning platform administrator",
          "Education technology consultant",
        ]}
      />

      <PageSection
        eyebrow="Side by side"
        title="Compare our programs"
        description="Not sure which pathway fits you? Use this quick comparison to understand the focus, skills, and outcomes of each degree."
        className="bg-muted/30"
      >
        <ProgramCompare rows={COMPARE_ROWS} />
      </PageSection>

      <PageSection
        eyebrow="Learning environment"
        title="Facilities that support every program"
        description="Whether you pursue BIT or B.Tech Ed IT, you learn in labs and classrooms built for hands-on, collaborative work."
      >
        <BentoGrid items={FACILITIES_BENTO} />
      </PageSection>

      <PageSection
        eyebrow="Admissions"
        title="How to apply"
        description="Admissions are open for the upcoming intake. Follow these steps to begin your application at WCBT Jhapa Campus."
        className="bg-muted/30"
      >
        <StepGrid steps={ADMISSION_STEPS} />
      </PageSection>

      <PageSection
        eyebrow="After graduation"
        title="Where our graduates go"
        description="Both programs open doors to in-demand careers — in tech companies, schools, startups, and public-sector innovation."
      >
        <CareerGrid items={CAREER_PATHS} />
      </PageSection>

      <CtaBand
        title="Ready to start your application?"
        description="Join WCBT Jhapa Campus and earn a Kathmandu University partnered degree in BIT or B.Tech Ed IT."
        primaryLabel="Apply Now"
        secondaryLabel="Download Brochure"
      />
    </PageShell>
  );
}

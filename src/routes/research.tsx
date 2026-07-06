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

import content from "@/data/pages/research.json";

const RESEARCH_BENTO = content.bento as BentoItem[];
const PROJECTS = content.projects;
const PUBLICATIONS = content.publications;
const FOCUS_AREAS = resolveIcons(content.focusAreas);

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
        <IconFeatureGrid items={FOCUS_AREAS} />
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

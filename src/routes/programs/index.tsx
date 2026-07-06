import { createFileRoute } from "@tanstack/react-router";

import { BentoGrid, PageHero, type BentoItem } from "@/components/sections/bento";
import {
  CareerGrid,
  CtaBand,
  HighlightBand,
  PageSection,
  ProgramCompare,
  ProgramQuickLinks,
  StepGrid,
} from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

import content from "@/data/pages/programs-index.json";

const FACILITIES_BENTO = content.facilitiesBento as BentoItem[];
const COMPARE_ROWS = content.compareRows;
const ADMISSION_STEPS = content.admissionSteps;
const CAREER_PATHS = content.careerPaths;
const QUICK_LINKS = content.quickLinks;

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "Programs — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Explore BIT and B.Tech Ed IT programs at WCBT Jhapa Campus — Kathmandu University partnered degrees in Jhapa, Nepal.",
      },
      { property: "og:title", content: "Academic Programs at WCBT" },
      {
        property: "og:description",
        content: "BIT and B.Tech Ed IT — modern technology programs in Eastern Nepal.",
      },
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
        image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80"
      />

      <PageSection
        eyebrow="Choose your pathway"
        title="Two programs, one standard of excellence"
        description="Both degrees are delivered in partnership with Kathmandu University. Select the pathway that matches your career goals."
      >
        <ProgramQuickLinks programs={QUICK_LINKS} />
      </PageSection>

      <HighlightBand
        badge="KU Partnered"
        title="Nationally recognized qualifications"
        description="Every program follows Kathmandu University curriculum standards, ensuring your degree is respected by employers and institutions across Nepal."
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

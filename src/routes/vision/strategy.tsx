import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, FlaskConical, GraduationCap, Network, UsersRound } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/vision/strategy")({
  head: () => ({
    meta: [
      { title: "Strategy — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "WCBT strategic priorities for academic quality, industry exposure, research, and student success.",
      },
    ],
    links: [{ rel: "canonical", href: "/vision/strategy" }],
  }),
  component: StrategyPage,
});

function StrategyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Strategy"
        title="A focused plan for institutional growth"
        description="WCBT is growing through academic quality, stronger industry links, applied research, student support, and measurable outcomes."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%203.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />
      <PageSection
        eyebrow="Priorities"
        title="Where we are investing effort"
        description="Our strategy keeps the institution practical, accountable, and aligned with the future of work and education."
      >
        <IconFeatureGrid
          items={[
            {
              icon: GraduationCap,
              title: "Academic Quality",
              description:
                "Strengthen curriculum delivery, assessment, mentoring, and faculty development.",
            },
            {
              icon: Network,
              title: "Industry Exposure",
              description:
                "Expand internships, guest lectures, visits, projects, and employer engagement.",
            },
            {
              icon: FlaskConical,
              title: "Applied Research",
              description:
                "Build student and faculty capacity in AI, IoT, ed-tech, and local problem solving.",
            },
            {
              icon: UsersRound,
              title: "Student Success",
              description:
                "Improve advising, wellbeing, career support, and inclusive learning experiences.",
            },
            {
              icon: BarChart3,
              title: "Measurable Progress",
              description:
                "Track outcomes through admissions, retention, placements, partnerships, and feedback.",
            },
          ]}
        />
      </PageSection>
      <CtaBand
        title="Learn how strategy becomes action"
        description="Explore our research, industry exposure, and student support initiatives."
        primaryLabel="Industry Exposure"
        secondaryLabel="Research"
      />
    </PageShell>
  );
}

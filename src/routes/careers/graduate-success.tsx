import { createFileRoute } from "@tanstack/react-router";
import { Award, BriefcaseBusiness, GraduationCap, TrendingUp, Users } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/careers/graduate-success")({
  head: () => ({
    meta: [
      { title: "Graduate Success — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "Graduate outcomes, employability, further study, and career support at WCBT.",
      },
    ],
    links: [{ rel: "canonical", href: "/careers/graduate-success" }],
  }),
  component: GraduateSuccessPage,
});

function GraduateSuccessPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Graduate Success"
        title="Prepared for work, study, and leadership"
        description="WCBT supports graduate success through practical learning, mentoring, industry exposure, and career preparation."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
      />
      <PageSection
        eyebrow="Outcomes"
        title="What success looks like"
        description="Graduate success is not a single destination. Students prepare for employment, entrepreneurship, teaching, training, and further study."
      >
        <IconFeatureGrid
          items={[
            {
              icon: BriefcaseBusiness,
              title: "Employment Readiness",
              description:
                "Students build technical, communication, project, and workplace-readiness skills.",
            },
            {
              icon: GraduationCap,
              title: "Further Study",
              description:
                "KU-aligned academic preparation supports students considering graduate programs.",
            },
            {
              icon: TrendingUp,
              title: "Entrepreneurship",
              description:
                "Project work and innovation activities encourage students to explore startup thinking.",
            },
            {
              icon: Users,
              title: "Professional Network",
              description:
                "Events, mentors, internships, and partnerships help students build useful connections.",
            },
            {
              icon: Award,
              title: "Confidence & Leadership",
              description:
                "Students gain confidence through presentations, teamwork, activities, and practical work.",
            },
          ]}
        />
      </PageSection>
      <CtaBand
        title="Build your success story"
        description="Explore programs and placement support designed for long-term growth."
        primaryLabel="Explore Programs"
        secondaryLabel="Placements"
      />
    </PageShell>
  );
}

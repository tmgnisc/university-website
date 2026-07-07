import { createFileRoute } from "@tanstack/react-router";
import { BookOpenCheck, BriefcaseBusiness, GraduationCap, Handshake } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Mission — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "WCBT mission for accessible, practical, and future-ready higher education.",
      },
    ],
    links: [{ rel: "canonical", href: "/mission" }],
  }),
  component: MissionPage,
});

function MissionPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Mission"
        title="Empowering Eastern Nepal through future-ready education"
        description="Our mission is to make high-quality technology, business, and education programs accessible through practical learning, strong academic standards, and student-centered support."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%201.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />
      <PageSection
        eyebrow="What We Do"
        title="A mission built around access, quality, and opportunity"
        description="WCBT connects classroom learning with projects, industry exposure, research, and personal support so students are prepared for work, further study, and leadership."
      >
        <IconFeatureGrid
          items={[
            {
              icon: GraduationCap,
              title: "Accessible Higher Education",
              description:
                "Bring KU-aligned academic pathways closer to students across Jhapa and Eastern Nepal.",
            },
            {
              icon: BookOpenCheck,
              title: "Academic Quality",
              description:
                "Maintain rigorous teaching, assessment, and mentoring standards across every program.",
            },
            {
              icon: BriefcaseBusiness,
              title: "Practical Readiness",
              description:
                "Prepare students through projects, workshops, internships, and professional guidance.",
            },
            {
              icon: Handshake,
              title: "Community Impact",
              description:
                "Develop graduates who contribute to local industries, schools, startups, and communities.",
            },
          ]}
        />
      </PageSection>
      <CtaBand
        title="Start your academic journey"
        description="Explore programs designed around practical skills and long-term opportunity."
        primaryLabel="Explore Programs"
        secondaryLabel="Contact Us"
      />
    </PageShell>
  );
}

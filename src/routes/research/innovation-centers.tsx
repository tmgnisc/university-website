import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical, Handshake, Lightbulb, Rocket, UsersRound } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/research/innovation-centers")({
  head: () => ({
    meta: [
      { title: "Innovation Centers — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "Innovation, student projects, entrepreneurship, and applied research at WCBT.",
      },
    ],
    links: [{ rel: "canonical", href: "/research/innovation-centers" }],
  }),
  component: InnovationCentersPage,
});

function InnovationCentersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Innovation Centers"
        title="Where ideas become working projects"
        description="WCBT encourages students to test ideas, build prototypes, collaborate with mentors, and connect learning to local needs."
        image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
      />
      <PageSection
        eyebrow="Innovation Support"
        title="How the center supports students"
        description="Innovation activities bring together faculty guidance, industry input, project work, and entrepreneurial thinking."
      >
        <IconFeatureGrid
          items={[
            {
              icon: Lightbulb,
              title: "Idea Development",
              description:
                "Students learn how to identify problems, shape ideas, and define useful solutions.",
            },
            {
              icon: FlaskConical,
              title: "Applied Projects",
              description:
                "Project work turns classroom knowledge into prototypes, demos, and experiments.",
            },
            {
              icon: UsersRound,
              title: "Team Collaboration",
              description:
                "Students practice communication, planning, and delivery through group innovation work.",
            },
            {
              icon: Handshake,
              title: "Mentor Support",
              description:
                "Faculty and industry mentors guide students through technical and practical decisions.",
            },
            {
              icon: Rocket,
              title: "Startup Thinking",
              description:
                "Activities introduce students to entrepreneurship, validation, pitching, and iteration.",
            },
          ]}
        />
      </PageSection>
      <CtaBand
        title="Explore student innovation"
        description="Learn how WCBT connects research, projects, and industry exposure."
        primaryLabel="Research"
        secondaryLabel="Industry Exposure"
      />
    </PageShell>
  );
}

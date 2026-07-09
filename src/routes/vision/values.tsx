import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, Lightbulb, ShieldCheck, Star, Users } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/vision/values")({
  head: () => ({
    meta: [
      { title: "Values — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "The values that guide teaching, leadership, and student support at WCBT.",
      },
    ],
    links: [{ rel: "canonical", href: "/vision/values" }],
  }),
  component: ValuesPage,
});

function ValuesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Values"
        title="The principles behind every decision"
        description="Integrity, excellence, innovation, inclusiveness, and leadership shape how WCBT teaches, supports students, and grows as an institution."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />
      <PageSection
        eyebrow="Core Values"
        title="How our values show up on campus"
        description="These values guide academic delivery, student services, partnerships, and campus culture."
      >
        <IconFeatureGrid
          items={[
            {
              icon: ShieldCheck,
              title: "Integrity",
              description:
                "We promote honesty, responsibility, and ethical decision-making in academic and institutional life.",
            },
            {
              icon: Star,
              title: "Excellence",
              description:
                "We set high expectations for teaching, learning, service, and student outcomes.",
            },
            {
              icon: Lightbulb,
              title: "Innovation",
              description:
                "We encourage practical problem-solving, experimentation, and technology-enabled learning.",
            },
            {
              icon: Users,
              title: "Inclusiveness",
              description:
                "We support students from diverse backgrounds through guidance, access, and care.",
            },
            {
              icon: HeartHandshake,
              title: "Leadership",
              description:
                "We prepare students to take initiative, collaborate, and contribute with confidence.",
            },
          ]}
        />
      </PageSection>
      <CtaBand
        title="Experience our student-centered culture"
        description="Visit the campus or contact our team to learn how WCBT supports students."
        primaryLabel="Visit Campus"
        secondaryLabel="Student Support"
      />
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Users, TrendingUp, Award } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, HighlightBand, IconFeatureGrid, PageSection } from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications & Research — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Discover our commitment to research, scholarly activities, and academic publications.",
      },
      { property: "og:title", content: "Publications — WCBT Jhapa Campus" },
      {
        property: "og:description",
        content: "Learn about our research culture and academic publishing initiatives.",
      },
    ],
    links: [{ rel: "canonical", href: "/publications" }],
  }),
  component: PublicationsPage,
});

const RESEARCH_ACTIVITIES = [
  {
    icon: BookOpen,
    title: "Academic Journals",
    description: "Publication of peer-reviewed research in recognized national and international academic journals.",
  },
  {
    icon: Award,
    title: "Conference Presentations",
    description: "Faculty and student presentations at national and international academic conferences and seminars.",
  },
  {
    icon: Users,
    title: "Collaborative Research",
    description: "Interdisciplinary studies involving collaboration between faculty members, students, and external researchers.",
  },
  {
    icon: TrendingUp,
    title: "Innovation Projects",
    description: "Research projects focused on technology innovation, educational advancement, and social impact.",
  },
];

function PublicationsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Scholarly Excellence"
        title="Research & Publications"
        description="WhiteHouse College promotes a strong culture of research, innovation, and academic writing that contributes to knowledge creation and professional growth."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%201.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <PageSection
        eyebrow="Our Commitment"
        title="Fostering Academic Excellence"
      >
        <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto mb-8">
          WhiteHouse College promotes a strong culture of research, innovation, and academic writing. Faculty members, researchers, 
          and students are encouraged to engage in scholarly activities that contribute to knowledge creation and professional growth. 
          The college supports research publications, conference participation, academic journals, and interdisciplinary studies.
        </p>
        <IconFeatureGrid items={RESEARCH_ACTIVITIES} />
      </PageSection>

      <HighlightBand
        title="Knowledge Creation Through Research"
        description="By supporting scholarly activities, we create opportunities for faculty and students to contribute meaningfully to their fields and advance understanding in technology, education, and innovation."
      />

      <PageSection
        eyebrow="Research Focus Areas"
        title="Exploring Critical Domains"
        className="bg-muted/30"
      >
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Technology & Innovation",
              description:
                "Research in artificial intelligence, IoT systems, software engineering, and emerging technologies with real-world applications.",
            },
            {
              title: "Educational Technology",
              description:
                "Studies exploring digital learning tools, instructional design, online education, and technology-enhanced pedagogy.",
            },
            {
              title: "Applied Research",
              description:
                "Practical research projects addressing specific problems in industry, education, and community development.",
            },
            {
              title: "Interdisciplinary Studies",
              description:
                "Collaborative research combining perspectives from technology, education, business, and social sciences.",
            },
          ].map((area) => (
            <div key={area.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-lg">{area.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow="For Students & Faculty" title="Getting Involved in Research">
        <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto mb-8">
          Students and faculty are encouraged to participate in research projects, publish findings, and present at conferences. 
          This involvement develops critical thinking, strengthens professional credentials, and contributes to the advancement 
          of knowledge in their respective fields.
        </p>
      </PageSection>

      <CtaBand
        title="Join Our Research Community"
        description="Explore opportunities to contribute to innovative research and scholarly work at WCBT."
        primaryLabel="Learn About Research Programs"
        secondaryLabel="Contact Research Office"
      />
    </PageShell>
  );
}

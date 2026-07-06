import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, HighlightBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";
import { resolveIcons } from "@/lib/icon-registry";

import content from "@/data/pages/publications.json";

const RESEARCH_ACTIVITIES = resolveIcons(content.researchActivities);
const FOCUS_AREAS = content.focusAreas;

export const Route = createFileRoute("/about/publications")({
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
    links: [{ rel: "canonical", href: "/about/publications" }],
  }),
  component: PublicationsPage,
});

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

      <PageSection eyebrow="Our Commitment" title="Fostering Academic Excellence">
        <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto mb-8">
          WhiteHouse College promotes a strong culture of research, innovation, and academic
          writing. Faculty members, researchers, and students are encouraged to engage in scholarly
          activities that contribute to knowledge creation and professional growth. The college
          supports research publications, conference participation, academic journals, and
          interdisciplinary studies.
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
          {FOCUS_AREAS.map((area) => (
            <div key={area.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-lg">{area.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow="For Students & Faculty" title="Getting Involved in Research">
        <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto mb-8">
          Students and faculty are encouraged to participate in research projects, publish findings,
          and present at conferences. This involvement develops critical thinking, strengthens
          professional credentials, and contributes to the advancement of knowledge in their
          respective fields.
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

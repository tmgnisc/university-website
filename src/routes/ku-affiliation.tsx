import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, HighlightBand, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

import content from "@/data/pages/ku-affiliation.json";

const BENEFITS = content.benefits;

export const Route = createFileRoute("/ku-affiliation")({
  head: () => ({
    meta: [
      { title: "KU Affiliation — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Learn about our partnership with Kathmandu University and how it ensures academic excellence and recognized qualifications.",
      },
      { property: "og:title", content: "KU Affiliation — WCBT Jhapa Campus" },
      {
        property: "og:description",
        content: "Discover our Kathmandu University partnership and academic standards.",
      },
    ],
    links: [{ rel: "canonical", href: "/ku-affiliation" }],
  }),
  component: KUAffiliationPage,
});

function KUAffiliationPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="KU Partnership"
        title="Kathmandu University Affiliation"
        description="WhiteHouse College, Jhapa operates under the academic standards and quality framework of Kathmandu University, ensuring world-class education and recognized qualifications."
        image="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <PageSection
        eyebrow="Academic Excellence"
        title="Standards & Quality Framework"
        description="Through our partnership with Kathmandu University, we maintain rigorous academic standards that prepare our graduates for success."
      >
        <div className="prose prose-invert max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed text-muted-foreground">
            WhiteHouse College operates under the academic standards and quality framework of
            Kathmandu University. Through this affiliation, students benefit from a curriculum
            designed to promote critical thinking, practical application, innovation, and
            professional competence. The academic structure ensures that graduates are equipped with
            the knowledge and skills required for higher studies, professional careers, and lifelong
            learning.
          </p>
        </div>
      </PageSection>

      <HighlightBand
        title="Recognized Qualifications"
        description="Our degree programs follow Kathmandu University curricula and assessment standards, giving graduates nationally recognized qualifications backed by one of Nepal's leading universities."
      />

      <PageSection
        eyebrow="Partnership Benefits"
        title="What KU Affiliation Means for You"
        className="bg-muted/30"
      >
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:shadow-primary/10 transition-shadow"
            >
              <div className="size-10 rounded-lg bg-primary/10 text-primary grid place-items-center mb-4">
                <BookOpen className="size-5" />
              </div>
              <h3 className="font-semibold text-lg">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <CtaBand
        title="Learn More About Our Programs"
        description="Explore BIT and B.Tech Ed IT programs designed under KU affiliation standards."
        primaryLabel="View Programs"
        secondaryLabel="Schedule a Visit"
      />
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, HighlightBand, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";
import { resolveIcons } from "@/lib/icon-registry";

import content from "@/data/pages/governance.json";

const FRAMEWORK = resolveIcons(content.framework);
const GOVERNING_BODIES = content.governingBodies;
const PRINCIPLES = content.principles;

export const Route = createFileRoute("/about/governance")({
  head: () => ({
    meta: [
      { title: "Governance — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Learn about our transparent and accountable governance structure that supports academic excellence.",
      },
      { property: "og:title", content: "Governance — WCBT Jhapa Campus" },
      {
        property: "og:description",
        content:
          "Discover our commitment to transparency, accountability, and institutional excellence.",
      },
    ],
    links: [{ rel: "canonical", href: "/about/governance" }],
  }),
  component: GovernancePage,
});

function GovernancePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Institution Management"
        title="Governance & Leadership"
        description="WhiteHouse College follows a transparent, accountable, and participatory governance system that supports academic excellence and institutional growth."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <PageSection eyebrow="Our Structure" title="Transparent & Accountable Management">
        <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto mb-8">
          WhiteHouse College follows a transparent, accountable, and participatory governance system
          that supports academic excellence and institutional growth. The college is guided by
          experienced academic leaders, administrators, and governing bodies committed to
          maintaining high standards in education, research, and student services.
        </p>
      </PageSection>

      <HighlightBand
        title="Guided by Commitment to Excellence"
        description="Our governance structure ensures that every decision prioritizes student success, academic quality, and institutional sustainability."
      />

      <PageSection eyebrow="Governance Framework" title="Key Components" className="bg-muted/30">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FRAMEWORK.map((component) => (
            <div key={component.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="size-10 rounded-lg bg-primary/10 text-primary grid place-items-center mb-4">
                <component.icon className="size-5" />
              </div>
              <h3 className="font-semibold text-lg">{component.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {component.description}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow="Leadership" title="Our Governing Bodies">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {GOVERNING_BODIES.map((body) => (
              <div key={body.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold text-lg">{body.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {body.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection eyebrow="Commitment" title="Principles That Guide Us" className="bg-muted/30">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-lg">{principle.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <CtaBand
        title="Questions About Governance?"
        description="Contact our administration office for more information about institutional policies and leadership."
        primaryLabel="Contact Administration"
        secondaryLabel="Learn More About WCBT"
      />
    </PageShell>
  );
}

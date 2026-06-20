import { createFileRoute } from "@tanstack/react-router";
import { Shield, Users, Zap, Award } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, HighlightBand, PageSection } from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/governance")({
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
    links: [{ rel: "canonical", href: "/governance" }],
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
          {[
            {
              icon: Shield,
              title: "Academic Oversight",
              description:
                "Program quality is monitored through Kathmandu University guidelines, internal reviews, and continuous faculty development initiatives.",
            },
            {
              icon: Users,
              title: "Participatory Leadership",
              description:
                "Experienced academic leaders and administrators collaborate with faculty, staff, and student representatives in decision-making.",
            },
            {
              icon: Award,
              title: "Quality Assurance",
              description:
                "Regular assessments, accreditation reviews, and performance metrics ensure institutional standards are maintained and improved.",
            },
            {
              icon: Zap,
              title: "Institutional Accountability",
              description:
                "Transparent reporting, financial oversight, and compliance with regulatory standards demonstrate our commitment to responsible management.",
            },
          ].map((component) => (
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
            {[
              {
                title: "Institutional Board",
                description:
                  "Provides strategic oversight and long-term vision for institutional development and sustainability.",
              },
              {
                title: "Academic Council",
                description:
                  "Oversees curriculum development, program quality, and faculty development initiatives.",
              },
              {
                title: "Administrative Leadership",
                description:
                  "Manages daily operations, student services, and institutional support systems.",
              },
            ].map((body) => (
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
          {[
            {
              title: "Transparency",
              description:
                "Open communication about policies, decisions, and performance metrics affecting the college community.",
            },
            {
              title: "Accountability",
              description:
                "Clear responsibility for outcomes and continuous monitoring of institutional performance.",
            },
            {
              title: "Student-Centered Focus",
              description:
                "Every policy and decision prioritizes student success, safety, and overall development.",
            },
            {
              title: "Academic Integrity",
              description:
                "Maintaining high standards in teaching, research, and institutional reputation through ethical practices.",
            },
          ].map((principle) => (
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

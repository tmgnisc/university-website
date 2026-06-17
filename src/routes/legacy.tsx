import { createFileRoute } from "@tanstack/react-router";
import { Heart, Users, Star, TrendingUp } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, HighlightBand, PageSection, Timeline } from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/legacy")({
  head: () => ({
    meta: [
      { title: "Our Legacy — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Explore the achievements, milestones, and impact that define WhiteHouse College's journey.",
      },
      { property: "og:title", content: "Our Legacy — WCBT Jhapa Campus" },
      {
        property: "og:description",
        content: "Discover the trust, achievements, and excellence that define our institution.",
      },
    ],
    links: [{ rel: "canonical", href: "/legacy" }],
  }),
  component: LegacyPage,
});

const LEGACY_MILESTONES = [
  {
    year: "2014",
    title: "Foundation Established",
    description: "WhiteHouse Education Foundation begins its mission to expand quality higher education in Eastern Nepal.",
  },
  {
    year: "2018",
    title: "WCBT Jhapa Campus Opens",
    description: "The first campus launches with a focus on technology and business education, serving the Jhapa region.",
  },
  {
    year: "2021",
    title: "KU Partnership Formalized",
    description: "Kathmandu University affiliation brings recognized BIT and B.Tech Ed IT programs to our campus.",
  },
  {
    year: "2024",
    title: "Regional Impact Recognition",
    description: "WCBT becomes recognized as a trusted institution contributing to Eastern Nepal's educational and technological advancement.",
  },
  {
    year: "2026",
    title: "Expanding Excellence",
    description: "New research labs, expanded facilities, and growing industry partnerships strengthen our academic ecosystem.",
  },
];

function LegacyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our Story"
        title="A Legacy of Excellence"
        description="Our legacy is reflected in the achievements of our graduates, the dedication of our faculty, and the confidence placed in us by students, parents, and industry partners."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%203.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <PageSection
        eyebrow="What We Stand For"
        title="Trusted Name in Higher Education"
      >
        <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto mb-8">
          For years, WhiteHouse has been recognized as a trusted name in higher education, dedicated to nurturing generations 
          of students through quality teaching, innovation, and academic excellence. Our legacy is built on the achievements 
          of our graduates, the dedication of our faculty, and the confidence placed in us by students, parents, and industry partners.
        </p>
      </PageSection>

      <HighlightBand
        title="Building on Solid Foundations"
        description="Our commitment to academic excellence, student success, and community impact has shaped our identity and guided our growth."
      />

      <PageSection
        eyebrow="Our Journey"
        title="Milestones That Define Us"
        className="bg-muted/30"
      >
        <Timeline items={LEGACY_MILESTONES} />
      </PageSection>

      <PageSection
        eyebrow="Our Achievements"
        title="Proud Accomplishments"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: Heart, label: "Student Success", value: "500+" },
            { icon: Users, label: "Graduates Placed", value: "400+" },
            { icon: Star, label: "Industry Partners", value: "50+" },
            { icon: TrendingUp, label: "Years of Excellence", value: "12+" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="size-12 rounded-lg bg-primary/10 text-primary grid place-items-center mx-auto mb-4">
                <stat.icon className="size-6" />
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="Our Values"
        title="What Drives Our Legacy"
      >
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Academic Excellence",
              description: "Rigorous standards, innovative teaching, and continuous improvement in all we do.",
            },
            {
              title: "Student-Centered Approach",
              description: "Every decision prioritizes student success, growth, and career readiness.",
            },
            {
              title: "Community Impact",
              description: "Creating positive change through education, research, and community engagement.",
            },
          ].map((value) => (
            <div key={value.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-lg">{value.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <CtaBand
        title="Be Part of Our Growing Legacy"
        description="Join thousands of students who have chosen WCBT for their academic and professional journey."
        primaryLabel="Apply Now"
        secondaryLabel="Learn More"
      />
    </PageShell>
  );
}

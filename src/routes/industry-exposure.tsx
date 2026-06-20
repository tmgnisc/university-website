import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Users, Target, Zap } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import {
  CtaBand,
  HighlightBand,
  IconFeatureGrid,
  PageSection,
} from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/industry-exposure")({
  head: () => ({
    meta: [
      { title: "Industry Exposure — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Discover how we bridge the gap between academic learning and real-world industry experience.",
      },
      { property: "og:title", content: "Industry Exposure — WCBT Jhapa Campus" },
      {
        property: "og:description",
        content: "Learn about our industry partnerships and real-world learning opportunities.",
      },
    ],
    links: [{ rel: "canonical", href: "/industry-exposure" }],
  }),
  component: IndustryExposurePage,
});

const EXPOSURE_METHODS = [
  {
    icon: Briefcase,
    title: "Internships",
    description:
      "Semester-long and summer internships with technology companies, startups, and businesses.",
  },
  {
    icon: Users,
    title: "Mentorship Programs",
    description:
      "One-on-one guidance from industry professionals and alumni working in leading organizations.",
  },
  {
    icon: Target,
    title: "Workshops & Seminars",
    description:
      "Regular training sessions on emerging technologies, professional skills, and industry best practices.",
  },
  {
    icon: Zap,
    title: "Industry Visits",
    description:
      "Field trips and campus visits from companies to expose students to real workplace environments.",
  },
];

const OPPORTUNITIES = [
  {
    title: "Problem-Solving Skills",
    description:
      "Apply classroom knowledge to real-world challenges, developing the critical thinking and adaptability required in modern workplaces.",
  },
  {
    title: "Teamwork & Communication",
    description:
      "Collaborate with professionals from diverse backgrounds, building the soft skills essential for career success.",
  },
  {
    title: "Professional Network",
    description:
      "Build relationships with mentors, recruiters, and industry leaders that can lead to internships, job placements, and career opportunities.",
  },
  {
    title: "Industry Insights",
    description:
      "Gain firsthand knowledge of industry trends, technologies, and career pathways to make informed decisions about your future.",
  },
  {
    title: "Practical Confidence",
    description:
      "Experience working in professional settings, building the confidence and readiness needed to transition from student to professional.",
  },
  {
    title: "Career Preparation",
    description:
      "Understand workplace expectations, develop professional habits, and prepare for job interviews and career advancement.",
  },
];

function IndustryExposurePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Industry Connection"
        title="Real-World Learning Experience"
        description="Through collaborations with businesses, organizations, and professionals, students benefit from practical exposure that bridges academic learning and industry requirements."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <PageSection eyebrow="Our Approach" title="Learning Beyond the Classroom">
        <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto mb-8">
          At WhiteHouse College, learning extends beyond the classroom. We believe that practical
          experience plays a vital role in professional success. Students are provided with
          opportunities to participate in internships, industrial visits, field projects, workshops,
          seminars, and interactions with industry experts.
        </p>
        <IconFeatureGrid items={EXPOSURE_METHODS} />
      </PageSection>

      <HighlightBand
        title="Why Industry Exposure Matters"
        description="Students who engage with real industry experience gain the confidence, skills, and networks needed to excel in their careers and contribute meaningfully to their professions."
      />

      <PageSection eyebrow="Development" title="Skills You'll Develop" className="bg-muted/30">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {OPPORTUNITIES.map((opp) => (
            <div key={opp.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-lg">{opp.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {opp.description}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow="Our Partners" title="Industry Collaboration">
        <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto">
          WhiteHouse College collaborates with leading technology companies, startups, educational
          institutions, and organizations across Nepal and the region. These partnerships ensure
          that our students gain exposure to diverse industries, technologies, and career pathways.
        </p>
      </PageSection>

      <CtaBand
        title="Ready to Gain Industry Experience?"
        description="Explore our programs and discover how we prepare you for real-world professional success."
        primaryLabel="Explore Programs"
        secondaryLabel="Schedule Campus Visit"
      />
    </PageShell>
  );
}

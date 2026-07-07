import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Handshake, Lightbulb, Network, Target } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/advisors")({
  head: () => ({
    meta: [
      { title: "Advisors — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "Academic and industry advisors supporting WCBT programs and student exposure.",
      },
    ],
    links: [{ rel: "canonical", href: "/advisors" }],
  }),
  component: AdvisorsPage,
});

function AdvisorsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Advisors"
        title="Guidance from academics and industry"
        description="Our advisors help align learning, projects, and exposure with academic standards and workplace needs."
        image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
      />
      <PageSection
        eyebrow="Advisory Role"
        title="Why advisors matter"
        description="Advisors bring outside perspective into academic planning. They help the college understand what students need for higher study, employment, industry exposure, and real-world project work."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">Academic advisors</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Academic advisors support program quality by reviewing learning priorities, suggesting
              improvements, and helping faculty keep teaching connected to current academic
              standards. Their role is especially important for curriculum relevance, research
              direction, and student progression.
            </p>
          </article>
          <article className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">Industry advisors</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Industry advisors help students and faculty understand workplace expectations. They
              contribute through guest sessions, project feedback, internship connections, and
              guidance on skills that matter in technology, education, business, and innovation.
            </p>
          </article>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Advisory Support"
        title="How advisors strengthen WCBT"
        className="bg-muted/30"
      >
        <IconFeatureGrid
          items={[
            {
              icon: Target,
              title: "Academic Direction",
              description: "Guidance on quality, curriculum relevance, and learning outcomes.",
            },
            {
              icon: Network,
              title: "Industry Links",
              description: "Connections that support visits, talks, internships, and projects.",
            },
            {
              icon: Lightbulb,
              title: "Innovation Input",
              description: "Advice on emerging technology, research, and practical learning.",
            },
            {
              icon: Handshake,
              title: "Mentorship",
              description: "Support for students, faculty, and institutional development.",
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Student Benefit" title="How students benefit from advisors">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-6 md:p-8">
          <ul className="grid gap-3 md:grid-cols-2">
            {[
              "Exposure to current industry practices and professional expectations.",
              "Better project ideas through feedback from academic and industry perspectives.",
              "Mentorship opportunities through guest lectures, talks, visits, and workshops.",
              "Clearer understanding of career paths, internships, and graduate study options.",
              "Support for innovation, entrepreneurship, and applied research activities.",
              "A stronger bridge between classroom learning and real workplace needs.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      <CtaBand
        title="Connect with WCBT"
        description="Reach out for academic or partnership inquiries."
        primaryLabel="Contact Us"
        secondaryLabel="Industry Exposure"
      />
    </PageShell>
  );
}

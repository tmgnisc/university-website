import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness, CheckCircle2, FileUser, Handshake, UsersRound } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, PageSection } from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Placements — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Placement support, internship preparation, employer connections, and career guidance for WCBT students.",
      },
    ],
    links: [{ rel: "canonical", href: "/placements" }],
  }),
  component: PlacementsPage,
});

const PLACEMENT_STEPS = [
  {
    icon: FileUser,
    title: "Profile Readiness",
    description:
      "Students receive guidance on CVs, portfolios, project presentation, and interview preparation.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Internship Support",
    description:
      "The college helps students identify internship opportunities that match their skills and program pathway.",
  },
  {
    icon: Handshake,
    title: "Employer Connections",
    description:
      "Industry exposure, visits, and partner conversations connect students with real workplace expectations.",
  },
  {
    icon: UsersRound,
    title: "Career Mentoring",
    description:
      "Faculty and advisors help students plan for employment, entrepreneurship, and further study.",
  },
];

function PlacementsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Placements"
        title="Career support from classroom to workplace"
        description="WCBT supports students with internship preparation, employer exposure, and career guidance for the next step after graduation."
        image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
      />

      <PageSection
        eyebrow="Placement Overview"
        title="How placement support works"
        description="Placement support is a gradual process. Students first build academic and project foundations, then strengthen communication and workplace readiness, and finally connect with internship and career opportunities."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Prepare",
              description:
                "Students work on CVs, portfolios, communication, project documentation, and interview confidence.",
            },
            {
              title: "Connect",
              description:
                "The college connects students with industry exposure, employer talks, visits, and internship guidance.",
            },
            {
              title: "Improve",
              description:
                "Students use feedback from faculty, mentors, and employers to improve skills and readiness.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-3xl border border-border bg-card p-6">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="Placement Support"
        title="How we prepare students"
        description="Placement support starts before graduation, combining skill preparation with practical exposure."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {PLACEMENT_STEPS.map((step) => (
            <article key={step.title} className="rounded-3xl border border-border bg-card p-6">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <step.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow="Readiness Areas" title="What students should build before placement">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-6 md:p-8">
          <ul className="grid gap-3 md:grid-cols-2">
            {[
              "A clear CV that presents education, projects, skills, and activities.",
              "A practical project or portfolio that shows problem-solving ability.",
              "Basic workplace communication, punctuality, teamwork, and reporting habits.",
              "Confidence explaining technical work in interviews or presentations.",
              "Awareness of career paths in software, IT support, ed-tech, analytics, teaching, and startups.",
              "Willingness to learn from feedback during internships, visits, and mentoring sessions.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Student Checklist"
        title="What students can expect"
        className="bg-muted/30"
      >
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 md:p-8">
          <ul className="space-y-3">
            {[
              "Career orientation and pathway guidance",
              "CV, interview, and communication preparation",
              "Internship and project-readiness support",
              "Employer exposure through visits, talks, and partnerships",
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
        title="Planning your career path?"
        description="Talk with the college team about internships, projects, and graduate opportunities."
        primaryLabel="Contact Career Support"
        secondaryLabel="Explore Careers"
      />
    </PageShell>
  );
}

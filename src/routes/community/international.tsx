import { createFileRoute } from "@tanstack/react-router";
import { BookOpenCheck, CheckCircle2, Globe2, GraduationCap, Plane } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/community/international")({
  head: () => ({
    meta: [
      { title: "International — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "International outlook, academic standards, and future mobility pathways at WCBT.",
      },
    ],
    links: [{ rel: "canonical", href: "/community/international" }],
  }),
  component: InternationalPage,
});

function InternationalPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="International"
        title="Learning with a global outlook"
        description="WCBT encourages global perspectives through KU-aligned standards, digital learning, and future mobility pathways."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
      />
      <PageSection
        eyebrow="Global Outlook"
        title="What international perspective means at WCBT"
        description="International does not only mean studying abroad. It means preparing students to understand global standards, digital work, cross-cultural communication, and the expectations of modern technology and education careers."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">Academic preparation</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              KU-aligned academic delivery gives students a structured foundation for graduate
              study, professional certifications, and future academic mobility. Students are
              encouraged to build strong portfolios, communication skills, and project experience.
            </p>
          </article>
          <article className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">Career readiness</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Technology and education careers increasingly require global awareness. WCBT supports
              students through digital learning exposure, English communication practice,
              presentation work, and practical skills that transfer across workplaces.
            </p>
          </article>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Global Readiness"
        title="International perspectives at WCBT"
        className="bg-muted/30"
      >
        <IconFeatureGrid
          items={[
            {
              icon: Globe2,
              title: "Global Perspective",
              description: "Programs connect students with technology trends and global practices.",
            },
            {
              icon: BookOpenCheck,
              title: "Academic Standards",
              description: "KU-aligned delivery prepares students for higher study and careers.",
            },
            {
              icon: GraduationCap,
              title: "Future Study",
              description:
                "Guidance supports students considering graduate study in Nepal or abroad.",
            },
            {
              icon: Plane,
              title: "Mobility Pathways",
              description:
                "The college continues building links that expand student opportunities.",
            },
          ]}
        />
      </PageSection>

      <PageSection
        eyebrow="Student Preparation"
        title="How students can prepare for global pathways"
      >
        <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-6 md:p-8">
          <ul className="grid gap-3 md:grid-cols-2">
            {[
              "Build a strong academic record through consistent coursework and assessments.",
              "Develop project portfolios that show practical technical and problem-solving ability.",
              "Improve communication, presentation, teamwork, and documentation skills.",
              "Participate in workshops, seminars, research activities, and industry exposure.",
              "Discuss graduate study plans early with faculty, advisors, and administration.",
              "Stay informed about documentation, deadlines, scholarships, and program requirements.",
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
        title="Explore future pathways"
        description="Talk with WCBT about programs, preparation, and international study goals."
        primaryLabel="Contact Us"
        secondaryLabel="Programs"
      />
    </PageShell>
  );
}

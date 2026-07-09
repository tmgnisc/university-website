import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ClipboardCheck, FileText, Headphones, Users } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/community/administration")({
  head: () => ({
    meta: [
      { title: "Administration — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "Administrative services and campus coordination at WCBT Jhapa Campus.",
      },
    ],
    links: [{ rel: "canonical", href: "/community/administration" }],
  }),
  component: AdministrationPage,
});

function AdministrationPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Administration"
        title="Campus services that keep students supported"
        description="The administration team coordinates admissions, records, student services, and daily campus operations."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%201.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />
      <PageSection
        eyebrow="Campus Operations"
        title="The office students rely on"
        description="Administration connects students, families, faculty, and leadership. The team supports daily campus operations while helping students complete important academic and administrative steps on time."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "For students",
              description:
                "Help with notices, documents, attendance coordination, fee questions, support requests, and campus information.",
            },
            {
              title: "For parents",
              description:
                "Guidance on admissions, program information, fee procedures, student progress, and campus visits.",
            },
            {
              title: "For faculty",
              description:
                "Coordination for schedules, records, student communication, activities, and academic operations.",
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

      <PageSection eyebrow="Services" title="How administration helps" className="bg-muted/30">
        <IconFeatureGrid
          items={[
            {
              icon: FileText,
              title: "Admissions Support",
              description: "Guidance for applications, documents, and enrollment steps.",
            },
            {
              icon: ClipboardCheck,
              title: "Records & Coordination",
              description: "Support for academic records, notices, and student coordination.",
            },
            {
              icon: Headphones,
              title: "Student Services",
              description: "Help with routine questions, support requests, and campus guidance.",
            },
            {
              icon: Users,
              title: "Campus Operations",
              description: "Daily coordination across departments, faculty, and students.",
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Common Requests" title="What you can contact administration for">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-6 md:p-8">
          <ul className="grid gap-3 md:grid-cols-2">
            {[
              "Admissions process, required documents, and application guidance.",
              "Program information, class notices, and academic coordination.",
              "Fee information, payment timelines, and office procedures.",
              "Campus visit support and general inquiry handling.",
              "Student support routing for counselling, financial advice, or accessibility needs.",
              "Certificates, records, notices, and coordination with faculty or program teams.",
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
        title="Need administrative help?"
        description="Contact the campus office for admissions, records, and general support."
        primaryLabel="Contact Administration"
        secondaryLabel="Visit Campus"
      />
    </PageShell>
  );
}

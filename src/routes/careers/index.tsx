import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import {
  CareerGrid,
  CtaBand,
  HighlightBand,
  IconFeatureGrid,
  PageSection,
} from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";
import { Button } from "@/components/ui/button";
import { resolveIcons } from "@/lib/icon-registry";

import content from "@/data/pages/careers.json";

const HR_EMAIL = "hr@whitehouseeducation.edu.np";

const OPEN_POSITION = content.openPosition;
const CAREER_AREAS = resolveIcons(content.careerAreas);
const FURTHER_STUDIES = content.furtherStudies;
const CAREER_SUPPORT = content.careerSupport;

export const Route = createFileRoute("/careers/")({
  head: () => ({
    meta: [
      { title: "Careers — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "Discover the diverse career paths and opportunities available to WCBT graduates.",
      },
      { property: "og:title", content: "Careers — WCBT Jhapa Campus" },
      {
        property: "og:description",
        content: "Explore where our graduates go and the opportunities awaiting them.",
      },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

const CAREER_PATHS = content.careerPaths;

function CareersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Career Pathways"
        title="Where Our Graduates Go"
        description="When pursuing employment, entrepreneurship, or further studies, our graduates are prepared to contribute, innovate, and lead in their chosen fields."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <PageSection eyebrow="Diverse Opportunities" title="Professional Success After Graduation">
        <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto mb-8">
          The programs offered at WhiteHouse College prepare students for a wide range of
          professional opportunities in technology, education, business, and innovation. Our
          graduates are equipped with the knowledge, skills, and networks needed to excel in
          competitive global and local job markets.
        </p>
      </PageSection>

      <PageSection
        eyebrow="We're Hiring"
        title="Current Openings"
        description="Join our team and help shape the next generation of technology professionals."
        className="bg-muted/30"
      >
        <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 shadow-xl shadow-primary/5 md:p-10">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {OPEN_POSITION.type}
          </span>
          <h3 className="mt-4 text-2xl font-bold tracking-tight">{OPEN_POSITION.title}</h3>
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 text-primary" />
            {OPEN_POSITION.location}
          </p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Qualifications
              </h4>
              <ul className="mt-4 space-y-2.5">
                {OPEN_POSITION.qualifications.map((q) => (
                  <li key={q} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Experience
              </h4>
              <ul className="mt-4 space-y-2.5">
                {OPEN_POSITION.experience.map((e) => (
                  <li key={e} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              How to apply
            </h4>
            <p className="mt-3 text-sm text-muted-foreground">
              Send your CV and application to our HR team. For any queries, reach out using the
              contact details below.
            </p>
            <div className="mt-5 space-y-3 text-sm">
              <a
                href={`mailto:${HR_EMAIL}`}
                className="inline-flex items-center gap-2.5 font-medium text-foreground hover:text-primary"
              >
                <Mail className="size-4 text-primary" />
                {HR_EMAIL}
              </a>
              <p className="flex items-center gap-2.5 text-muted-foreground">
                <Phone className="size-4 text-primary" />
                9714530056, 9714530057
              </p>
              <p className="flex items-center gap-2.5 text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                {OPEN_POSITION.location}
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="mt-6 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
            >
              <a href={`mailto:${HR_EMAIL}?subject=Application: ${OPEN_POSITION.title}`}>
                Apply via Email <ArrowRight className="ml-1 size-4" />
              </a>
            </Button>
          </div>
        </div>
      </PageSection>

      <HighlightBand
        title="Prepared for Every Path"
        description="Whether you choose employment, entrepreneurship, or further studies, WCBT provides the foundation for your success."
      />

      <PageSection eyebrow="Career Options" title="Explore Opportunities" className="bg-muted/30">
        <CareerGrid items={CAREER_PATHS} />
      </PageSection>

      <PageSection eyebrow="Key Career Areas" title="Where WCBT Graduates Thrive">
        <IconFeatureGrid items={CAREER_AREAS} />
      </PageSection>

      <PageSection eyebrow="Further Studies" title="Pathways to Higher Education">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed text-muted-foreground mb-8">
            Many graduates pursue advanced degrees at leading universities in Nepal and abroad. Our
            rigorous undergraduate programs, combined with our KU affiliation, prepare students for
            successful admission to master's programs, research opportunities, and specialized
            certifications.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {FURTHER_STUDIES.map((path) => (
              <div key={path.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold text-lg">{path.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {path.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection eyebrow="Success Stories" title="Our Alumni Network" className="bg-muted/30">
        <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto">
          WCBT graduates work across Nepal and internationally, contributing to innovative projects,
          leading organizations, and creating positive change through technology and education. They
          form a strong network that supports current students through mentorship, internships, and
          career opportunities.
        </p>
      </PageSection>

      <PageSection eyebrow="Career Support" title="We Support Your Success">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {CAREER_SUPPORT.map((support) => (
            <div key={support.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-lg">{support.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {support.description}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <CtaBand
        title="Ready to Start Your Career Journey?"
        description="Explore our programs and discover how WCBT prepares you for success."
        primaryLabel="View Programs"
        secondaryLabel="Schedule Campus Visit"
      />
    </PageShell>
  );
}

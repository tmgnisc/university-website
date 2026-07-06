import { createFileRoute } from "@tanstack/react-router";

import { BentoGrid, PageHero, type BentoItem } from "@/components/sections/bento";
import {
  ApplicationForm,
  CtaBand,
  DeadlineGrid,
  FaqList,
  HighlightBand,
  IconFeatureGrid,
  PageSection,
  SplitSection,
  StepGrid,
} from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";
import { resolveIcons } from "@/lib/icon-registry";

import content from "@/data/pages/admissions.json";

const REQUIREMENTS_BENTO = content.requirementsBento as BentoItem[];
const ADMISSION_STEPS = content.admissionSteps;
const DEADLINES = content.deadlines;
const SUPPORT_SERVICES = resolveIcons(content.supportServices);
const FAQ = content.faq;

export const Route = createFileRoute("/academics/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Apply to WCBT Jhapa Campus. Learn about eligibility, entrance exams, deadlines, and enrollment for BIT and B.Tech Ed IT programs.",
      },
    ],
    links: [{ rel: "canonical", href: "/academics/admissions" }],
  }),
  component: AdmissionsPage,
});

function AdmissionsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Admissions"
        title="Start your journey at WCBT"
        description="Admissions are open for Kathmandu University partnered BIT and B.Tech Ed IT programs. Follow the steps below to apply for the upcoming intake."
        image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1600&q=80"
        primaryCta={{ label: "Apply Now", href: "/academics/admissions#apply" }}
        secondaryCta={{ label: "Contact Admissions", href: "/contact" }}
      />

      <HighlightBand
        badge="Intake 2026"
        title="Applications now open"
        description="Secure your place at Eastern Nepal's leading technology college. Limited seats available for both undergraduate programs."
      />

      <PageSection
        eyebrow="How to apply"
        title="Four simple steps to enrollment"
        description="Our admissions process is designed to be transparent and supportive from your first inquiry to your first day on campus."
      >
        <StepGrid steps={ADMISSION_STEPS} />
      </PageSection>

      <SplitSection
        eyebrow="Eligibility"
        title="Who should apply?"
        description="WCBT welcomes motivated students ready for rigorous, industry-aligned technology education. Whether you aspire to build software or lead digital classrooms, we help you find the right fit."
        image="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
        bullets={[
          "Completed +2 or equivalent from a recognized board",
          "Minimum academic standing as per KU program requirements",
          "Strong interest in technology, innovation, or education",
          "Commitment to full-time undergraduate study for four years",
        ]}
      />

      <PageSection
        eyebrow="Requirements"
        title="What you'll need to apply"
        description="Prepare these materials before starting your application to ensure a smooth review process."
        className="bg-muted/30"
      >
        <BentoGrid items={REQUIREMENTS_BENTO} />
      </PageSection>

      <PageSection
        eyebrow="Key dates"
        title="Important deadlines"
        description="Mark these dates on your calendar. Late applications may be considered subject to seat availability."
      >
        <DeadlineGrid items={DEADLINES} />
      </PageSection>

      <PageSection
        eyebrow="Support services"
        title="We're with you every step"
        description="Our admissions team offers guidance on programs, documents, scholarships, and campus visits."
        className="bg-muted/30"
      >
        <IconFeatureGrid items={SUPPORT_SERVICES} />
      </PageSection>

      <PageSection
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Quick answers to common admissions questions."
      >
        <FaqList items={FAQ} />
      </PageSection>

      <ApplicationForm
        id="apply"
        eyebrow="Admissions"
        title="Apply to WCBT"
        description="Fill in your details and our admissions team will guide you through the next steps."
        submitLabel="Submit application"
        className="bg-muted/30"
      />

      <CtaBand
        title="Ready to apply?"
        description="Begin your application today or speak with our admissions team for personalized guidance."
        primaryLabel="Start Application"
        secondaryLabel="Download Prospectus"
      />
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Calendar, ClipboardList, FileText, GraduationCap } from "lucide-react";

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
} from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

const REQUIREMENTS_BENTO: BentoItem[] = [
  {
    title: "Academic Transcripts",
    description: "SEBON / NEB marksheets and character certificates from previous institutions.",
    variant: "text",
    badge: "Documents",
    className: "lg:col-span-2",
  },
  {
    title: "Minimum GPA",
    description: "Eligible candidates typically hold a minimum second division or equivalent.",
    variant: "stat",
    stat: "2.0+",
    className: "lg:col-span-1",
  },
  {
    title: "Entrance Exam",
    description: "Written test covering mathematics, logic, and general aptitude.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    className: "lg:col-span-1",
  },
  {
    title: "Interview Round",
    description: "Shortlisted applicants meet the admissions panel for program fit assessment.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
    className: "lg:col-span-2",
  },
];

const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Review eligibility",
    description: "Confirm you meet academic requirements for BIT or B.Tech Ed IT before applying.",
    hint: "Most applicants should have completed +2 or equivalent. BIT is best for students with a strong maths/IT foundation; B.Tech Ed IT welcomes future educators with a technology focus.",
  },
  {
    step: "02",
    title: "Submit application",
    description:
      "Fill out the online form with personal details, program choice, and supporting documents.",
  },
  {
    step: "03",
    title: "Entrance assessment",
    description: "Take the admission test and attend the interview on your scheduled date.",
  },
  {
    step: "04",
    title: "Receive offer",
    description:
      "Successful candidates receive an offer letter with enrollment and fee payment instructions.",
  },
];

const DEADLINES = [
  {
    date: "Mar 15, 2026",
    title: "Early application closes",
    description: "Submit your form early for priority scheduling of entrance exams.",
  },
  {
    date: "Apr 30, 2026",
    title: "Regular deadline",
    description: "Final date for standard intake applications for the 2026 academic year.",
  },
  {
    date: "May 20, 2026",
    title: "Enrollment week",
    description: "Confirm your seat, complete orientation, and begin your first semester.",
  },
];

const FAQ = [
  {
    question: "Who can apply to WCBT?",
    answer:
      "Students who have completed +2 or equivalent in Science, Management, or related streams with minimum eligibility as per Kathmandu University guidelines.",
  },
  {
    question: "Is there an entrance exam?",
    answer:
      "Yes. All applicants take a written entrance test followed by an interview. Sample guidelines are shared after application submission.",
  },
  {
    question: "Can I apply for both BIT and B.Tech Ed IT?",
    answer:
      "You select a primary program on the application. Contact admissions if you need guidance on choosing the right pathway.",
  },
  {
    question: "What documents are required?",
    answer:
      "Academic certificates, transcripts, citizenship or passport copy, passport-size photos, and any additional documents listed in the offer letter.",
  },
];

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Apply to WCBT Jhapa Campus. Learn about eligibility, entrance exams, deadlines, and enrollment for BIT and B.Tech Ed IT programs.",
      },
    ],
    links: [{ rel: "canonical", href: "/admissions" }],
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
        primaryCta={{ label: "Apply Now", href: "/admissions#apply" }}
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
        <IconFeatureGrid
          items={[
            {
              icon: FileText,
              title: "Application help",
              description:
                "Walkthroughs for online forms, document uploads, and program selection.",
            },
            {
              icon: ClipboardList,
              title: "Document checklist",
              description:
                "Personalized list of required papers based on your academic background.",
            },
            {
              icon: Calendar,
              title: "Exam scheduling",
              description: "Flexible entrance exam slots with advance notice and preparation tips.",
            },
            {
              icon: GraduationCap,
              title: "Program counseling",
              description: "One-on-one sessions to choose between BIT and B.Tech Ed IT.",
            },
          ]}
        />
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

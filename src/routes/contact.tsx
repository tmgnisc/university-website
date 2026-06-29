import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { BentoGrid, PageHero, type BentoItem } from "@/components/sections/bento";
import {
  ContactSection,
  CtaBand,
  FaqList,
  HighlightBand,
  IconFeatureGrid,
  PageSection,
} from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

const CONTACT_BENTO: BentoItem[] = [
  {
    title: "Admissions Office",
    description: "Questions about applications, eligibility, entrance exams, and enrollment.",
    variant: "text",
    badge: "Admissions",
    className: "lg:col-span-2",
  },
  {
    title: "Response Time",
    description: "We aim to reply to all inquiries within one business day.",
    variant: "stat",
    stat: "24h",
    className: "lg:col-span-1",
  },
  {
    title: "Scholarships Desk",
    description: "Financial aid, merit awards, and need-based grant inquiries.",
    variant: "text",
    className: "lg:col-span-1",
  },
  {
    title: "Campus Visits",
    description: "Schedule a guided tour of WCBT facilities in Jhapa.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    className: "lg:col-span-2",
  },
  {
    title: "General Inquiries",
    description: "Programs, partnerships, media requests, and other questions.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    className: "lg:col-span-2",
  },
];

const FAQ = [
  {
    question: "What are your office hours?",
    answer:
      "Sunday through Friday, 9:00 AM to 5:00 PM NPT. Saturday by appointment for campus visits.",
  },
  {
    question: "How do I schedule a campus visit?",
    answer:
      "Call 9714530056 or 9714530057 or email info@whitehouseeducation.edu.np with your preferred date. We recommend visiting on weekdays.",
  },
  {
    question: "Can I contact via WhatsApp?",
    answer:
      "Yes. Message us at 9714530056 or 9714530057 for quick admissions and general inquiries during office hours.",
  },
  {
    question: "Where is WCBT located?",
    answer:
      "WCBT operates from the SBSS premises in Jhapa, Nepal. Detailed directions are shared when you schedule a visit.",
  },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Contact WCBT Jhapa Campus for admissions, scholarships, campus visits, and general inquiries.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact Us"
        title="We'd love to hear from you"
        description="Reach out for admissions guidance, scholarship information, campus tours, or any questions about life at WCBT."
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1400&q=80"
        primaryCta={{ label: "Get in touch", href: "/contact#form" }}
      />

      <HighlightBand
        badge="Get in Touch"
        title="Admissions team ready to help"
        description="Phone: 9714530056 · Mobile: 9714530057 · Email: info@whitehouseeducation.edu.np"
      />

      <PageSection
        eyebrow="Departments"
        title="Who to contact"
        description="Direct your question to the right team for the fastest response."
      >
        <BentoGrid items={CONTACT_BENTO} />
      </PageSection>

      <PageSection
        eyebrow="Contact channels"
        title="Multiple ways to reach us"
        description="Choose the channel that works best for you."
        className="bg-muted/30"
      >
        <IconFeatureGrid
          items={[
            {
              icon: Phone,
              title: "Phone",
              description:
                "9714530056, 9714530057 for admissions and general inquiries during office hours.",
            },
            {
              icon: Mail,
              title: "Email",
              description: "info@whitehouseeducation.edu.np — we respond within one business day.",
            },
            {
              icon: MapPin,
              title: "Visit us",
              description: "WCBT Jhapa Campus, Jhapa, Nepal. Schedule visits in advance.",
            },
            {
              icon: Clock,
              title: "Office hours",
              description: "Sun–Fri, 9:00 AM – 5:00 PM NPT. Saturday visits by appointment.",
            },
          ]}
        />
      </PageSection>

      <ContactSection />

      <PageSection
        eyebrow="FAQ"
        title="Common questions"
        description="Quick answers before you reach out."
        className="bg-muted/30"
      >
        <FaqList items={FAQ} />
      </PageSection>

      <CtaBand
        title="Take the next step"
        description="Apply for the upcoming intake or download our prospectus to learn more about WCBT."
        primaryLabel="Apply Now"
        secondaryLabel="Download Prospectus"
      />
    </PageShell>
  );
}

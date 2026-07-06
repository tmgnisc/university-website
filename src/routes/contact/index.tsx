import { createFileRoute } from "@tanstack/react-router";

import { BentoGrid, PageHero, type BentoItem } from "@/components/sections/bento";
import {
  ContactSection,
  CtaBand,
  FaqList,
  HighlightBand,
  IconFeatureGrid,
  PageSection,
} from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";
import { resolveIcons } from "@/lib/icon-registry";

import content from "@/data/pages/contact.json";

const CONTACT_BENTO = content.bento as BentoItem[];
const CHANNELS = resolveIcons(content.channels);
const FAQ = content.faq;

export const Route = createFileRoute("/contact/")({
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
        <IconFeatureGrid items={CHANNELS} />
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

import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, HighlightBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";
import { resolveIcons } from "@/lib/icon-registry";

import content from "@/data/pages/student-support.json";

const SERVICES = resolveIcons(content.services);

export const Route = createFileRoute("/student-support")({
  head: () => ({
    meta: [
      { title: "Student Support — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Counselling, wellbeing, academic help, disability services, financial aid advice, and emergency contacts at WCBT Jhapa.",
      },
    ],
    links: [{ rel: "canonical", href: "/student-support" }],
  }),
  component: StudentSupportPage,
});

function StudentSupportPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Student Support"
        title="We're with you, every step"
        description="From wellbeing to academics and finances, WCBT offers support services that help every student succeed and feel at home on campus."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <HighlightBand
        badge="Here to Help"
        title="Support that puts students first"
        description="Confidential, caring, and accessible services designed around your needs throughout your studies."
      />

      <PageSection
        eyebrow="Support Services"
        title="How we support you"
        description="A range of services to keep you healthy, focused, and on track for success."
      >
        <IconFeatureGrid items={SERVICES} />
      </PageSection>

      <PageSection
        eyebrow="Emergency Contacts"
        title="Reach us when it matters"
        description="If you or a fellow student needs urgent assistance, contact our support team right away."
        className="bg-muted/30"
      >
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-xl shadow-primary/5 md:p-10">
          <div className="space-y-4 text-sm">
            <p className="flex items-center gap-2.5 text-muted-foreground">
              <Phone className="size-4 text-primary" />
              <span className="font-medium text-foreground">9714530056, 9714530057</span>
            </p>
            <a
              href="mailto:info@whitehouseeducation.edu.np"
              className="flex items-center gap-2.5 font-medium text-foreground hover:text-primary"
            >
              <Mail className="size-4 text-primary" />
              info@whitehouseeducation.edu.np
            </a>
            <p className="flex items-center gap-2.5 text-muted-foreground">
              <MapPin className="size-4 text-primary" />
              Jhapa, Nepal
            </p>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Support is available during office hours. For after-hours emergencies, please contact
            local emergency services.
          </p>
        </div>
      </PageSection>

      <CtaBand
        title="Need to talk to someone?"
        description="Our team is ready to help with counselling, academics, accessibility, or financial questions."
        primaryLabel="Contact Support"
        secondaryLabel="Visit Campus"
      />
    </PageShell>
  );
}

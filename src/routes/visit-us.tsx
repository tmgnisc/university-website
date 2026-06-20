import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  Landmark,
  CalendarCheck,
  Compass,
  Video,
  Bus,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import {
  CtaBand,
  HighlightBand,
  IconFeatureGrid,
  PageSection,
  SplitSection,
} from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/visit-us")({
  head: () => ({
    meta: [
      { title: "Visit Us — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Plan your visit to WCBT Jhapa — campus location, open days, campus visit booking, virtual tour, and transport.",
      },
    ],
    links: [{ rel: "canonical", href: "/visit-us" }],
  }),
  component: VisitUsPage,
});

function VisitUsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Visit Us"
        title="Come see our campus"
        description="The best way to know WCBT is to experience it. Plan a visit, join an open day, or take a virtual tour from anywhere."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <HighlightBand
        badge="Plan Your Visit"
        title="We'd love to show you around"
        description="Meet our students and faculty, tour the facilities, and get your questions answered in person."
      />

      <PageSection
        eyebrow="Can't visit yet?"
        title="Take the virtual campus tour"
        description="Explore our premises online with an immersive, scrolling walkthrough."
      >
        <div className="flex">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/virtual-tour">
              <Video className="mr-1 size-4" /> Start the virtual tour{" "}
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </PageSection>

      <PageSection
        eyebrow="What to expect"
        title="Ways to explore WCBT"
        description="Choose the option that works best for you — on campus or online."
      >
        <IconFeatureGrid
          items={[
            {
              icon: MapPin,
              title: "Campus Location & Map",
              description: "Find us in Jhapa, Nepal, with easy directions to the campus.",
            },
            {
              icon: Landmark,
              title: "Attractions Near College",
              description: "Discover dining, lodging, and points of interest close to campus.",
            },
            {
              icon: CalendarCheck,
              title: "Open Day Schedule",
              description: "Join scheduled open days to experience a typical day at WCBT.",
            },
            {
              icon: Compass,
              title: "Book a Campus Visit",
              description: "Arrange a personalized tour at a time that suits you.",
            },
            {
              icon: Video,
              title: "Virtual Tour",
              description: "Explore our spaces online if you can't make it in person.",
            },
            {
              icon: Bus,
              title: "Transport & Parking",
              description: "Public transport routes and parking guidance for your visit.",
            },
          ]}
        />
      </PageSection>

      <SplitSection
        eyebrow="Getting here"
        title="Easy to reach in Jhapa"
        description="WCBT is located on the premises of Nidi Secondary School & Indreni Campus in Jhapa, Nepal, with convenient access by public and private transport."
        image="https://placehold.co/800x600"
        imageLeft
        bullets={[
          "Central location in Jhapa, Eastern Nepal",
          "Accessible by bus and local transport",
          "Parking available for visitors",
          "Assistance available — just call ahead",
        ]}
      />

      <PageSection
        eyebrow="Book your visit"
        title="Plan a campus visit"
        description="Contact us in advance and our team will arrange a guided tour for you and your family."
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
        </div>
      </PageSection>

      <CtaBand
        title="Ready to visit WCBT?"
        description="Schedule your campus visit today and take the first step toward joining our community."
        primaryLabel="Book a Visit"
        secondaryLabel="Contact Us"
      />
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Newspaper } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, PageSection } from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Latest campus news, leadership updates, workshops, and student innovation at WCBT.",
      },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsPage,
});

const NEWS_ITEMS = [
  {
    tag: "Hackathon",
    title: "48-hour AI Hackathon ignites student innovation",
    description:
      "Students collaborate on applied AI prototypes, receive mentor feedback, and present practical solutions.",
  },
  {
    tag: "Workshop",
    title: "Hands-on Industrial IoT workshop with mentors",
    description:
      "Learners explore sensors, automation, and connected systems through practical guided sessions.",
  },
  {
    tag: "Seminar",
    title: "Future of EdTech: keynote by KU faculty",
    description:
      "Academic speakers discuss emerging learning technologies and opportunities for education innovation.",
  },
];

function NewsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="News"
        title="Campus updates and stories"
        description="Follow leadership updates, workshops, student innovation, and academic activities from WCBT."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%203.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <PageSection eyebrow="Latest Updates" title="What is happening at WCBT">
        <div className="grid gap-6 md:grid-cols-3">
          {NEWS_ITEMS.map((item) => (
            <article key={item.title} className="rounded-3xl border border-border bg-card p-6">
              <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Newspaper className="size-5" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {item.tag}
              </p>
              <h3 className="mt-2 text-lg font-semibold leading-snug">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="size-3.5 text-primary" />
                Campus update
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      <CtaBand
        title="Want to learn more?"
        description="Contact WCBT for details about academic events, workshops, and student activities."
        primaryLabel="Contact Us"
        secondaryLabel="Visit Campus"
      />
    </PageShell>
  );
}

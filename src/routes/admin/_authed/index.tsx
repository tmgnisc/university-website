import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, MessageSquare, GraduationCap, Newspaper, Award, Settings } from "lucide-react";

import { chatbotEntries, news, openings, programs, scholarships } from "@/lib/cms/hooks";

export const Route = createFileRoute("/admin/_authed/")({
  component: Dashboard,
});

function Dashboard() {
  const openingsQ = openings.useList();
  const chatbotQ = chatbotEntries.useList();
  const programsQ = programs.useList();
  const newsQ = news.useList();
  const scholarshipsQ = scholarships.useList();

  const cards = [
    {
      to: "/admin/openings",
      label: "Current Openings",
      icon: Briefcase,
      count: openingsQ.data?.length,
    },
    {
      to: "/admin/chatbot",
      label: "Chatbot Q&A",
      icon: MessageSquare,
      count: chatbotQ.data?.length,
    },
    {
      to: "/admin/programs",
      label: "Programs",
      icon: GraduationCap,
      count: programsQ.data?.length,
    },
    { to: "/admin/news", label: "News & Events", icon: Newspaper, count: newsQ.data?.length },
    {
      to: "/admin/scholarships",
      label: "Scholarships",
      icon: Award,
      count: scholarshipsQ.data?.length,
    },
    { to: "/admin/site", label: "Site Settings", icon: Settings, count: undefined },
  ] as const;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage the dynamic content shown across the WCBT website.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="flex items-center justify-between">
              <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <card.icon className="size-5" />
              </div>
              {card.count !== undefined && (
                <span className="text-2xl font-bold text-foreground">{card.count ?? "—"}</span>
              )}
            </div>
            <p className="mt-4 font-semibold group-hover:text-primary">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

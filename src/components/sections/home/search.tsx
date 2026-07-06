import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LAYOUT, Reveal, SectionContainer } from "@/components/layout/layout-primitives";
import { cn } from "@/lib/utils";

export function Search_() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [searchError, setSearchError] = useState("");
  const filters = ["BIT", "B.Tech Ed IT"];
  const searchTargets = [
    {
      to: "/programs/bit" as const,
      title: "BIT",
      description: "Bachelor in Information Technology program page.",
      keywords: ["bit", "bachelor in information technology", "information technology", "it"],
    },
    {
      to: "/programs/btech-ed-it" as const,
      title: "B.Tech Ed IT",
      description: "Technology in Education program page.",
      keywords: [
        "b.tech ed it",
        "btech ed it",
        "b tech ed it",
        "educational information technology",
        "education technology",
        "edtech",
      ],
    },
    {
      to: "/programs" as const,
      title: "Programs",
      description: "Explore all academic programs at WCBT.",
      keywords: ["program", "programs", "course", "courses", "degree"],
    },
    {
      to: "/academics/admissions" as const,
      title: "Admissions",
      description: "Eligibility, process, documents, and application guidance.",
      keywords: ["admission", "admissions", "apply", "enroll", "application"],
    },
    {
      to: "/academics/scholarships" as const,
      title: "Scholarships",
      description: "Merit aid, fee support, and scholarship options.",
      keywords: ["scholarship", "scholarships", "fee", "financial aid", "discount"],
    },
    {
      to: "/academics/research" as const,
      title: "Research & Innovation",
      description: "Research labs, innovation projects, and publications.",
      keywords: ["research", "innovation", "ai lab", "iot lab", "publication"],
    },
    {
      to: "/careers" as const,
      title: "Careers",
      description: "Career paths, internships, and future opportunities.",
      keywords: ["career", "careers", "job", "internship", "placement"],
    },
    {
      to: "/contact" as const,
      title: "Contact",
      description: "Phone, email, inquiry form, and contact details.",
      keywords: ["contact", "phone", "email", "inquiry", "message"],
    },
    {
      to: "/visit" as const,
      title: "Visit Us",
      description: "Campus location, map, and visit information.",
      keywords: ["visit", "location", "map", "campus", "address"],
    },
  ];

  const getSearchScore = (value: string, target: (typeof searchTargets)[number]) => {
    const normalized = value.trim().toLowerCase();
    const haystack = [target.title, target.description, ...target.keywords].join(" ").toLowerCase();

    if (!normalized) return 0;
    if (target.title.toLowerCase() === normalized) return 100;
    if (target.title.toLowerCase().startsWith(normalized)) return 80;
    if (target.keywords.some((keyword) => keyword === normalized)) return 70;
    if (target.keywords.some((keyword) => keyword.startsWith(normalized))) return 55;
    if (haystack.includes(normalized)) return 35;

    return 0;
  };

  const getSearchResults = (value: string) =>
    value.trim()
      ? searchTargets
          .map((target) => ({ ...target, score: getSearchScore(value, target) }))
          .filter((target) => target.score > 0)
          .sort((a, b) => b.score - a.score)
      : [];

  const hasSearchTerm = term.trim().length > 0;
  const searchResults = getSearchResults(term);

  const openResult = (target: (typeof searchTargets)[number]) => {
    setSearchError("");
    setTerm(target.title);
    navigate({ to: target.to });
  };

  const runSearch = (value: string) => {
    const normalized = value.trim();

    if (!normalized) {
      setSearchError("Please enter a program or topic to search.");
      return;
    }

    const match = getSearchResults(value)[0];

    if (!match) {
      setSearchError("No matching page found. Try BIT, B.Tech Ed IT, admissions, or scholarships.");
      return;
    }

    setSearchError("");
    navigate({ to: match.to });
  };

  return (
    <section className={LAYOUT.section}>
      <SectionContainer>
        <Reveal>
          <div
            data-maintenance-allow
            className={cn(
              "rounded-3xl bg-card border border-border shadow-xl shadow-primary/10",
              LAYOUT.cardPadding,
            )}
          >
            <form
              className="flex flex-col md:flex-row gap-4 items-stretch"
              onSubmit={(event) => {
                event.preventDefault();
                runSearch(term);
              }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input
                  className="h-14 pl-12 rounded-2xl text-base"
                  placeholder="Search BIT or B.Tech Ed IT programs..."
                  value={term}
                  onChange={(event) => {
                    setTerm(event.target.value);
                    if (searchError) setSearchError("");
                  }}
                />
              </div>
              <Button
                type="submit"
                className="h-14 rounded-2xl px-8 bg-primary text-primary-foreground"
              >
                Search
              </Button>
            </form>
            {searchError ? (
              <p className="mt-3 text-sm font-medium text-destructive">{searchError}</p>
            ) : null}
            {hasSearchTerm ? (
              <div className="mt-4 rounded-2xl border border-border bg-background/80 p-3">
                <div className="grid gap-1">
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <button
                        key={result.to}
                        type="button"
                        onClick={() => openResult(result)}
                        className="group flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold transition-colors group-hover:text-primary">
                            {result.title}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                            {result.description}
                          </span>
                        </span>
                        <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-4 text-sm text-muted-foreground">
                      No result found. Try searching for programs, admissions, scholarships,
                      research, contact, or campus.
                    </p>
                  )}
                </div>
              </div>
            ) : null}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider mr-2 self-center">
                Quick filters:
              </span>
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setTerm(f);
                    runSearch(f);
                  }}
                  className="cursor-pointer px-4 py-1.5 rounded-full text-sm border border-border bg-secondary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

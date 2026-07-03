import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Search,
  ArrowRight,
  FileText,
  GraduationCap,
  MessageSquare,
  MapPin,
  Play,
  Calendar,
  Clock,
  Phone,
  Mail,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Cpu,
  Shield,
  BookOpen,
  Users,
  Award,
  Briefcase,
  Laptop,
  HeartHandshake,
  Quote,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
const NAV_LOGO = "https://ik.imagekit.io/qn3m81dsk/university/Address%20(13).png";
const FOOTER_LOGO = "https://ik.imagekit.io/qn3m81dsk/university/Address%20(13).png";
const HOME_HERO_IMAGE = "https://ik.imagekit.io/qn3m81dsk/university/Untitled%20design%20(52).png";
const HOME_IMAGE_1 = "https://ik.imagekit.io/qn3m81dsk/university/clz%201.jpg";
const HOME_IMAGE_2 = "https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg";
const HOME_IMAGE_3 = "https://ik.imagekit.io/qn3m81dsk/university/clz%203.jpg";
import heroImg from "@/assets/hero-campus.jpg";
import heroVisionImg from "@/assets/hero.png";
import progAi from "@/assets/prog-ai.jpg";
import progEdtech from "@/assets/prog-edtech.jpg";
import studentLifeImg from "@/assets/student-life.jpg";
import campusImg from "@/assets/campus.jpg";
import smartClass from "@/assets/smart-classroom.jpg";
import aiLab from "@/assets/ai-lab.jpg";

type RequestFormPayload = {
  name: string;
  phone: string;
  email: string;
  subject?: string;
  program?: string;
  message?: string;
};

async function sendRequestForm(payload: RequestFormPayload) {
  const apiBase = import.meta.env.VITE_CMS_API_URL?.replace(/\/$/, "") ?? "";
  const response = await fetch(`${apiBase}/api/request-form`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error ?? "Could not send your request. Please try again.");
  }
}

type NavLink = { label: string; to: string; hash?: string };
type NavGroup = { label: string; to?: string; children?: NavLink[] };

// Top-level header is grouped into a few dropdowns so it stays clean and
// responsive while still covering every section of the sitemap.
const NAV_MENU: NavGroup[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  {
    label: "Programs",
    to: "/programs",
    children: [
      { label: "BIT", to: "/programs/bit" },
      { label: "B.Tech Ed IT", to: "/programs/btech-ed-it" },
      { label: "Research & Innovation", to: "/research" },
    ],
  },
  {
    label: "Academics",
    children: [
      { label: "Admissions", to: "/admissions" },
      { label: "Scholarships", to: "/scholarships" },
    ],
  },
  {
    label: "Student Life",
    children: [
      { label: "Student Experience", to: "/student-experience" },
      { label: "Student Support", to: "/student-support" },
      { label: "Campus Life", to: "/campus-life" },
    ],
  },
  { label: "Visit Us", to: "/visit-us" },
  { label: "Careers", to: "/careers" },
];

function isLinkActive(to: string, pathname: string) {
  return to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
}

function isGroupActive(group: NavGroup, pathname: string) {
  if (group.to) return isLinkActive(group.to, pathname);
  return group.children?.some((c) => isLinkActive(c.to, pathname)) ?? false;
}

// Children that share a path but differ by hash (e.g. /programs#bit vs
// /programs#btech-ed-it) must compare the hash so only one shows as active.
function isChildActive(child: NavLink, pathname: string, hash: string) {
  if (!isLinkActive(child.to, pathname)) return false;
  if (child.hash) return hash.replace(/^#/, "") === child.hash;
  return true;
}

const LAYOUT = {
  section: "py-16 md:py-20",
  container: "max-w-7xl mx-auto px-6 lg:px-10",
  contentGap: "mt-10",
  gridGap: "gap-6",
  splitGap: "gap-10 lg:gap-12",
  cardPadding: "p-6",
} as const;

function SectionContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(LAYOUT.container, className)}>{children}</div>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md border-b border-border" : "border-b border-border/60"
      }`}
    >
      <div className={cn(LAYOUT.container, "h-24 flex items-center justify-between")}>
        <Link to="/" className="flex items-center">
          <img src={NAV_LOGO} alt="WCBT Jhapa Campus" className="h-[5.5rem] w-auto sm:h-24" />
        </Link>
        <nav className="hidden lg:flex items-center gap-x-1">
          {NAV_MENU.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                {item.to ? (
                  <Link
                    to={item.to}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                      isGroupActive(item, pathname)
                        ? "text-primary"
                        : "text-black hover:text-primary",
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                      isGroupActive(item, pathname)
                        ? "text-primary"
                        : "text-black hover:text-primary",
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
                  </button>
                )}
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                  <div className="min-w-56 rounded-2xl border border-border bg-white p-2 shadow-xl shadow-black/5">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        hash={child.hash}
                        className={cn(
                          "block rounded-xl px-3 py-2 text-sm transition-colors",
                          isChildActive(child, pathname, hash)
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-black hover:bg-muted",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to!}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors",
                  isLinkActive(item.to!, pathname)
                    ? "text-primary"
                    : "text-black hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-5"
          >
            <Link to="/admissions" hash="apply">
              Apply Now
            </Link>
          </Button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="lg:hidden text-black hover:text-black/70 transition-colors"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white border-l border-border p-6 flex flex-col gap-5 overflow-y-auto"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-black hover:text-black/70 transition-colors"
              >
                <X className="size-6" />
              </button>
            </div>
            {NAV_MENU.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-border pb-4">
                  {item.to ? (
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                  )}
                  <div className="flex flex-col gap-2.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        hash={child.hash}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "text-base transition-colors",
                          isChildActive(child, pathname, hash)
                            ? "font-semibold text-primary"
                            : "text-black hover:text-primary",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to!}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-border pb-3 text-lg transition-colors",
                    isLinkActive(item.to!, pathname)
                      ? "font-semibold text-primary"
                      : "text-black hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full mt-2"
            >
              <Link to="/admissions" hash="apply" onClick={() => setOpen(false)}>
                Apply Now
              </Link>
            </Button>
          </motion.aside>
        </div>
      )}
    </header>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [heroImage, setHeroImage] = useState(HOME_HERO_IMAGE);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroImage}
          alt="WhiteHouse College of Business & Technology campus"
          className="size-full object-cover object-[center_55%] scale-105"
          onError={() => setHeroImage(heroImg)}
        />
      </motion.div>
      <div
        className="absolute inset-0 z-[1] bg-black/40 backdrop-blur-[2px] bg-gradient-to-b from-black/50 via-black/30 to-black/55"
        aria-hidden
      />
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        className={cn(LAYOUT.container, "relative z-10 py-32 text-white drop-shadow-md")}
      >
        <motion.p variants={fadeUp} className="text-sm font-medium text-white/90">
          In Partnership with Kathmandu University
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.05] max-w-5xl"
        >
          WhiteHouse College of Business & Technology
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 text-lg lg:text-xl text-white/75 max-w-2xl">
          Empowering future innovators, technologists & leaders through world-class academic
          pathways rooted in Eastern Nepal.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/programs" className="inline-flex">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold px-7 h-12"
            >
              Explore Programs <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
          <Link to="/scholarships" className="inline-flex">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-7 h-12 border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              Scholarship Information
            </Button>
          </Link>
          <Link
            to="/virtual-tour"
            className="text-sm text-white/80 hover:text-white inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
          >
            <Play className="size-4" /> Virtual Campus Tour
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

const TICKER_ITEMS = [
  "KU Affiliated Admissions Open 2026",
  "Scholarship Applications Available",
  "Orientation Program Notice",
  "Hackathon Registration Now Live",
];

function TickerMarquee() {
  const row = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="flex whitespace-nowrap animate-marquee py-3 font-medium">
      {row.map((t, i) => (
        <span
          key={i}
          className="mx-8 inline-flex items-center gap-3 text-sm uppercase tracking-wider"
        >
          <span className="size-1.5 rounded-full bg-black" /> {t}
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="relative z-10 bg-secondary text-black border-y border-border overflow-hidden">
      <TickerMarquee />
    </div>
  );
}

export function AffiliationBanner() {
  return (
    <section className="relative z-10 bg-primary text-primary-foreground">
      <SectionContainer className="py-8 md:py-10">
        <Reveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-4">
              <Award className="size-4" />
              In Partnership with Kathmandu University
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              WCBT - Jhapa Campus
            </h2>
            <p className="mt-3 text-sm sm:text-base text-primary-foreground/85 max-w-2xl mx-auto">
              (Under the Management of WhiteHouse Education Foundation)
            </p>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

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
      to: "/admissions" as const,
      title: "Admissions",
      description: "Eligibility, process, documents, and application guidance.",
      keywords: ["admission", "admissions", "apply", "enroll", "application"],
    },
    {
      to: "/scholarships" as const,
      title: "Scholarships",
      description: "Merit aid, fee support, and scholarship options.",
      keywords: ["scholarship", "scholarships", "fee", "financial aid", "discount"],
    },
    {
      to: "/research" as const,
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
      to: "/visit-us" as const,
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

const programs = [
  {
    img: progAi,
    tag: "KU Affiliated",
    title: "BIT — Bachelor in Information Technology",
    desc: "Build the next generation of software, AI systems and intelligent platforms.",
    to: "/programs/bit" as const,
  },
  {
    img: progEdtech,
    tag: "KU Affiliated",
    title: "B.Tech Ed IT — Technology in Education",
    desc: "Equip educators with cutting-edge tools to reshape modern classrooms.",
    to: "/programs/btech-ed-it" as const,
  },
];

export function Programs() {
  return (
    <section id="programs" className={LAYOUT.section}>
      <SectionContainer>
        <Reveal className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Programs
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold">
            Future-ready degrees, designed with industry
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Affiliated to Kathmandu University. Built for global outcomes.
          </p>
        </Reveal>
        <div
          className={cn(
            LAYOUT.contentGap,
            "grid grid-cols-1 md:grid-cols-2 w-full",
            LAYOUT.gridGap,
          )}
        >
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Link
                to={p.to}
                className="group rounded-3xl overflow-hidden bg-card border border-border shadow-xl shadow-primary/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/15 h-full flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="size-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className={cn(LAYOUT.cardPadding, "flex-1 flex flex-col")}>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 font-semibold text-lg leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">{p.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

const steps = [
  {
    icon: FileText,
    title: "Admission Process",
    desc: "Eligibility, deadlines & documents.",
    to: "/admissions",
  },
  {
    icon: GraduationCap,
    title: "Scholarship Schemes",
    desc: "Up to 75% merit-based aid.",
    to: "/scholarships",
  },
  {
    icon: MessageSquare,
    title: "Academic Inquiry",
    desc: "Talk to our admissions team.",
    to: "/contact",
  },
  {
    icon: MapPin,
    title: "Jhapa Campus",
    desc: "Visit & explore our facilities.",
    to: "/visit-us",
  },
];

export function NextSteps() {
  return (
    <section id="admissions" className={cn(LAYOUT.section, "bg-secondary")}>
      <SectionContainer>
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-semibold text-center max-w-3xl mx-auto">
            Your next academic step
          </h2>
        </Reveal>
        <div
          className={cn(
            LAYOUT.contentGap,
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
            LAYOUT.gridGap,
          )}
        >
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <Link
                to={s.to}
                className={cn(
                  "group block rounded-3xl bg-card border border-border h-full transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30",
                  LAYOUT.cardPadding,
                )}
              >
                <div className="size-12 rounded-2xl bg-primary text-primary-foreground grid place-items-center group-hover:bg-primary/90 transition-colors">
                  <s.icon className="size-5" />
                </div>
                <h3 className="mt-5 flex items-center gap-1 font-semibold text-lg">
                  {s.title}
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-black" />
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

export function Research() {
  return (
    <section id="research" className={LAYOUT.section}>
      <SectionContainer className={cn("grid lg:grid-cols-2 items-center", LAYOUT.splitGap)}>
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Research
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
            Research & Innovation Ecosystem
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Hands-on labs in AI, Robotics, IoT and applied innovation — preparing students to solve
            real-world problems alongside industry mentors.
          </p>
          <div className={cn(LAYOUT.contentGap, "grid grid-cols-2", LAYOUT.gridGap)}>
            {[
              { icon: Cpu, label: "AI & ML" },
              { icon: Sparkles, label: "Robotics" },
              { icon: Shield, label: "IoT Systems" },
              { icon: BookOpen, label: "Innovation Labs" },
            ].map((x) => (
              <div
                key={x.label}
                className={cn(
                  "rounded-2xl border border-border flex items-center gap-3 bg-card",
                  LAYOUT.cardPadding,
                )}
              >
                <div className="size-10 rounded-xl bg-muted text-black grid place-items-center">
                  <x.icon className="size-5" />
                </div>
                <span className="font-medium">{x.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl border border-primary/30" />
            <img
              src={HOME_IMAGE_1}
              alt="AI Robotics & IoT Innovation"
              loading="lazy"
              className="relative rounded-3xl w-full aspect-[4/3] object-cover shadow-2xl shadow-primary/20"
            />
            <div className="mt-3 text-center">
              <p className="text-sm font-medium text-foreground">
                Premises of Nidi Secondary School & Indreni Campus
              </p>
            </div>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

const news = [
  { tag: "Hackathon", title: "48-hour AI Hackathon ignites student innovation" },
  { tag: "Workshop", title: "Hands-on Industrial IoT workshop with mentors" },
  { tag: "Seminar", title: "Future of EdTech: keynote by KU faculty" },
];

export function WhatsNew() {
  return (
    <section id="about" className={cn(LAYOUT.section, "bg-navy-deep text-white")}>
      <SectionContainer>
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-white/80">What's New</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold">Leadership & latest updates</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div
            className={cn(
              LAYOUT.contentGap,
              "grid lg:grid-cols-[1fr_2fr] items-center rounded-3xl bg-white/5 border border-white/10 backdrop-blur",
              LAYOUT.splitGap,
              LAYOUT.cardPadding,
            )}
          >
            <div className="flex justify-center">
              <div className="relative w-56 lg:w-72 aspect-[3/4] overflow-hidden rounded-2xl border-2 border-white/40 shadow-lg">
                <img
                  src="https://ik.imagekit.io/qn3m81dsk/university/president%201.jpg"
                  alt="Yuvraj Sharma, President"
                  loading="lazy"
                  className="size-full object-cover object-top"
                />
              </div>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.18em] text-white/80">
                From the President
              </span>
              <p className="mt-3 text-xl lg:text-2xl font-display leading-snug">
                "Our mission is to nurture an academic ecosystem where Eastern Nepal's brightest
                minds engineer the future — with integrity, excellence and global ambition."
              </p>
              <p className="mt-4 text-sm font-semibold text-white/90">Yuvraj Sharma</p>
              <p className="text-xs text-white/60">President</p>
              <Button className="mt-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                Read Full Message <ArrowRight className="ml-1 size-4" />
              </Button>
            </div>
          </div>
        </Reveal>
        <div className={cn(LAYOUT.contentGap, "grid md:grid-cols-3", LAYOUT.gridGap)}>
          {news.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.08}>
              <article
                className={cn(
                  "group rounded-3xl bg-white/5 border border-white/10 h-full transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/30",
                  LAYOUT.cardPadding,
                )}
              >
                <span className="text-[11px] uppercase tracking-[0.18em] text-white/80 font-semibold">
                  {n.tag}
                </span>
                <h3 className="mt-3 font-semibold text-lg leading-snug">{n.title}</h3>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-white/80 group-hover:text-white"
                >
                  Read more <ArrowRight className="size-4" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

const events = [
  { title: "Orientation Program 2026", date: "Jan 12, 2026", time: "9:00 AM", img: campusImg },
  { title: "Guest Lecture: AI Ethics", date: "Jan 20, 2026", time: "2:00 PM", img: aiLab },
  { title: "Tech Bootcamp — Web3", date: "Feb 04, 2026", time: "10:00 AM", img: progAi },
  {
    title: "Inter-college Sports Week",
    date: "Feb 18, 2026",
    time: "All Day",
    img: studentLifeImg,
  },
];

export function Events() {
  return (
    <section className={LAYOUT.section}>
      <SectionContainer>
        <Reveal className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Events</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold">Upcoming on campus</h2>
          </div>
          <a href="#" className="text-sm font-medium inline-flex items-center gap-1.5">
            All events <ArrowRight className="size-4" />
          </a>
        </Reveal>
        <div
          className={cn(
            LAYOUT.contentGap,
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
            LAYOUT.gridGap,
          )}
        >
          {events.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <article className="group rounded-3xl bg-card border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 h-full flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={e.img}
                    alt={e.title}
                    loading="lazy"
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className={cn(LAYOUT.cardPadding, "flex-1 flex flex-col")}>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {e.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {e.time}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug flex-1">{e.title}</h3>
                  <a
                    href="#"
                    className="mt-4 text-sm font-medium text-black inline-flex items-center gap-1 group-hover:text-black/70"
                  >
                    View Details <ArrowRight className="size-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

type SupportItem = {
  icon: LucideIcon;
  title: string;
  value: number;
  desc: string;
  detail: string;
  includes: string[];
  access: string;
};

const supports: SupportItem[] = [
  {
    icon: Briefcase,
    title: "Paid Internships",
    value: 92,
    desc: "Industry placements with stipends.",
    detail:
      "Students are guided toward internship opportunities where classroom learning can be applied in real workplaces. The support team helps with readiness, placement coordination, and follow-up during the internship period.",
    includes: [
      "Industry-linked placement opportunities",
      "CV, interview, and workplace-readiness guidance",
      "Coordination with partner organizations",
    ],
    access:
      "Contact the placement or administration team to learn about active internship openings and eligibility.",
  },
  {
    icon: Laptop,
    title: "Laptop Installment Plan",
    value: 100,
    desc: "Flexible monthly EMI for every student.",
    detail:
      "The laptop installment plan helps students access the device they need for coursework, labs, projects, and online learning without paying the full amount at once.",
    includes: [
      "Flexible monthly installment guidance",
      "Support choosing a study-ready laptop",
      "Simple coordination through the college office",
    ],
    access:
      "Visit the administration office for current laptop-plan options, documents, and payment details.",
  },
  {
    icon: HeartHandshake,
    title: "Counseling Services",
    value: 80,
    desc: "Mental health & academic guidance.",
    detail:
      "Counseling support gives students a confidential place to talk through academic pressure, personal concerns, adjustment challenges, motivation, and wellbeing needs.",
    includes: [
      "Confidential one-on-one guidance",
      "Academic and wellbeing support",
      "Referral direction when specialized help is needed",
    ],
    access: "Request support through the administration desk or email the college support team.",
  },
];

export function Support() {
  const [openSupport, setOpenSupport] = useState<SupportItem | null>(null);

  useEffect(() => {
    if (!openSupport) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [openSupport]);

  return (
    <section id="campus-life" className={cn(LAYOUT.section, "bg-secondary")}>
      <SectionContainer className={cn("grid lg:grid-cols-2 items-center", LAYOUT.splitGap)}>
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Student Support
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
            Beyond the classroom — we back every student
          </h2>
          <div className={cn(LAYOUT.contentGap, "space-y-4")}>
            {supports.map((s) => {
              const isOpen = openSupport?.title === s.title;

              return (
                <button
                  key={s.title}
                  type="button"
                  data-maintenance-allow
                  onClick={() => setOpenSupport(s)}
                  className={cn(
                    "group w-full cursor-pointer rounded-2xl bg-card border border-border text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isOpen && "border-primary/40 shadow-lg shadow-primary/10",
                    LAYOUT.cardPadding,
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "size-11 rounded-xl bg-muted text-black grid place-items-center shrink-0 transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
                        isOpen && "bg-primary text-primary-foreground",
                      )}
                    >
                      <s.icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold">{s.title}</h3>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-sm text-muted-foreground">{s.value}%</span>
                          <ArrowRight
                            className={cn(
                              "size-4 text-muted-foreground transition-transform group-hover:translate-x-1",
                              isOpen && "text-primary",
                            )}
                          />
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                      <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <img
            src={studentLifeImg}
            alt="Student life — clubs & hackathons"
            loading="lazy"
            className="rounded-3xl w-full aspect-[4/5] object-cover shadow-2xl shadow-primary/10"
          />
        </Reveal>
      </SectionContainer>

      {openSupport && (
        <div
          data-maintenance-allow
          className="fixed inset-0 z-50 grid place-items-center bg-black/30 px-4 py-6 backdrop-blur-xl [backdrop-filter:blur(18px)] [-webkit-backdrop-filter:blur(18px)]"
          role="presentation"
          onClick={() => setOpenSupport(null)}
        >
          <motion.article
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-detail-title"
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-2xl shadow-black/20 md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              data-maintenance-allow
              onClick={() => setOpenSupport(null)}
              className="absolute right-4 top-4 grid size-9 cursor-pointer place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Close support details"
            >
              <X className="size-4" />
            </button>

            <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <openSupport.icon className="size-5" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Student Support
            </p>
            <h3 id="support-detail-title" className="mt-2 pr-10 text-2xl font-semibold">
              {openSupport.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {openSupport.detail}
            </p>

            <div className="mt-6 rounded-2xl bg-muted/60 p-5">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                What students get
              </h4>
              <ul className="mt-4 space-y-3">
                {openSupport.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 rounded-2xl border border-border p-5">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                How to access
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {openSupport.access}
              </p>
            </div>
          </motion.article>
        </div>
      )}
    </section>
  );
}

export function Vision() {
  return (
    <section
      id="tour"
      className={cn(LAYOUT.section, "bg-navy-deep text-white relative overflow-hidden")}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(134,0,29,0.15),transparent_60%)]" />
      <SectionContainer
        className={cn("grid lg:grid-cols-2 items-center relative", LAYOUT.splitGap)}
      >
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden cyan-glow">
            <img
              src={heroVisionImg}
              alt="WhiteHouse College of Business & Technology campus"
              loading="lazy"
              className="w-full aspect-video object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Quote className="size-10 text-white/80" />
          <p className="mt-4 text-2xl md:text-3xl font-display leading-snug">
            To establish a future-focused academic ecosystem in Eastern Nepal.
          </p>
          <div className={cn(LAYOUT.contentGap, "flex flex-wrap gap-2")}>
            {["Integrity", "Excellence", "Innovation", "Inclusiveness", "Leadership"].map((v) => (
              <span
                key={v}
                className="px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white text-sm"
              >
                {v}
              </span>
            ))}
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

export function Mosaic() {
  return (
    <section className={LAYOUT.section}>
      <SectionContainer>
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            By the numbers
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold max-w-3xl">
            A campus built for ambition
          </h2>
        </Reveal>
        <div
          className={cn(
            LAYOUT.contentGap,
            "grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px]",
            LAYOUT.gridGap,
          )}
        >
          <div className="row-span-2 col-span-2 rounded-3xl overflow-hidden relative group">
            <img
              src={campusImg}
              alt="Campus infrastructure"
              loading="lazy"
              className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent flex items-end text-white",
                LAYOUT.cardPadding,
              )}
            >
              <div>
                <div className="text-xs uppercase tracking-widest text-white/80">
                  Campus Infrastructure
                </div>
                <div className="font-display text-2xl mt-1">
                  Modern facilities, built for learning
                </div>
              </div>
            </div>
          </div>
          <div
            className={cn(
              "rounded-3xl bg-navy-deep text-white flex flex-col justify-between",
              LAYOUT.cardPadding,
            )}
          >
            <span className="text-xs uppercase tracking-widest text-white/80">
              Mentors & Tie-ups
            </span>
            <div>
              <div className="text-5xl font-display font-semibold text-white">150+</div>
              <div className="text-sm text-white/70 mt-1">Industry partners</div>
            </div>
          </div>
          <div
            className={cn(
              "rounded-3xl bg-primary text-primary-foreground flex flex-col justify-between",
              LAYOUT.cardPadding,
            )}
          >
            <span className="text-xs uppercase tracking-widest">Affiliation</span>
            <div>
              <div className="text-2xl font-display font-semibold">Kathmandu University</div>
              <div className="text-sm opacity-80 mt-1">Officially affiliated programs</div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden relative group">
            <img
              src={smartClass}
              alt="Smart classroom"
              loading="lazy"
              className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              className={cn(
                "absolute inset-0 bg-navy-deep/60 flex items-end text-white",
                LAYOUT.cardPadding,
              )}
            >
              <span className="font-medium">Smart Classrooms</span>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden relative group">
            <img
              src={aiLab}
              alt="AI labs"
              loading="lazy"
              className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              className={cn(
                "absolute inset-0 bg-navy-deep/60 flex items-end text-white",
                LAYOUT.cardPadding,
              )}
            >
              <span className="font-medium">AI Innovation Labs</span>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export function Lead() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  return (
    <section id="contact" className={cn(LAYOUT.section, "bg-secondary")}>
      <SectionContainer className={cn("grid lg:grid-cols-2", LAYOUT.splitGap)}>
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Request Information
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold">Talk to admissions</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Tell us a little about you and we'll be in touch with personalised guidance.
          </p>
          <div className={cn(LAYOUT.contentGap, "space-y-4")}>
            <div className="flex items-center gap-3">
              <MapPin className="size-5 text-black" />
              <span>Jhapa, Nepal</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="size-5 text-black" />
              <span>9714530056, 9714530057</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-black" />
              <span>info@whitehouseeducation.edu.np</span>
            </div>
          </div>
          <div
            className={cn(
              LAYOUT.contentGap,
              "rounded-3xl overflow-hidden border border-border aspect-[5/3] bg-card",
            )}
          >
            <iframe
              title="Jhapa campus map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=87.6857%2C26.6586%2C87.7257%2C26.6986&layer=mapnik"
              className="size-full"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              setSending(true);
              setError("");
              sendRequestForm({
                name: String(formData.get("name") ?? ""),
                phone: String(formData.get("phone") ?? ""),
                email: String(formData.get("email") ?? ""),
                program: String(formData.get("program") ?? ""),
                message: String(formData.get("message") ?? ""),
                subject: "Website admissions inquiry",
              })
                .then(() => {
                  setSent(true);
                  form.reset();
                })
                .catch((err) => setError(err instanceof Error ? err.message : "Send failed"))
                .finally(() => setSending(false));
            }}
            className={cn(
              "rounded-3xl bg-card border border-border shadow-xl shadow-primary/10 space-y-4",
              LAYOUT.cardPadding,
            )}
          >
            {sent ? (
              <div className="py-10 text-center">
                <div className="size-14 rounded-full bg-primary text-primary-foreground grid place-items-center mx-auto">
                  <HeartHandshake className="size-7" />
                </div>
                <h3 className="mt-5 text-2xl font-display">Thank you.</h3>
                <p className="mt-2 text-muted-foreground">
                  Our admissions team will contact you shortly.
                </p>
              </div>
            ) : (
              <>
                <Input required name="name" placeholder="Full name" className="h-12 rounded-xl" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    required
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    className="h-12 rounded-xl"
                  />
                  <Input
                    required
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="h-12 rounded-xl"
                  />
                </div>
                <Input
                  required
                  name="program"
                  placeholder="Interested program (BIT or B.Tech Ed IT)"
                  className="h-12 rounded-xl"
                />
                <Textarea
                  required
                  name="message"
                  placeholder="Your message"
                  rows={4}
                  className="rounded-xl"
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button
                  type="submit"
                  size="lg"
                  disabled={sending}
                  className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                >
                  {sending ? "Sending..." : "Submit Inquiry"} <ArrowRight className="ml-1 size-4" />
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. No spam, ever.
                </p>
              </>
            )}
          </form>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

export function Footer() {
  const cols = [
    {
      h: "Community",
      items: [
        { label: "Board Members", href: "#" },
        { label: "Advisors", href: "#" },
        { label: "Faculty", href: "#" },
        { label: "Administration", href: "#" },
        { label: "International", href: "#" },
      ],
    },
    {
      h: "About",
      items: [
        { label: "KU Affiliation", href: "/ku-affiliation" },
        { label: "Industry Exposure", href: "/industry-exposure" },
        { label: "Publications", href: "/publications" },
        { label: "Legacy", href: "/legacy" },
        { label: "Governance", href: "/governance" },
      ],
    },
    {
      h: "Vision",
      items: [
        { label: "Mission", href: "#" },
        { label: "Values", href: "#" },
        { label: "Strategy", href: "#" },
        { label: "Reports", href: "#" },
      ],
    },
    {
      h: "Research",
      items: [
        { label: "AI Labs", href: "/research" },
        { label: "IoT Labs", href: "/research" },
        { label: "Innovation Centers", href: "/research" },
      ],
    },
    {
      h: "Careers",
      items: [
        { label: "Career Paths", href: "/careers" },
        { label: "Graduate Success", href: "/careers" },
        { label: "Placements", href: "#" },
      ],
    },
  ];
  return (
    <footer className="bg-navy-deep text-white/80 border-t border-white/10">
      <SectionContainer
        className={cn(LAYOUT.section, "grid md:grid-cols-2 lg:grid-cols-6", LAYOUT.gridGap)}
      >
        <div className="lg:col-span-1">
          <a href="#home" className="inline-flex">
            <img src={FOOTER_LOGO} alt="WCBT Jhapa Campus" className="h-20 w-auto sm:h-24" />
          </a>
          <p className="mt-5 text-sm text-white/60">
            Building Eastern Nepal's future-focused academic ecosystem.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{c.h}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {c.items.map((i) => (
                <li key={typeof i === "string" ? i : i.label}>
                  <a
                    href={typeof i === "string" ? "#" : i.href}
                    className="hover:text-white transition-colors"
                  >
                    {typeof i === "string" ? i : i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </SectionContainer>
      <div className="border-t border-white/10">
        <SectionContainer className="py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/60">
          <span>
            © {new Date().getFullYear()} WhiteHouse Education Foundation. All rights reserved.
          </span>
          <span>Jhapa, Nepal · 9714530056, 9714530057 · info@whitehouseeducation.edu.np</span>
        </SectionContainer>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 12,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-44 right-6 z-50 sm:bottom-24 sm:right-6 size-11 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 grid place-items-center hover:bg-primary/90 transition-colors"
    >
      <ArrowRight className="size-5 -rotate-90" />
    </motion.button>
  );
}

export function FloatingCTAs() {
  return (
    <>
      <ChatWidget />
      <ScrollToTop />
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-navy-deep/95 backdrop-blur border-t border-white/10 flex gap-2">
        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
          Apply Now
        </Button>
        <Button
          variant="outline"
          className="flex-1 rounded-full border-white/30 bg-transparent text-white hover:bg-white/10"
        >
          Inquiry
        </Button>
      </div>
    </>
  );
}

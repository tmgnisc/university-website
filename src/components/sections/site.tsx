import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Menu, X, Search, ArrowRight, FileText, GraduationCap, MessageSquare, MapPin,
  Play, Calendar, Clock, Phone, Mail, ChevronRight, Sparkles, Cpu, Shield,
  BookOpen, Users, Award, Briefcase, Laptop, HeartHandshake, Quote,
} from "lucide-react";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
const NAV_LOGO = "https://ik.imagekit.io/qn3m81dsk/university/Address%20(2).png";
const FOOTER_LOGO = "https://ik.imagekit.io/qn3m81dsk/university/Address%20(1).png";
const HOME_HERO_IMAGE = "https://ik.imagekit.io/qn3m81dsk/university/clz%205.jpg";
const HOME_IMAGE_1 = "https://ik.imagekit.io/qn3m81dsk/university/clz%201.jpg";
const HOME_IMAGE_2 = "https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg";
const HOME_IMAGE_3 = "https://ik.imagekit.io/qn3m81dsk/university/clz%203.jpg";
import progAi from "@/assets/prog-ai.jpg";
import progEdtech from "@/assets/prog-edtech.jpg";
import studentLifeImg from "@/assets/student-life.jpg";
import campusImg from "@/assets/campus.jpg";
import smartClass from "@/assets/smart-classroom.jpg";
import aiLab from "@/assets/ai-lab.jpg";
import campusTour from "@/assets/campus-tour.jpg";

const NAV = ["Home","About","Programs","Admissions","Scholarships","Campus Life","Research","Contact"];
const NAV_IDS = NAV.map((n) => n.toLowerCase().replace(/ /g, "-"));
const NAV_ROUTES: Record<string, string> = {
  Home: "/",
  About: "/about",
  Programs: "/programs",
  Admissions: "/admissions",
  Scholarships: "/scholarships",
  "Campus Life": "/campus-life",
  Research: "/research",
  Contact: "/contact",
};

function navHref(n: string) {
  return NAV_ROUTES[n] ?? `/#${n.toLowerCase().replace(/ /g, "-")}`;
}

function isNavItemActive(n: string, pathname: string, activeSection: string) {
  const route = NAV_ROUTES[n];
  if (route) {
    if (n === "Home") return pathname === "/" && activeSection === "home";
    return pathname === route;
  }
  const id = n.toLowerCase().replace(/ /g, "-");
  return pathname === "/" && activeSection === id;
}

const LAYOUT = {
  section: "py-16 md:py-24",
  container: "max-w-7xl mx-auto px-6 lg:px-10",
  contentGap: "mt-10",
  gridGap: "gap-6",
  splitGap: "gap-10 lg:gap-12",
  cardPadding: "p-6",
} as const;

function SectionContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn(LAYOUT.container, className)}>{children}</div>;
}

const navLinkClass = (active: boolean) =>
  `relative text-sm font-medium transition-colors ${
    active
      ? "text-primary font-semibold after:absolute after:-bottom-1 after:inset-x-0 after:h-0.5 after:rounded-full after:bg-primary"
      : "text-black hover:text-black/70"
  }`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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
  const [active, setActive] = useState("home");
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md border-b border-border" : "border-b border-border/60"
      }`}
    >
      <div className={cn(LAYOUT.container, "h-22 flex items-center justify-between")}>
        <Link to="/" className="flex items-center">
          <img src={NAV_LOGO} alt="WCBT Jhapa Campus" className="h-[4.5rem] w-auto sm:h-22" />
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => {
            const href = navHref(n);
            const activeLink = isNavItemActive(n, pathname, active);
            const className = navLinkClass(activeLink);
            if (NAV_ROUTES[n]) {
              return (
                <Link key={n} to={href} className={className}>
                  {n}
                </Link>
              );
            }
            return (
              <a key={n} href={href} className={className}>
                {n}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Button className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-5">
            Apply Now
          </Button>
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="lg:hidden text-black hover:text-black/70 transition-colors">
            <Menu className="size-6" />
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }}
            className="absolute right-0 top-0 h-full w-80 bg-white border-l border-border p-6 flex flex-col gap-6"
          >
            <div className="flex justify-end">
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-black hover:text-black/70 transition-colors">
                <X className="size-6" />
              </button>
            </div>
            {NAV.map((n) => {
              const href = navHref(n);
              const activeLink = isNavItemActive(n, pathname, active);
              const className = `text-lg border-b border-border pb-3 transition-colors ${
                activeLink ? "text-primary font-semibold" : "text-black hover:text-black/70"
              }`;
              if (NAV_ROUTES[n]) {
                return (
                  <Link key={n} to={href} onClick={() => setOpen(false)} className={className}>
                    {n}
                  </Link>
                );
              }
              return (
                <a key={n} href={href} onClick={() => setOpen(false)} className={className}>
                  {n}
                </a>
              );
            })}
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full mt-4">Apply Now</Button>
          </motion.aside>
        </div>
      )}
    </header>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <img src={HOME_HERO_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover -z-20" />
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="size-full object-cover scale-105"
          poster={HOME_HERO_IMAGE}
        >
          <source src="https://www.durham.ac.uk/media/durham-university/homepage/headers/UG-Open-days-HP-banner-05_24v2.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div
        className="absolute inset-0 z-[1] bg-black/40 backdrop-blur-[2px] bg-gradient-to-b from-black/50 via-black/30 to-black/55"
        aria-hidden
      />
      <motion.div
        initial="hidden" animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        className={cn(LAYOUT.container, "relative z-10 py-32 text-white drop-shadow-md")}
      >
        <motion.p variants={fadeUp} className="text-sm font-medium text-white/90">
          In Partnership with Kathmandu University
        </motion.p>
        <motion.h1 variants={fadeUp} className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.05] max-w-5xl">
          WhiteHouse College of Business & Technology
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 text-lg lg:text-xl text-white/75 max-w-2xl">
          Empowering future innovators, technologists & leaders through world-class academic pathways rooted in Eastern Nepal.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/programs" className="inline-flex">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold px-7 h-12">
              Explore Programs <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
          <Link to="/scholarships" className="inline-flex">
            <Button size="lg" variant="outline" className="rounded-full px-7 h-12 border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              Scholarship Information
            </Button>
          </Link>
          <a href="/maintenance" className="text-sm text-white/80 hover:text-white inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
            <Play className="size-4" /> Virtual Campus Tour
          </a>
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
        <span key={i} className="mx-8 inline-flex items-center gap-3 text-sm uppercase tracking-wider">
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
  const filters = ["BIT", "B.Tech Ed IT"];
  return (
    <section className={LAYOUT.section}>
      <SectionContainer>
      <Reveal>
        <div className={cn("rounded-3xl bg-card border border-border shadow-xl shadow-primary/10", LAYOUT.cardPadding)}>
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input className="h-14 pl-12 rounded-2xl text-base" placeholder="Search BIT or B.Tech Ed IT programs..." />
            </div>
            <Button className="h-14 rounded-2xl px-8 bg-primary text-primary-foreground">Search</Button>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider mr-2 self-center">Quick filters:</span>
            {filters.map((f) => (
              <button key={f} className="px-4 py-1.5 rounded-full text-sm border border-border bg-secondary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
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
  { img: progAi, tag: "KU Affiliated", title: "BIT — Bachelor in Information Technology", desc: "Build the next generation of software, AI systems and intelligent platforms." },
  { img: progEdtech, tag: "KU Affiliated", title: "B.Tech Ed IT — Technology in Education", desc: "Equip educators with cutting-edge tools to reshape modern classrooms." },
];

export function Programs() {
  return (
    <section id="programs" className={LAYOUT.section}>
      <SectionContainer>
        <Reveal className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">Programs</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold">Future-ready degrees, designed with industry</h2>
          <p className="mt-4 text-muted-foreground text-lg">Affiliated to Kathmandu University. Built for global outcomes.</p>
        </Reveal>
        <div className={cn(LAYOUT.contentGap, "grid grid-cols-1 md:grid-cols-2 w-full", LAYOUT.gridGap)}>
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="group rounded-3xl overflow-hidden bg-card border border-border shadow-xl shadow-primary/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/15 h-full flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="size-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className={cn(LAYOUT.cardPadding, "flex-1 flex flex-col")}>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">{p.tag}</span>
                  <h3 className="mt-2 font-semibold text-lg leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">{p.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

const steps = [
  { icon: FileText, title: "Admission Process", desc: "Eligibility, deadlines & documents." },
  { icon: GraduationCap, title: "Scholarship Schemes", desc: "Up to 75% merit-based aid." },
  { icon: MessageSquare, title: "Academic Inquiry", desc: "Talk to our admissions team." },
  { icon: MapPin, title: "Jhapa Campus", desc: "Visit & explore our facilities." },
];

export function NextSteps() {
  return (
    <section id="admissions" className={cn(LAYOUT.section, "bg-secondary")}>
      <SectionContainer>
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-semibold text-center max-w-3xl mx-auto">Your next academic step</h2>
        </Reveal>
        <div className={cn(LAYOUT.contentGap, "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4", LAYOUT.gridGap)}>
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className={cn("group rounded-3xl bg-card border border-border h-full transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30", LAYOUT.cardPadding)}>
                <div className="size-12 rounded-2xl bg-primary text-primary-foreground grid place-items-center group-hover:bg-primary/90 transition-colors">
                  <s.icon className="size-5" />
                </div>
                <h3 className="mt-5 flex items-center gap-1 font-semibold text-lg">
                  {s.title}
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-black" />
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
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
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">Research</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">Research & Innovation Ecosystem</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Hands-on labs in AI, Robotics, IoT and applied innovation — preparing students to solve real-world problems alongside industry mentors.
          </p>
          <div className={cn(LAYOUT.contentGap, "grid grid-cols-2", LAYOUT.gridGap)}>
            {[
              { icon: Cpu, label: "AI & ML" },
              { icon: Sparkles, label: "Robotics" },
              { icon: Shield, label: "IoT Systems" },
              { icon: BookOpen, label: "Innovation Labs" },
            ].map((x) => (
              <div key={x.label} className={cn("rounded-2xl border border-border flex items-center gap-3 bg-card", LAYOUT.cardPadding)}>
                <div className="size-10 rounded-xl bg-muted text-black grid place-items-center"><x.icon className="size-5" /></div>
                <span className="font-medium">{x.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl border border-primary/30" />
            <img src={HOME_IMAGE_1} alt="AI Robotics & IoT Innovation" loading="lazy" className="relative rounded-3xl w-full aspect-[4/3] object-cover shadow-2xl shadow-primary/20" />
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
          <div className={cn(LAYOUT.contentGap, "grid lg:grid-cols-[1fr_2fr] items-center rounded-3xl bg-white/5 border border-white/10 backdrop-blur", LAYOUT.splitGap, LAYOUT.cardPadding)}>
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
              <span className="text-xs uppercase tracking-[0.18em] text-white/80">From the President</span>
              <p className="mt-3 text-xl lg:text-2xl font-display leading-snug">
                "Our mission is to nurture an academic ecosystem where Eastern Nepal's brightest minds engineer the future — with integrity, excellence and global ambition."
              </p>
              <p className="mt-4 text-sm font-semibold text-white/90">Yuvraj Sharma</p>
              <p className="text-xs text-white/60">President</p>
              <Button className="mt-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">Read Full Message <ArrowRight className="ml-1 size-4" /></Button>
            </div>
          </div>
        </Reveal>
        <div className={cn(LAYOUT.contentGap, "grid md:grid-cols-3", LAYOUT.gridGap)}>
          {news.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.08}>
              <article className={cn("group rounded-3xl bg-white/5 border border-white/10 h-full transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/30", LAYOUT.cardPadding)}>
                <span className="text-[11px] uppercase tracking-[0.18em] text-white/80 font-semibold">{n.tag}</span>
                <h3 className="mt-3 font-semibold text-lg leading-snug">{n.title}</h3>
                <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm text-white/80 group-hover:text-white">Read more <ArrowRight className="size-4" /></a>
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
  { title: "Inter-college Sports Week", date: "Feb 18, 2026", time: "All Day", img: studentLifeImg },
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
          <a href="#" className="text-sm font-medium inline-flex items-center gap-1.5">All events <ArrowRight className="size-4" /></a>
        </Reveal>
        <div className={cn(LAYOUT.contentGap, "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4", LAYOUT.gridGap)}>
          {events.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <article className="group rounded-3xl bg-card border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 h-full flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <img src={e.img} alt={e.title} loading="lazy" className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className={cn(LAYOUT.cardPadding, "flex-1 flex flex-col")}>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Calendar className="size-3.5" />{e.date}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="size-3.5" />{e.time}</span>
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug flex-1">{e.title}</h3>
                  <a href="#" className="mt-4 text-sm font-medium text-black inline-flex items-center gap-1 group-hover:text-black/70">View Details <ArrowRight className="size-4" /></a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

const supports = [
  { icon: Briefcase, title: "Paid Internships", value: 92, desc: "Industry placements with stipends." },
  { icon: Laptop, title: "Laptop Installment Plan", value: 100, desc: "Flexible monthly EMI for every student." },
  { icon: HeartHandshake, title: "Counseling Services", value: 80, desc: "Mental health & academic guidance." },
];

export function Support() {
  return (
    <section id="campus-life" className={cn(LAYOUT.section, "bg-secondary")}>
      <SectionContainer className={cn("grid lg:grid-cols-2 items-center", LAYOUT.splitGap)}>
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Student Support</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">Beyond the classroom — we back every student</h2>
          <div className={cn(LAYOUT.contentGap, "space-y-4")}>
            {supports.map((s) => (
              <div key={s.title} className={cn("rounded-2xl bg-card border border-border", LAYOUT.cardPadding)}>
                <div className="flex items-start gap-4">
                  <div className="size-11 rounded-xl bg-muted text-black grid place-items-center shrink-0"><s.icon className="size-5" /></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold">{s.title}</h3>
                      <span className="text-sm text-muted-foreground">{s.value}%</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                    <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.value}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} className="h-full bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <img src={studentLifeImg} alt="Student life — clubs & hackathons" loading="lazy" className="rounded-3xl w-full aspect-[4/5] object-cover shadow-2xl shadow-primary/10" />
        </Reveal>
      </SectionContainer>
    </section>
  );
}

export function Vision() {
  return (
    <section id="tour" className={cn(LAYOUT.section, "bg-navy-deep text-white relative overflow-hidden")}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(134,0,29,0.15),transparent_60%)]" />
      <SectionContainer className={cn("grid lg:grid-cols-2 items-center relative", LAYOUT.splitGap)}>
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden cyan-glow">
            <img src={campusTour} alt="Virtual campus tour" loading="lazy" className="w-full aspect-video object-cover" />
            <div className="absolute inset-0 bg-navy-deep/40 grid place-items-center">
              <button className="size-20 rounded-full bg-primary text-primary-foreground grid place-items-center cyan-glow hover:scale-110 transition-transform" aria-label="Play tour">
                <Play className="size-8 fill-current" />
              </button>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Quote className="size-10 text-white/80" />
          <p className="mt-4 text-2xl md:text-3xl font-display leading-snug">
            To establish a future-focused academic ecosystem in Eastern Nepal.
          </p>
          <div className={cn(LAYOUT.contentGap, "flex flex-wrap gap-2")}>
            {["Integrity","Excellence","Innovation","Inclusiveness","Leadership"].map((v) => (
              <span key={v} className="px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white text-sm">{v}</span>
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
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">By the numbers</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold max-w-3xl">A campus built for ambition</h2>
        </Reveal>
        <div className={cn(LAYOUT.contentGap, "grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px]", LAYOUT.gridGap)}>
          <div className="row-span-2 col-span-2 rounded-3xl overflow-hidden relative group">
            <img src={campusImg} alt="Campus infrastructure" loading="lazy" className="size-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className={cn("absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent flex items-end text-white", LAYOUT.cardPadding)}>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/80">Campus Infrastructure</div>
                <div className="font-display text-2xl mt-1">Modern facilities, built for learning</div>
              </div>
            </div>
          </div>
          <div className={cn("rounded-3xl bg-navy-deep text-white flex flex-col justify-between", LAYOUT.cardPadding)}>
            <span className="text-xs uppercase tracking-widest text-white/80">Mentors & Tie-ups</span>
            <div>
              <div className="text-5xl font-display font-semibold text-white">150+</div>
              <div className="text-sm text-white/70 mt-1">Industry partners</div>
            </div>
          </div>
          <div className={cn("rounded-3xl bg-primary text-primary-foreground flex flex-col justify-between", LAYOUT.cardPadding)}>
            <span className="text-xs uppercase tracking-widest">Affiliation</span>
            <div>
              <div className="text-2xl font-display font-semibold">Kathmandu University</div>
              <div className="text-sm opacity-80 mt-1">Officially affiliated programs</div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden relative group">
            <img src={smartClass} alt="Smart classroom" loading="lazy" className="size-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className={cn("absolute inset-0 bg-navy-deep/60 flex items-end text-white", LAYOUT.cardPadding)}>
              <span className="font-medium">Smart Classrooms</span>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden relative group">
            <img src={aiLab} alt="AI labs" loading="lazy" className="size-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className={cn("absolute inset-0 bg-navy-deep/60 flex items-end text-white", LAYOUT.cardPadding)}>
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
  return (
    <section id="contact" className={cn(LAYOUT.section, "bg-secondary")}>
      <SectionContainer className={cn("grid lg:grid-cols-2", LAYOUT.splitGap)}>
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Request Information</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold">Talk to admissions</h2>
          <p className="mt-4 text-muted-foreground text-lg">Tell us a little about you and we'll be in touch with personalised guidance.</p>
          <div className={cn(LAYOUT.contentGap, "space-y-4")}>
            <div className="flex items-center gap-3"><MapPin className="size-5 text-black" /><span>Jhapa, Nepal</span></div>
            <div className="flex items-center gap-3"><Phone className="size-5 text-black" /><span>9801268585</span></div>
            <div className="flex items-center gap-3"><Mail className="size-5 text-black" /><span>info@whitehouseeducation.edu.np</span></div>
          </div>
          <div className={cn(LAYOUT.contentGap, "rounded-3xl overflow-hidden border border-border aspect-[5/3] bg-card")}>
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
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className={cn("rounded-3xl bg-card border border-border shadow-xl shadow-primary/10 space-y-4", LAYOUT.cardPadding)}
          >
            {sent ? (
              <div className="py-10 text-center">
                <div className="size-14 rounded-full bg-primary text-primary-foreground grid place-items-center mx-auto"><HeartHandshake className="size-7" /></div>
                <h3 className="mt-5 text-2xl font-display">Thank you.</h3>
                <p className="mt-2 text-muted-foreground">Our admissions team will contact you shortly.</p>
              </div>
            ) : (
              <>
                <Input required placeholder="Full name" className="h-12 rounded-xl" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input required type="tel" placeholder="Phone" className="h-12 rounded-xl" />
                  <Input required type="email" placeholder="Email" className="h-12 rounded-xl" />
                </div>
                <Input required placeholder="Interested program (BIT or B.Tech Ed IT)" className="h-12 rounded-xl" />
                <Textarea required placeholder="Your message" rows={4} className="rounded-xl" />
                <Button type="submit" size="lg" className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-12">
                  Submit Inquiry <ArrowRight className="ml-1 size-4" />
                </Button>
                <p className="text-xs text-muted-foreground text-center">We respect your privacy. No spam, ever.</p>
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
    { h: "Community", items: ["Board Members","Advisors","Faculty","Administration","International"] },
    { h: "About", items: ["KU Affiliation","Industry Exposure","Publications","Legacy","Governance"] },
    { h: "Vision", items: ["Mission","Values","Strategy","Reports"] },
    { h: "Research", items: ["AI Labs","IoT Labs","Innovation Centers","Publications"] },
    { h: "Contact", items: ["Inquiry Form","Social Links","WhatsApp","Visit Campus"] },
  ];
  return (
    <footer className="bg-navy-deep text-white/80 border-t border-white/10">
      <SectionContainer className={cn(LAYOUT.section, "grid md:grid-cols-2 lg:grid-cols-6", LAYOUT.gridGap)}>
        <div className="lg:col-span-1">
          <a href="#home" className="inline-flex">
            <img src={FOOTER_LOGO} alt="WCBT Jhapa Campus" className="h-20 w-auto sm:h-24" />
          </a>
          <p className="mt-5 text-sm text-white/60">Building Eastern Nepal's future-focused academic ecosystem.</p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{c.h}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {c.items.map((i) => (<li key={i}><a href="#" className="hover:text-white transition-colors">{i}</a></li>))}
            </ul>
          </div>
        ))}
      </SectionContainer>
      <div className="border-t border-white/10">
        <SectionContainer className="py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/60">
          <span>© {new Date().getFullYear()} WhiteHouse Education Foundation. All rights reserved.</span>
          <span>Jhapa, Nepal · 9801268585 · info@whitehouseeducation.edu.np</span>
        </SectionContainer>
      </div>
    </footer>
  );
}

export function FloatingCTAs() {
  return (
    <>
      <ChatWidget />
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-navy-deep/95 backdrop-blur border-t border-white/10 flex gap-2">
        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">Apply Now</Button>
        <Button variant="outline" className="flex-1 rounded-full border-white/30 bg-transparent text-white hover:bg-white/10">Inquiry</Button>
      </div>
    </>
  );
}

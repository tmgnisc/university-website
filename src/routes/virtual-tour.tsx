import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/virtual-tour")({
  head: () => ({
    meta: [
      { title: "Virtual Campus Tour — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Take a scrolling virtual tour of the WCBT campus in Jhapa — entrance, library, labs, lounges, and grounds.",
      },
    ],
    links: [{ rel: "canonical", href: "/virtual-tour" }],
  }),
  component: VirtualTourPage,
});

// Placeholder videos from Mixkit. Swap these URLs for real WCBT campus footage
// when ready — the tour rendering does not need to change.
const STOPS = [
  {
    title: "Main Entrance",
    description:
      "Step through the gates of WCBT in Jhapa, where your journey into technology and innovation begins.",
    video: "https://assets.mixkit.co/videos/4560/4560-720.mp4",
    poster: "https://assets.mixkit.co/videos/4560/4560-thumb-720-0.jpg",
  },
  {
    title: "Academic Block",
    description:
      "Modern classrooms and smart lecture halls designed for collaborative, hands-on learning.",
    video: "https://assets.mixkit.co/videos/48165/48165-720.mp4",
    poster: "https://assets.mixkit.co/videos/48165/48165-thumb-720-3.jpg",
  },
  {
    title: "Library & Resources",
    description:
      "A quiet space for research and study, with digital and print resources at your fingertips.",
    video: "https://assets.mixkit.co/videos/21595/21595-720.mp4",
    poster: "https://assets.mixkit.co/videos/21595/21595-thumb-720-0.jpg",
  },
  {
    title: "Computer & Innovation Labs",
    description:
      "Well-equipped spaces for coding, electronics, robotics, and project work — the heart of practical learning.",
    video: "https://assets.mixkit.co/videos/24569/24569-720.mp4",
    poster: "https://assets.mixkit.co/videos/24569/24569-thumb-720-0.jpg",
  },
  {
    title: "Student Lounge",
    description:
      "Relaxed spaces to collaborate, recharge, and connect with fellow students between classes.",
    video: "https://assets.mixkit.co/videos/4794/4794-720.mp4",
    poster: "https://assets.mixkit.co/videos/4794/4794-thumb-720-0.jpg",
  },
  {
    title: "Campus Grounds",
    description:
      "Open spaces for sports, events, and the vibrant community life that makes WCBT feel like home.",
    video: "https://assets.mixkit.co/videos/4520/4520-720.mp4",
    poster: "https://assets.mixkit.co/videos/4520/4520-thumb-720-0.jpg",
  },
];

function VirtualTourPage() {
  return (
    <PageShell>
      <TourHero />
      {STOPS.map((stop, i) => (
        <ParallaxStop key={stop.title} index={i + 1} total={STOPS.length} {...stop} />
      ))}
      <ClosingCTA />
    </PageShell>
  );
}

function TourHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.video
        style={{ y }}
        src="https://assets.mixkit.co/videos/4519/4519-720.mp4"
        poster="https://assets.mixkit.co/videos/4519/4519-thumb-720-0.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 size-full scale-125 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-white/80">Virtual Tour</span>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Explore the WCBT campus
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white/85">
          Scroll to wander through our premises in Jhapa — from the entrance to the labs, library,
          and grounds.
        </p>
        <div className="mt-10 flex flex-col items-center gap-2 text-white/80">
          <span className="text-sm">Scroll to begin</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown className="size-6" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ParallaxStop({
  index,
  total,
  title,
  description,
  video,
  poster,
}: {
  index: number;
  total: number;
  title: string;
  description: string;
  video: string;
  poster: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Video drifts slower than the page. Oversized + scaled so the
  // translation never reveals an edge.
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], ["40px", "0px", "-40px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[85vh] overflow-hidden md:h-screen">
      <motion.video
        style={{ y }}
        src={video}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${title} tour video`}
        className="absolute inset-0 size-full scale-125 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 flex h-full items-end p-8 md:p-16"
      >
        <div className="max-w-2xl text-white">
          <span className="text-xs uppercase tracking-[0.25em] text-white/70">
            Stop {index} / {total}
          </span>
          <h2 className="mt-2 text-3xl font-bold md:text-5xl">{title}</h2>
          <p className="mt-3 text-lg leading-relaxed text-white/85">{description}</p>
        </div>
      </motion.div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="bg-navy-deep px-6 py-20 text-center text-white md:py-28">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold md:text-4xl">Seen enough? Come see it in person.</h2>
        <p className="mt-4 text-lg text-white/80">
          Videos only go so far. Book a campus visit or talk to our admissions team.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/visit-us">
              Book a visit <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white/10 hover:text-white"
          >
            <Link to="/admissions">Admissions</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LAYOUT } from "@/components/layout/layout-primitives";
import { cn } from "@/lib/utils";

import heroImg from "@/assets/hero-campus.jpg";

const HOME_HERO_IMAGE = "https://ik.imagekit.io/qn3m81dsk/university/Untitled%20design%20(52).png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

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
          <Link to="/academics/scholarships" className="inline-flex">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-7 h-12 border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              Scholarship Information
            </Button>
          </Link>
          <Link
            to="/visit/virtual-tour"
            className="text-sm text-white/80 hover:text-white inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
          >
            <Play className="size-4" /> Virtual Campus Tour
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

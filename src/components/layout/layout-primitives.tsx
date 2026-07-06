import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

// Shared layout tokens + scroll-reveal wrapper used across the site chrome
// (Header/Footer) and every homepage section (sections/home/*).
export const LAYOUT = {
  section: "py-16 md:py-20",
  container: "max-w-7xl mx-auto px-6 lg:px-10",
  contentGap: "mt-10",
  gridGap: "gap-6",
  splitGap: "gap-10 lg:gap-12",
  cardPadding: "p-6",
} as const;

export function SectionContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(LAYOUT.container, className)}>{children}</div>;
}

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Reveal({
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

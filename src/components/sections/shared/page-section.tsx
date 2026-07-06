import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { fadeUp } from "./_shared";

export function PageSection({
  eyebrow,
  title,
  description,
  children,
  className,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section className={cn("py-16 md:py-20", dark && "bg-navy-deep text-white", className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span
              className={cn(
                "text-xs uppercase tracking-[0.2em] font-semibold",
                dark ? "text-white/70" : "text-primary",
              )}
            >
              {eyebrow}
            </span>
          )}
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p
              className={cn(
                "mt-4 text-lg leading-relaxed",
                dark ? "text-white/75" : "text-muted-foreground",
              )}
            >
              {description}
            </p>
          )}
        </motion.div>
        {children && <div className="mt-10 md:mt-12">{children}</div>}
      </div>
    </section>
  );
}

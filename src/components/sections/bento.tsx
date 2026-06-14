import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export type BentoItem = {
  title: string;
  description: string;
  image: string;
  badge?: string;
  className?: string;
  variant?: "image" | "stat" | "text";
  stat?: string;
  statLabel?: string;
};

function BentoCard({ item, delay = 0 }: { item: BentoItem; delay?: number }) {
  if (item.variant === "stat") {
    return (
      <motion.article
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay }}
        className={cn(
          "flex flex-col justify-between rounded-3xl border border-border bg-primary p-6 md:p-8 text-primary-foreground",
          item.className,
        )}
      >
        <p className="text-4xl md:text-5xl font-bold tracking-tight">{item.stat}</p>
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-primary-foreground/80">{item.description}</p>
        </div>
      </motion.article>
    );
  }

  if (item.variant === "text") {
    return (
      <motion.article
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay }}
        className={cn(
          "flex flex-col justify-between rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm",
          item.className,
        )}
      >
        {item.badge && (
          <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {item.badge}
          </span>
        )}
        <div className={item.badge ? "mt-4" : undefined}>
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Learn more <ArrowRight className="size-4" />
        </span>
      </motion.article>
    );
  }

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className={cn(
        "group relative min-h-[220px] overflow-hidden rounded-3xl border border-border",
        item.className,
      )}
    >
      <img
        src={item.image}
        alt=""
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
      <div className="relative flex h-full min-h-[220px] flex-col justify-end p-6 text-white">
        {item.badge && (
          <span className="mb-3 inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            {item.badge}
          </span>
        )}
        <h3 className="text-xl font-semibold">{item.title}</h3>
        <p className="mt-2 text-sm text-white/80 leading-relaxed">{item.description}</p>
      </div>
    </motion.article>
  );
}

export function BentoGrid({ items }: { items: BentoItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
      {items.map((item, i) => (
        <BentoCard key={item.title} item={item} delay={i * 0.06} />
      ))}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="pt-32 pb-14 md:pb-20 bg-gradient-to-b from-muted/60 to-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-semibold uppercase tracking-wider text-primary"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}

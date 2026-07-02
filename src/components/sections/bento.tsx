import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const HERO_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export type BentoItem = {
  title: string;
  description: string;
  image?: string;
  imageCaption?: string;
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
        "group relative min-h-[220px] overflow-hidden rounded-3xl border border-border flex flex-col",
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
      {item.imageCaption && (
        <div className="bg-muted/50 px-6 py-3 text-center border-t border-border">
          <p className="text-xs font-medium text-foreground">{item.imageCaption}</p>
        </div>
      )}
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
  image,
  imageCaption,
  imageClassName,
  overlayClassName,
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  imageCaption?: string;
  imageClassName?: string;
  overlayClassName?: string;
  primaryCta?: { label: string; href?: string };
  secondaryCta?: { label: string; href?: string };
}) {
  const [heroImage, setHeroImage] = useState(image);
  const sectionClass = image
    ? "relative pt-28 pb-14 md:pb-20 overflow-hidden border-b border-border"
    : "pt-28 pb-14 md:pb-20 bg-gradient-to-b from-muted/60 to-background border-b border-border";

  return (
    <section className={sectionClass}>
      {image && (
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setHeroImage(HERO_IMAGE_FALLBACK)}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {eyebrow && (
              <p
                className={
                  image
                    ? "text-sm font-semibold uppercase tracking-wider text-white/90"
                    : "text-sm font-semibold uppercase tracking-wider text-primary"
                }
              >
                {eyebrow}
              </p>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className={
                image
                  ? "mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl text-white"
                  : "mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl"
              }
            >
              {title}
            </motion.h1>

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className={
                  image
                    ? "mt-5 text-lg text-white/90 max-w-2xl leading-relaxed"
                    : "mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed"
                }
              >
                {description}
              </motion.p>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryCta && (
                  <Button
                    asChild
                    size="lg"
                    className={
                      image
                        ? "rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/95"
                        : "rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/95"
                    }
                  >
                    <a href={primaryCta.href ?? "#"}>
                      {primaryCta.label} <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className={
                      image
                        ? "rounded-full px-6 border-white/20 bg-transparent text-white hover:bg-white hover:text-foreground"
                        : "rounded-full px-6"
                    }
                  >
                    <a href={secondaryCta.href ?? "#"}>{secondaryCta.label}</a>
                  </Button>
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            viewport={{ once: true }}
            className="relative"
          >
            {!image && (
              <div className="rounded-3xl bg-gradient-to-tr from-primary/6 to-primary/2 border border-border p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="h-44 w-44 rounded-xl bg-primary/10 mx-auto mb-4" />
                  <p className="text-muted-foreground">Featured campus visuals</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
        {imageCaption && (
          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-muted-foreground">{imageCaption}</p>
          </div>
        )}
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { fadeUp } from "./_shared";

export function CtaBand({
  title,
  description,
  primaryLabel = "Apply Now",
  secondaryLabel = "Contact Admissions",
}: {
  title: string;
  description: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="py-16 md:py-20 bg-navy-deep text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          <p className="mt-4 text-white/75 max-w-2xl mx-auto text-lg">{description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {primaryLabel} <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              {secondaryLabel}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

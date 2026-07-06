import { motion } from "framer-motion";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { fadeUp } from "./_shared";

export function StepGrid({
  steps,
}: {
  steps: { step: string; title: string; description: string; hint?: string }[];
}) {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((s, i) => (
          <motion.article
            key={s.step}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06 }}
            className="rounded-3xl border border-border bg-card p-6"
          >
            <span className="text-3xl font-bold text-primary/30">{s.step}</span>
            <div className="mt-3 flex items-start gap-2">
              <h3 className="font-semibold">{s.title}</h3>
              {s.hint ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="rounded-full border border-border bg-muted/10 px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted"
                    >
                      i
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs text-left">
                    {s.hint}
                  </TooltipContent>
                </Tooltip>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
          </motion.article>
        ))}
      </div>
    </TooltipProvider>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";

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

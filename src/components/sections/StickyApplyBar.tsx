"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function StickyApplyBar() {
  const [pastHero, setPastHero] = useState(false);
  const [inApplySection, setInApplySection] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setPastHero(latest > window.innerHeight * 0.7);
  });

  useEffect(() => {
    const target = document.getElementById("apply");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setInApplySection(entry.isIntersecting), {
      rootMargin: "0px",
      threshold: 0.1,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !inApplySection;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-white/6 bg-bg-primary/95 p-3 shadow-[0_-8px_24px_rgba(0,0,0,0.4)] backdrop-blur-xl md:hidden"
        >
          <Button href="#apply" className="h-14 w-full">
            Apply for Coaching
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

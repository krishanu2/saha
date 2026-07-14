"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1549476464-37392f717541?w=1200&h=1600&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.42&fp-z=1.3&q=85&auto=format";

const HEADLINE_LINES = ["DISCIPLINE IS", "THE ONLY", "SUPPLEMENT", "THAT NEVER", "RUNS OUT."];

const word: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export function Hero() {
  let wordIndex = 0;
  const sectionRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-bg-primary md:flex-row"
    >
      {/* Left — headline & content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-24 pb-10 md:px-12 md:pt-32 md:pb-16 lg:px-20">
        <h1 className="font-display leading-[0.95] tracking-wide text-text-primary text-[clamp(2.25rem,min(8vw,9vh),7.5rem)]">
          {HEADLINE_LINES.map((line, lineIdx) => {
            const isLastLine = lineIdx === HEADLINE_LINES.length - 1;
            const words = line.split(" ");
            return (
              <span key={lineIdx} className="block overflow-hidden">
                {words.map((w, i) => {
                  const delay = 0.08 * wordIndex++;
                  const isLastWord = isLastLine && i === words.length - 1;
                  const core = isLastWord ? w.replace(/\.$/, "") : w;
                  return (
                    <span key={i}>
                      {i > 0 && " "}
                      <span className="inline-block overflow-hidden align-top">
                        <motion.span
                          variants={word}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay }}
                          className="inline-block"
                        >
                          {core}
                          {isLastWord && <span className="text-accent">.</span>}
                        </motion.span>
                      </span>
                    </span>
                  );
                })}
              </span>
            );
          })}
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.08 * wordIndex + 0.15 }}
          className="mt-6 font-body text-sm font-medium text-text-secondary md:text-base"
        >
          ICN Double Pro · NASM Certified · Natural Bodybuilding Coach
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.08 * wordIndex + 0.28 }}
          className="mt-8 flex w-full flex-col gap-3 min-[600px]:w-auto min-[600px]:flex-row min-[600px]:items-center min-[600px]:gap-4"
        >
          <Button href="#apply" variant="primary" className="w-full min-[600px]:w-auto">
            Apply for Coaching
          </Button>
          <Button href="#courses" variant="secondary" className="w-full min-[600px]:w-auto">
            View Courses
          </Button>
        </motion.div>

        {/* Thin lime line — 40% width, left-aligned */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.08 * wordIndex + 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute bottom-10 left-6 h-px w-[40%] origin-left bg-accent md:left-12 lg:left-20"
        />
      </div>

      {/* Right — full-bleed athlete image, no radius on top/right */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        style={isDesktop ? { y: imageY } : undefined}
        className="relative h-[46svh] w-full overflow-hidden md:h-auto md:w-[46%]"
      >
        <Image
          src={HERO_IMAGE}
          alt="Somnath Saha, natural bodybuilding coach"
          fill
          priority
          sizes="(min-width: 768px) 46vw, 100vw"
          className="object-cover object-top grayscale-[15%] contrast-[1.08] saturate-[0.9]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/55 via-transparent to-transparent md:bg-gradient-to-r md:from-bg-primary/30 md:via-transparent md:to-transparent" />

        {/* Editorial location tag */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-badge bg-bg-primary/80 px-4 py-2 backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="font-body text-xs font-medium tracking-wide text-text-primary">Bangalore, IN</span>
        </div>
      </motion.div>
    </section>
  );
}

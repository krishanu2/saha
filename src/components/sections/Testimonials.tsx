"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { testimonials } from "@/lib/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Testimonials() {
  return (
    <section className="w-full bg-bg-secondary px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader eyebrow="Client Wins" title="Proof, Not Promises" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={item} className="glass flex flex-col rounded-card p-7">
              <span className="font-display text-5xl leading-none text-accent">&ldquo;</span>
              <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-text-secondary">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
                  <Image src={t.avatar} alt={t.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <p className="font-body text-sm font-bold text-text-primary">{t.name}</p>
                  <p className="font-body text-xs text-accent">{t.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

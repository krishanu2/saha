"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data/site";
import { Counter } from "@/components/ui/Counter";

export function StatsStrip() {
  return (
    <section className="w-full bg-bg-secondary">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex flex-col items-center gap-2 border-white/10 px-6 py-14 text-center [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0 [&:not(:nth-child(2n))]:border-r md:[&:not(:nth-child(2n))]:border-r-0 md:[&:not(:last-child)]:border-r [@media(hover:hover)]:transition-transform [@media(hover:hover)]:duration-300 [@media(hover:hover)]:hover:-translate-y-1"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.08 + 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-x-0 top-0 h-px origin-left bg-accent"
            />
            <div className="font-display text-5xl text-accent">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="font-body text-sm text-text-secondary">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

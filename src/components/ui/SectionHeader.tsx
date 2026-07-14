"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  action?: { label: string; href: string };
};

export function SectionHeader({ eyebrow, title, action }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end"
    >
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="font-heading text-4xl font-bold leading-[1.05] text-text-primary sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          href={action.href}
          className="interactive group hidden shrink-0 items-center gap-2 rounded-btn border border-white/15 px-5 py-3 font-body text-sm text-text-primary transition-colors duration-200 hover:border-accent hover:text-accent md:inline-flex"
        >
          {action.label}
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
        </Link>
      )}
    </motion.div>
  );
}

"use client";

import Image from "next/image";
import { coaches } from "@/lib/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useAutoScroll } from "@/hooks/use-auto-scroll";

export function Coaches() {
  const trackRef = useAutoScroll<HTMLDivElement>(0.6, "left");

  return (
    <section id="coaches" className="w-full overflow-hidden bg-bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-20">
        <SectionHeader eyebrow="The Team" title="Coaches Who Have Lived It" />
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar edge-fade-x flex cursor-grab select-none gap-6 overflow-x-auto px-6 pb-2 active:cursor-grabbing md:px-12 lg:px-20"
      >
        {coaches.map((coach, i) => (
          <CoachCard key={`${coach.name}-${i}`} coach={coach} />
        ))}
      </div>
    </section>
  );
}

type Coach = (typeof coaches)[number];

function CoachCard({ coach }: { coach: Coach }) {
  return (
    <div className="glass w-64 shrink-0 rounded-card p-6 md:w-72 [@media(hover:hover)]:transition-transform [@media(hover:hover)]:duration-300 [@media(hover:hover)]:hover:-translate-y-1">
      <div className="relative h-64 w-full overflow-hidden rounded-input">
        <Image
          src={coach.image}
          alt={coach.name}
          fill
          draggable={false}
          sizes="288px"
          className="object-cover object-top grayscale-[10%] [@media(hover:hover)]:transition-transform [@media(hover:hover)]:duration-500 [@media(hover:hover)]:hover:scale-[1.08]"
        />
      </div>
      <h3 className="mt-5 font-heading text-xl font-bold text-text-primary">{coach.name}</h3>
      <p className="mt-1 font-body text-sm text-accent">{coach.role}</p>
      <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">{coach.bio}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {coach.credentials.map((cred) => (
          <span
            key={cred}
            className="rounded-badge bg-accent/10 px-3 py-1 font-body text-xs font-medium text-accent"
          >
            {cred}
          </span>
        ))}
      </div>
    </div>
  );
}

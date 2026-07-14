"use client";

import Image from "next/image";
import { galleryTrack1, galleryTrack2 } from "@/lib/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useAutoScroll } from "@/hooks/use-auto-scroll";

export function Gallery() {
  const track1Ref = useAutoScroll<HTMLDivElement>(0.5, "right");
  const track2Ref = useAutoScroll<HTMLDivElement>(0.5, "left");

  return (
    <section id="gallery" className="w-full overflow-hidden bg-bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-20">
        <SectionHeader eyebrow="The Proof" title="Years of Consistency" />
      </div>

      <div
        ref={track1Ref}
        className="no-scrollbar edge-fade-x mb-4 flex cursor-grab select-none gap-4 overflow-x-auto px-6 pb-2 active:cursor-grabbing md:px-12 lg:px-20"
      >
        {galleryTrack1.map((img, i) => (
          <GalleryCard key={`t1-${i}`} src={img.src} label={img.label} />
        ))}
      </div>

      <div
        ref={track2Ref}
        className="no-scrollbar edge-fade-x flex cursor-grab select-none gap-4 overflow-x-auto px-6 pb-2 active:cursor-grabbing md:px-12 lg:px-20"
      >
        {galleryTrack2.map((img, i) => (
          <GalleryCard key={`t2-${i}`} src={img.src} label={img.label} />
        ))}
      </div>
    </section>
  );
}

function GalleryCard({ src, label }: { src: string; label: string }) {
  return (
    <div className="group relative h-56 w-72 shrink-0 overflow-hidden rounded-card md:h-64 md:w-96 [@media(hover:hover)]:transition-shadow [@media(hover:hover)]:duration-300 [@media(hover:hover)]:hover:shadow-glow">
      <Image
        src={src}
        alt={label}
        fill
        draggable={false}
        sizes="384px"
        className="object-cover grayscale-[10%] [@media(hover:hover)]:transition-transform [@media(hover:hover)]:duration-500 [@media(hover:hover)]:group-hover:scale-[1.08]"
      />
      <div className="absolute inset-0 flex items-end bg-bg-primary/0 p-4 [@media(hover:hover)]:transition-colors [@media(hover:hover)]:duration-300 [@media(hover:hover)]:group-hover:bg-bg-primary/40">
        <span className="font-body text-sm font-bold text-accent opacity-0 [@media(hover:hover)]:transition-opacity [@media(hover:hover)]:duration-300 [@media(hover:hover)]:group-hover:opacity-100">
          {label}
        </span>
      </div>
    </div>
  );
}

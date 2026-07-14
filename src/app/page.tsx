import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Courses } from "@/components/sections/Courses";
import { Coaches } from "@/components/sections/Coaches";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { StickyApplyBar } from "@/components/sections/StickyApplyBar";

export default function Home() {
  return (
    <main id="main-content" className="flex-1 pb-20 md:pb-0">
      <Navigation />
      <Hero />
      <StatsStrip />
      <Courses />
      <Coaches />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
      <StickyApplyBar />
    </main>
  );
}

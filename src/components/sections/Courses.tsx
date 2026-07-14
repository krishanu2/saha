"use client";

import { motion, type Variants } from "framer-motion";
import { courses } from "@/lib/data/site";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

const cardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export function Courses() {
  const [course1, course2, course3] = courses;

  return (
    <section id="courses" className="w-full bg-bg-primary px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader eyebrow="What We Offer" title="Courses Built for Results" action={{ label: "View All Programs", href: "#courses" }} />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <motion.div variants={cardVariant} className="md:row-span-2">
            <CourseCard course={course1} tall />
          </motion.div>
          <motion.div variants={cardVariant}>
            <CourseCard course={course2} />
          </motion.div>
          <motion.div variants={cardVariant}>
            <CourseCard course={course3} />
          </motion.div>

          <motion.div
            variants={cardVariant}
            className="group flex flex-col justify-between gap-8 rounded-card bg-accent p-8 md:col-span-2 md:flex-row md:items-end"
          >
            <div>
              <h3 className="font-heading text-3xl font-bold leading-tight text-bg-primary md:text-4xl">
                Not Sure Which Program?
              </h3>
              <p className="mt-2 max-w-sm font-body text-sm text-bg-primary/70">
                Book a free 15-minute discovery call and Som will help you pick the right path.
              </p>
            </div>
            <Button href="#apply" variant="dark" className="shrink-0">
              Talk to Som
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

type Course = (typeof courses)[number];

function CourseCard({ course, tall = false }: { course: Course; tall?: boolean }) {
  return (
    <div
      className={`flex h-full flex-col justify-between gap-8 rounded-card border-t-2 border-accent bg-bg-card p-8 [@media(hover:hover)]:transition-transform [@media(hover:hover)]:duration-300 [@media(hover:hover)]:hover:-translate-y-1 ${tall ? "min-h-[22rem]" : "min-h-[16rem]"}`}
    >
      <div>
        <span className="inline-block rounded-badge bg-accent px-3 py-1 font-body text-xs font-semibold tracking-wide text-bg-primary">
          {course.badge}
        </span>
        <h3 className="mt-5 font-heading text-2xl font-bold leading-tight text-text-primary md:text-3xl">
          {course.title}
        </h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">{course.description}</p>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="font-body text-sm text-text-muted">
          {course.duration} · <span className="text-text-secondary">{course.price}</span>
        </div>
        <Button href="#apply" variant="primary" className="px-5 py-2.5 text-xs">
          Enroll Now
        </Button>
      </div>
    </div>
  );
}

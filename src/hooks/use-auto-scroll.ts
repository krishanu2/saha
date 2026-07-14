"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Direction = "left" | "right";

/**
 * Drives a real, natively-scrollable track with ambient auto-scroll.
 * Auto-scroll pauses on any user interaction (hover, touch, drag, wheel)
 * and resumes shortly after, so the content stays genuinely browsable —
 * unlike a pure CSS-transform marquee, which can't be paused on touch.
 */
export function useAutoScroll<T extends HTMLElement>(speed: number, direction: Direction = "left") {
  const ref = useRef<T>(null);
  const paused = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    if (direction === "right") {
      el.scrollLeft = el.scrollWidth / 2;
    }

    let raf: number;
    const tick = () => {
      if (!paused.current) {
        const half = el.scrollWidth / 2;
        if (direction === "left") {
          el.scrollLeft += speed;
          if (el.scrollLeft >= half) el.scrollLeft -= half;
        } else {
          el.scrollLeft -= speed;
          if (el.scrollLeft <= 0) el.scrollLeft += half;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    let resumeTimeout: number;
    const pause = () => {
      window.clearTimeout(resumeTimeout);
      paused.current = true;
    };
    const scheduleResume = (delay: number) => {
      window.clearTimeout(resumeTimeout);
      resumeTimeout = window.setTimeout(() => {
        paused.current = false;
      }, delay);
    };
    const resumeNow = () => scheduleResume(0);
    const resumeAfterIdle = () => scheduleResume(1200);

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resumeNow);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resumeAfterIdle);
    el.addEventListener("pointerdown", pause);
    el.addEventListener("pointerup", resumeAfterIdle);
    el.addEventListener("wheel", () => { pause(); resumeAfterIdle(); }, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimeout);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resumeNow);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resumeAfterIdle);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("pointerup", resumeAfterIdle);
    };
  }, [speed, direction, prefersReducedMotion]);

  return ref;
}

"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Direction = "left" | "right";

/**
 * Drives a real, natively-scrollable track with ambient auto-scroll.
 * Auto-scroll pauses on any user interaction (hover, touch, drag, wheel)
 * and resumes shortly after, so the content stays genuinely browsable —
 * unlike a pure CSS-transform marquee, which can't be paused on touch.
 *
 * The true scroll position is tracked as a float in `pos`, independent of
 * `el.scrollLeft` (which the browser rounds to an integer on read). Driving
 * the animation from a rounded value creates a fixed point whenever `speed`
 * lands exactly on a .5px boundary — the position rounds right back to where
 * it started every frame and the track appears frozen. Accumulating in `pos`
 * avoids that. `pos` is re-synced from `el.scrollLeft` on resume so a manual
 * drag/scroll isn't undone when the ambient animation picks back up.
 */
export function useAutoScroll<T extends HTMLElement>(speed: number, direction: Direction = "left") {
  const ref = useRef<T>(null);
  const paused = useRef(false);
  const pos = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    pos.current = direction === "right" ? el.scrollWidth / 2 : 0;
    el.scrollLeft = pos.current;

    let raf: number;
    const tick = () => {
      if (!paused.current) {
        const half = el.scrollWidth / 2;
        pos.current += direction === "left" ? speed : -speed;
        if (direction === "left" && pos.current >= half) pos.current -= half;
        if (direction === "right" && pos.current <= 0) pos.current += half;
        el.scrollLeft = pos.current;
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
        pos.current = el.scrollLeft;
        paused.current = false;
      }, delay);
    };
    const resumeNow = () => scheduleResume(0);
    const resumeAfterIdle = () => scheduleResume(1200);

    // Mouse click-and-drag scrolling — touch already scrolls natively, so
    // this only engages for mouse pointers to avoid fighting native touch scroll.
    let dragging = false;
    let dragStartX = 0;
    let dragStartScrollLeft = 0;
    const onPointerDown = (e: PointerEvent) => {
      pause();
      if (e.pointerType !== "mouse") return;
      dragging = true;
      dragStartX = e.clientX;
      dragStartScrollLeft = el.scrollLeft;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = dragStartScrollLeft - (e.clientX - dragStartX);
    };
    const onPointerUp = () => {
      dragging = false;
      resumeAfterIdle();
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resumeNow);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resumeAfterIdle);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointerleave", onPointerUp);
    el.addEventListener("wheel", () => { pause(); resumeAfterIdle(); }, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimeout);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resumeNow);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resumeAfterIdle);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointerleave", onPointerUp);
    };
  }, [speed, direction, prefersReducedMotion]);

  return ref;
}

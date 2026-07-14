"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const EASE_IN_OUT = [0.215, 0.61, 0.355, 1] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const prevY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
    const delta = latest - prevY.current;
    if (!mobileOpen) {
      setHidden(latest > 120 && delta > 0);
    }
    prevY.current = latest;
  });

  useEffect(() => {
    const targets = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-14 transition-all duration-300 ease-out-cubic md:h-auto md:py-6",
          scrolled
            ? "bg-bg-primary/95 backdrop-blur-xl border-b border-white/6 md:py-4"
            : "bg-transparent border-b border-transparent",
          hidden ? "-translate-y-full md:translate-y-0" : "translate-y-0",
        )}
      >
        <nav className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6 md:h-auto md:px-12">
          <Link href="#" className="interactive flex items-center font-display text-2xl tracking-wide text-text-primary">
            SOM
            <span className="ml-1 inline-block size-1.5 rounded-full bg-accent" />
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "interactive relative pb-1 font-body text-sm transition-colors duration-200 hover:text-accent",
                      isActive ? "text-accent" : "text-text-secondary",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                        transition={{ duration: 0.3, ease: EASE_IN_OUT }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <Button href="#apply" className="px-5 py-2.5 text-xs">
              Apply Now
            </Button>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="interactive -mr-2 flex size-12 items-center justify-center text-accent md:hidden"
          >
            {mobileOpen ? <X className="size-6" strokeWidth={1.5} /> : <Menu className="size-6" strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-bg-primary/90 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: EASE_IN_OUT }}
              className="fixed inset-y-0 left-0 z-40 flex w-[85%] max-w-sm flex-col bg-bg-primary pt-24 pb-8 pl-2 md:hidden"
            >
              <ul className="flex flex-col items-start">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.04 * i }}
                    className="w-full border-b border-white/6"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="interactive flex h-14 items-center px-6 font-heading text-2xl font-semibold text-text-primary hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.04 * navLinks.length }}
                className="px-6 pt-6"
              >
                <Button href="#apply" onClick={() => setMobileOpen(false)} className="w-full">
                  Apply Now
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

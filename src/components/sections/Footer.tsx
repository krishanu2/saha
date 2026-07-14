import Link from "next/link";
import { Camera, MessageCircle } from "lucide-react";
import { footerLinks, sponsors } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-bg-footer px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <Link href="#" className="flex items-center font-display text-2xl tracking-wide text-text-primary">
            SOM
            <span className="ml-1 inline-block size-1.5 rounded-full bg-accent" />
          </Link>

          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="interactive font-body text-sm text-text-secondary transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              aria-label="Instagram"
              className="interactive flex size-11 items-center justify-center rounded-full border border-white/10 text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Camera className="size-4" strokeWidth={1.5} />
            </Link>
            <Link
              href="#"
              aria-label="WhatsApp"
              className="interactive flex size-11 items-center justify-center rounded-full border border-white/10 text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <MessageCircle className="size-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-accent/20" />

        <div className="flex flex-col-reverse items-start gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-xs text-text-muted">
            © {new Date().getFullYear()} Somnath Saha Coaching. Made for natural athletes.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {sponsors.map((s) => (
              <span key={s} className="font-body text-xs uppercase tracking-wide text-text-muted">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

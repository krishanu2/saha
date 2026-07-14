import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
  onClick?: () => void;
};

export function Button({ href, children, variant = "primary", className, onClick }: ButtonProps) {
  const base =
    "interactive inline-flex min-h-12 items-center justify-center gap-2 rounded-btn px-6 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 ease-out-soft active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary [@media(hover:hover)]:hover:scale-[1.02]";

  const variants = {
    primary: "bg-accent text-bg-primary [@media(hover:hover)]:hover:bg-accent-hover [@media(hover:hover)]:hover:shadow-glow",
    secondary:
      "border border-white/15 text-text-primary [@media(hover:hover)]:hover:border-accent [@media(hover:hover)]:hover:text-accent",
    dark: "bg-bg-primary text-text-primary [@media(hover:hover)]:hover:bg-bg-secondary",
  };

  return (
    <Link href={href} onClick={onClick} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

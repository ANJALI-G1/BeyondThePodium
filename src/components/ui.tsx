import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${
        light ? "text-gold-300" : "text-gold-700"
      }`}
    >
      <span aria-hidden className={`h-px w-8 ${light ? "bg-gold-300" : "bg-gold-500"}`} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  split = false,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  center?: boolean;
  /** Centered on small screens; title left + intro right from `lg`. */
  split?: boolean;
  light?: boolean;
}) {
  const wrapper = split
    ? "mx-auto max-w-2xl text-center lg:mx-0 lg:flex lg:max-w-none lg:items-end lg:justify-between lg:gap-12 lg:text-left"
    : `max-w-2xl ${center ? "mx-auto text-center" : ""}`;
  return (
    <div className={wrapper}>
      <div>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
        <h2
          className={`mt-4 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl short:mt-3 short:text-[2.6rem] ${
            light ? "text-ivory" : "text-plum-900"
          }`}
        >
          {title}
        </h2>
      </div>
      {intro && (
        <p
          className={`mt-5 text-lg leading-relaxed lg:mt-4 short:text-base ${split ? "lg:mt-0 lg:max-w-md lg:pb-1" : ""} ${
            light ? "text-plum-100" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

type Variant = "primary" | "secondary" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-plum-700 text-ivory shadow-lg shadow-plum-700/20 hover:bg-plum-900 hover:shadow-plum-900/30",
  secondary: "border border-plum-700/25 text-plum-900 hover:border-plum-700 hover:bg-plum-50",
  light: "bg-ivory text-plum-900 hover:bg-gold-300",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link
      {...props}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className={`${className} transition-transform group-hover:translate-x-1`}>
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Container } from "./ui";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-ivory/90 shadow-[0_1px_0_rgba(79,45,87,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container className="flex h-18 items-center justify-between py-4">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-plum-700 font-display text-lg text-gold-300 transition-transform group-hover:rotate-[-8deg]">
            B
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg text-plum-900">{site.brand}</span>
            <span className="block text-[11px] uppercase tracking-[0.2em] text-muted">with {site.shortName}</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-ink/80 transition-colors hover:text-plum-700 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold-500 after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-full bg-plum-700 px-5 py-2.5 text-sm font-semibold text-ivory transition-colors hover:bg-plum-900"
          >
            Let&apos;s talk
          </Link>
        </nav>

        <button
          type="button"
          className="relative grid h-11 w-11 place-items-center rounded-full text-plum-900 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`absolute h-0.5 w-6 bg-current transition-all ${open ? "rotate-45" : "-translate-y-2"}`} />
          <span className={`absolute h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`absolute h-0.5 w-6 bg-current transition-all ${open ? "-rotate-45" : "translate-y-2"}`} />
        </button>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-plum-700/10 bg-ivory md:hidden"
      >
        <Container className="flex flex-col gap-1 py-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-plum-700/10 py-4 font-display text-2xl text-plum-900"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-6 rounded-full bg-plum-700 px-6 py-4 text-center font-semibold text-ivory"
          >
            Book a discovery call
          </Link>
        </Container>
      </nav>
    </header>
  );
}

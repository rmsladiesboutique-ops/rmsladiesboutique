"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Design Catalog" },
  { href: "/book", label: "Book Appointment" },
  { href: "/dashboard", label: "Customer Dashboard" },
  { href: "/admin/login", label: "Admin" },
];

type NavLink = {
  href: string;
  label: string;
};

type NavbarProps = {
  siteTitle?: string;
  navLinks?: NavLink[];
};

export function Navbar({ siteTitle, navLinks }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname() ?? "";

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const defaultNavItems: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Design Catalog" },
    { href: "/book", label: "Book Appointment" },
    { href: "/dashboard", label: "Customer Dashboard" },
    { href: "/admin/login", label: "Admin" },
  ];

  const navItems = navLinks?.length ? navLinks : defaultNavItems;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-2xl shadow-[0_24px_70px_-32px_rgba(20,16,12,0.16)] dark:border-white/10 dark:bg-slate-950/90">
      <div className="mx-auto container flex flex-wrap items-center justify-between gap-3 py-4">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.32em] text-slate-900 transition dark:text-slate-100">
          <Image src="/rms-logo.jpeg" alt={siteTitle ? `${siteTitle} logo` : "Site logo"} width={150} height={52} priority className="h-11 w-auto rounded-2xl object-contain border border-slate-200/70 bg-white/80 shadow-sm dark:border-white/10 dark:bg-slate-900/70" />
          {siteTitle ? <span className="text-base font-semibold tracking-[0.22em] text-slate-900 dark:text-slate-100">{siteTitle}</span> : null}
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-base font-semibold uppercase tracking-[0.22em] leading-6 transition ${pathname === item.href ? "text-foreground" : "text-foreground/70 hover:text-foreground"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/book" className="hidden md:inline-flex">
            <Button size="sm" className="rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-fuchsia-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-[0_18px_45px_-24px_rgba(194,159,75,0.85)] transition hover:brightness-105">
              <BookOpen className="h-4 w-4" />
              Book Now
            </Button>
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-foreground shadow-sm transition hover:bg-amber-50 dark:border-white/10 dark:bg-slate-900/80 md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-slate-200/60 bg-white/90 px-4 pb-4 pt-3 shadow-[0_18px_40px_-28px_rgba(26,18,12,0.18)] backdrop-blur-xl transition-all duration-200 dark:border-white/10 dark:bg-slate-950/95 md:hidden ${mobileMenuOpen ? "max-h-[520px] opacity-100" : "pointer-events-none max-h-0 overflow-hidden opacity-0"}`}
      >
        <div className="space-y-3">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-base font-semibold uppercase tracking-[0.18em] transition ${active ? "border-amber-500/30 bg-amber-500/10 text-foreground" : "border-slate-200/80 bg-white/90 text-foreground/85 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"}`}
              >
                <span>{item.label}</span>
                <ChevronRight className="h-4 w-4 text-amber-700 dark:text-amber-200" />
              </Link>
            );
          })}
        </div>

        <div className="mt-4">
          <Link href="/book" onClick={closeMobileMenu} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 px-4 py-3 text-sm font-medium text-black shadow-[0_14px_30px_-18px_rgba(184,137,47,0.8)] transition hover:bg-amber-400">
            <BookOpen className="h-4 w-4" />
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}

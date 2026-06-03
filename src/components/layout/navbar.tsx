"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
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
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-3xl shadow-[0_20px_70px_-30px_rgba(15,12,10,0.15)] dark:border-white/10 dark:bg-zinc-950/80">
      <div className="mx-auto container flex flex-wrap items-center justify-between gap-3 py-4">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.32em] text-slate-900 transition dark:text-slate-100">
          <Image src="/rms-logo.jpeg" alt={siteTitle ? `${siteTitle} logo` : "Site logo"} width={150} height={52} priority className="h-10 w-auto rounded-xl object-contain" />
          {siteTitle ? <span className="text-base font-semibold tracking-[0.22em] text-slate-900 dark:text-slate-100">{siteTitle}</span> : null}
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-base font-semibold uppercase tracking-[0.22em] leading-6 transition ${pathname === item.href ? "text-foreground" : "text-foreground/75 hover:text-foreground"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <Link href="/book" className="hidden md:inline-flex">
            <Button size="sm" className="rounded-full bg-amber-800 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_45px_-24px_rgba(204,157,84,0.8)] transition hover:bg-amber-700">
              <BookOpen className="h-4 w-4" />
              Book Now
            </Button>
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/85 text-foreground shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/10 md:hidden"
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
        className={`border-t border-black/5 bg-[rgba(255,250,244,0.96)] px-4 pb-4 pt-3 shadow-[0_18px_40px_-28px_rgba(26,18,12,0.45)] backdrop-blur-xl transition-all duration-200 dark:border-white/10 dark:bg-black/90 md:hidden ${mobileMenuOpen ? "max-h-[520px] opacity-100" : "pointer-events-none max-h-0 overflow-hidden opacity-0"}`}
      >
        <div className="space-y-2">
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

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link href="/book" onClick={closeMobileMenu} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-4 py-3 text-sm font-medium text-black shadow-[0_14px_30px_-18px_rgba(184,137,47,0.8)] transition hover:bg-amber-400">
            <BookOpen className="h-4 w-4" />
            Book Now
          </Link>
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const defaultNavItems: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Design Catalog" },
    { href: "/book", label: "Book Appointment" },
    { href: "/dashboard", label: "Customer Dashboard" },
    { href: "/admin/login", label: "Admin" },
  ];

  const navItems = navLinks?.length ? navLinks : defaultNavItems;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95" : "bg-transparent"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.32em] text-slate-950 transition dark:text-slate-100">
          <Image src="/rms-logo.jpeg" alt={siteTitle ? `${siteTitle} logo` : "Site logo"} width={140} height={48} priority className="h-10 w-auto rounded-2xl border border-slate-200/70 bg-white/80 object-contain shadow-sm dark:border-white/10 dark:bg-slate-900/70" />
          {siteTitle ? <span className="hidden text-base tracking-[0.22em] text-slate-950 dark:text-slate-100 sm:inline">{siteTitle}</span> : null}
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold uppercase tracking-[0.22em] transition ${active ? "text-slate-950 dark:text-white" : "text-slate-700/80 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/book" className="hidden rounded-full border border-slate-900/10 bg-slate-950 px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-slate-900 md:inline-flex">
            Book Now
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-white/95 text-slate-900 shadow-sm transition hover:border-slate-300 dark:border-white/10 dark:bg-slate-900/80 dark:text-white md:hidden"
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
        className={`fixed inset-x-4 top-20 z-40 rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-slate-950/95 md:hidden ${mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="space-y-4">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-3xl border px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] transition ${active ? "border-slate-900/10 bg-slate-950/95 text-white" : "border-slate-200/80 bg-white text-slate-900 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="mt-5">
          <Link href="/book" onClick={() => setMobileMenuOpen(false)} className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-slate-800">
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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
  const isHome = pathname === "/";
  const heroMode = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
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
  ];

  const navItems = navLinks?.length ? navLinks : defaultNavItems;

  const headerClass = scrolled
    ? "glass-nav shadow-[0_8px_32px_-12px_rgba(17,24,39,0.12)]"
    : heroMode
      ? "glass-nav-hero"
      : "bg-transparent";

  const linkClass = (active: boolean) => {
    if (heroMode) {
      return active
        ? "text-[#D4AF37]"
        : "text-white/80 hover:text-white";
    }
    return active
      ? "text-[#B8864A]"
      : "text-[#6B7280] hover:text-[#111827]";
  };

  const activeIndicator = heroMode ? "via-[#D4AF37]" : "via-[#B8864A]";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${headerClass}`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16">
        <Link
          href="/"
          className="group flex items-center gap-4 transition hover:opacity-90"
        >
          <Image
            src="/rms-logo.jpeg"
            alt={siteTitle ? `${siteTitle} logo` : "Site logo"}
            width={160}
            height={56}
            priority
            className={`h-12 w-auto rounded-2xl object-contain transition-all duration-300 sm:h-14 ${
              heroMode
                ? "border border-white/20 bg-white/10 p-1 backdrop-blur-md"
                : "border border-[#E5E7EB] bg-white p-1 shadow-lg"
            }`}
          />
          {siteTitle ? (
            <span
              className={`hidden font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.28em] sm:inline uppercase ${
                heroMode ? "text-white" : "text-[#111827]"
              }`}
            >
              {siteTitle}
            </span>
          ) : null}
        </Link>

        <nav
          className="hidden items-center gap-10 lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-xs font-semibold uppercase tracking-[0.26em] transition-all duration-300 ${linkClass(active)}`}
              >
                {item.label}
                {active && (
                  <span className={`absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent ${activeIndicator} to-transparent`} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/book"
            className={`hidden items-center rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 hover:scale-[1.04] md:inline-flex ${
              heroMode
                ? "bg-[#D4AF37] text-[#111827] shadow-[0_8px_30px_-8px_rgba(212,175,55,0.6)] hover:bg-[#c9a430]"
                : "bg-[#B8864A] text-white shadow-[0_18px_40px_-18px_rgba(184,134,74,0.55)] hover:bg-[#9a6f3a]"
            }`}
          >
            Book Now
          </Link>
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:scale-[1.05] md:hidden ${
              heroMode
                ? "border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-white/40"
                : "border-[#E5E7EB] bg-white text-[#111827] shadow-lg hover:border-[#B8864A]/30"
            }`}
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
        className={`fixed inset-0 z-40 bg-[#111827]/70 backdrop-blur-sm transition-opacity duration-500 ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        id="mobile-nav"
        className={`fixed inset-x-5 top-24 z-50 mx-auto w-full max-w-sm max-h-[calc(100vh-7rem)] overflow-y-auto rounded-[2rem] glass-panel p-7 transition-all duration-500 md:hidden ${
          mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="space-y-3">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-2xl border px-5 py-4 text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 ${
                  active
                    ? "border-[#B8864A]/30 bg-[#111827] text-white shadow-lg"
                    : "border-[#E5E7EB] bg-white text-[#111827] hover:border-[#B8864A]/20 hover:bg-[#FAF7F2]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="mt-6">
          <Link
            href="/book"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary flex w-full items-center justify-center text-xs py-4"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}

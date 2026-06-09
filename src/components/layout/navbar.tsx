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
  ];

  const navItems = navLinks?.length ? navLinks : defaultNavItems;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[#B8864A]/10 bg-[#FAF7F2]/98 shadow-[0_24px_60px_-40px_rgba(17,24,39,0.15)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-4 transition hover:opacity-80"
        >
          <Image
            src="/rms-logo.jpeg"
            alt={siteTitle ? `${siteTitle} logo` : "Site logo"}
            width={160}
            height={56}
            priority
            className="h-14 w-auto rounded-3xl border border-[#E5E7EB] bg-white p-1 shadow-lg object-contain"
          />
          {siteTitle ? (
            <span className="hidden text-base font-semibold tracking-[0.32em] text-[#111827] sm:inline uppercase">
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
                className={`text-xs font-semibold uppercase tracking-[0.28em] transition-all duration-300 relative ${
                  active
                    ? "text-[#B8864A]"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#B8864A] to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/book"
            className="hidden rounded-full bg-[#B8864A] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-[0_24px_50px_-20px_rgba(184,134,74,0.6)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#9a6f3a] hover:shadow-[0_30px_60px_-20px_rgba(184,134,74,0.7)] md:inline-flex items-center"
          >
            Book Now
          </Link>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#111827] shadow-xl transition-all duration-300 hover:scale-[1.05] hover:border-[#B8864A]/30 hover:shadow-2xl md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-[#111827]/60 backdrop-blur-sm transition-opacity duration-500 ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        id="mobile-nav"
        className={`fixed inset-x-6 top-28 z-50 mx-auto w-full max-w-[28rem] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-[2.5rem] border border-[#E5E7EB] bg-[#FAF7F2] p-8 shadow-[0_40px_100px_-40px_rgba(17,24,39,0.3)] transition-all duration-500 md:hidden ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="space-y-5">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-[1.75rem] border px-6 py-5 text-xs font-semibold uppercase tracking-[0.24em] transition-all duration-300 ${
                  active
                    ? "border-[#B8864A]/30 bg-[#111827] text-white shadow-[0_24px_45px_-20px_rgba(17,24,39,0.4)]"
                    : "border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#FAF7F2] hover:border-[#B8864A]/20"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="mt-8">
          <Link
            href="/book"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#B8864A] px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-[0_24px_50px_-20px_rgba(184,134,74,0.6)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#9a6f3a]"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}

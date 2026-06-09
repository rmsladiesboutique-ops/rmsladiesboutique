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
    { href: "/admin/login", label: "Admin" },
  ];

  const navItems = navLinks?.length ? navLinks : defaultNavItems;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-[#111827]/10 bg-[#FAF7F2]/95 shadow-[0_18px_45px_-30px_rgba(17,24,39,0.15)] backdrop-blur-xl" : "bg-[#FAF7F2]/80 backdrop-blur-sm"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.32em] text-[#1F2937] transition">
          <Image src="/rms-logo.jpeg" alt={siteTitle ? `${siteTitle} logo` : "Site logo"} width={140} height={48} priority className="h-10 w-auto rounded-2xl border border-[#111827]/10 bg-white object-contain shadow-sm" />
          {siteTitle ? <span className="hidden text-base tracking-[0.22em] text-[#1F2937] sm:inline">{siteTitle}</span> : null}
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold uppercase tracking-[0.22em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8864A]/50 focus-visible:ring-offset-2 ${active ? "text-[#111827]" : "text-[#6B7280] hover:text-[#1F2937]"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/book" className="hidden rounded-full bg-[#B8864A] px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-[0_18px_40px_-18px_rgba(184,134,74,0.55)] transition hover:scale-[1.03] hover:bg-[#9a6f3a] md:inline-flex">
            Book Now
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#111827]/10 bg-white text-[#1F2937] shadow-sm transition hover:scale-[1.02] hover:border-[#B8864A]/40 md:hidden"
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
        className={`fixed inset-0 z-40 bg-[#111827]/50 transition-opacity duration-300 ${mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        id="mobile-nav"
        className={`fixed inset-x-4 top-24 z-50 mx-auto w-full max-w-[24rem] max-h-[calc(100vh-6rem)] overflow-y-auto rounded-[2.3rem] border border-[#111827]/10 bg-[#FAF7F2] p-6 shadow-[0_30px_80px_-30px_rgba(17,24,39,0.2)] transition duration-300 md:hidden ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="space-y-4">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-[1.5rem] border px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] transition ${active ? "border-[#B8864A]/40 bg-[#111827] text-white shadow-[0_16px_30px_-18px_rgba(17,24,39,0.35)]" : "border-[#111827]/10 bg-white text-[#1F2937] hover:bg-[#FAF7F2]"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="mt-5">
          <Link href="/book" onClick={() => setMobileMenuOpen(false)} className="inline-flex w-full items-center justify-center rounded-full bg-[#B8864A] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_18px_40px_-18px_rgba(184,134,74,0.55)] transition hover:scale-[1.03] hover:bg-[#9a6f3a]">
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}

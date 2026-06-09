"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Shirt,
  Clock,
  Ruler,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Shield,
} from "lucide-react";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/admin/designs", label: "Designs", icon: Shirt },
  { href: "/admin/availability", label: "Availability", icon: Clock },
  { href: "/admin/measurements", label: "Measurements", icon: Ruler },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const pathname = usePathname() ?? "";
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthChecked(true);
      return;
    }

    let cancelled = false;

    const verifySession = async () => {
      try {
        const response = await fetch("/api/admin/session", { credentials: "same-origin" });
        const data = (await response.json()) as { authenticated?: boolean };

        if (!cancelled && data.authenticated !== true) {
          router.replace("/admin/login");
          return;
        }
      } finally {
        if (!cancelled) {
          setAuthChecked(true);
        }
      }
    };

    void verifySession();

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-[#111827]">
        <p className="text-sm uppercase tracking-[0.24em] text-[#6B7280]">Checking admin access…</p>
      </div>
    );
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
    router.push("/admin/login");
  };

  const NavContent = () => (
    <>
      <div className="border-b border-white/10 p-6">
        <Link href="/admin" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
          <Image
            src="/rms-logo.jpeg"
            alt="RMS Boutique"
            width={120}
            height={48}
            className="h-10 w-auto rounded-xl border border-white/10 bg-white/5 p-0.5 object-contain"
          />
          <div>
            <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-white">
              RMS Boutique
            </p>
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#D4AF37]">Admin Portal</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4" aria-label="Admin navigation">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setSidebarOpen(false)}
            className={`admin-sidebar-link ${isActive(href) ? "admin-sidebar-link-active" : ""}`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-4">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <Shield className="h-4 w-4 text-[#D4AF37]" />
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/40">Session</p>
            <p className="text-xs text-white/70">Secured · 8h TTL</p>
          </div>
        </div>
        <Link
          href="/"
          target="_blank"
          className="admin-sidebar-link text-white/50 hover:text-white"
          onClick={() => setSidebarOpen(false)}
        >
          <ExternalLink className="h-4 w-4" />
          View Website
        </Link>
        <form onSubmit={handleLogout}>
          <button type="submit" className="admin-sidebar-link w-full text-left text-white/50 hover:text-rose-300">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <div className="admin-layout flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="admin-sidebar fixed inset-y-0 left-0 z-40 hidden w-64 lg:flex">
        <NavContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-40 bg-[#111827]/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      ) : null}
      <aside
        className={`admin-sidebar fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          className="absolute right-4 top-5 rounded-lg p-2 text-white/60 hover:bg-white/10"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        <NavContent />
      </aside>

      {/* Main content */}
      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#E5E7EB] bg-white/90 px-4 py-4 backdrop-blur-md md:px-8">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-[#E5E7EB] bg-white p-2.5 text-[#111827] lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#B8864A]">Operations</p>
            <p className="text-sm text-[#6B7280]">Manage your boutique workspace</p>
          </div>
          <form onSubmit={handleLogout} className="hidden sm:block">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280] transition hover:border-[#B8864A]/30 hover:text-[#B8864A]"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[#E5E7EB] bg-white px-4 py-4 text-center text-[0.68rem] uppercase tracking-[0.2em] text-[#6B7280] md:px-8">
          Secured admin portal · Developed by EGB Developers
        </footer>
      </div>
    </div>
  );
}

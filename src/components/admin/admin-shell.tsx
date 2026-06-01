"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/appointments", label: "Appointments" },
    { href: "/admin/designs", label: "Designs" },
    { href: "/admin/availability", label: "Availability" },
    { href: "/admin/settings", label: "Settings" },
    { href: "/admin/email-templates", label: "Email Templates" },
    { href: "/admin/measurements", label: "Measurements" },
  ];

  return (
    <div>
      <header className="sticky top-0 z-40 w-full bg-zinc-900/60 backdrop-blur-md border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <button aria-label="Toggle menu" className="md:hidden" onClick={() => setOpen((s) => !s)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber-300"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <Link href="/admin" className="text-lg font-semibold text-amber-300">Atelier Noir</Link>
          </div>

          <nav className="hidden md:flex md:items-center md:gap-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-zinc-300 hover:text-amber-300">{l.label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <form action="/api/admin/logout" method="POST">
              <Button variant="ghost" size="sm" type="submit"><LogOut className="mr-2 h-4 w-4" />Logout</Button>
            </form>
          </div>
        </div>

        {open ? (
          <div className="md:hidden border-t border-zinc-800 bg-zinc-900">
            <div className="flex flex-col px-4 py-3">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="py-2 text-sm text-zinc-200" onClick={() => setOpen(false)}>{l.label}</Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <div className="min-h-[calc(100vh-64px)]">{children}</div>

      <footer className="fixed bottom-4 left-1/2 z-50 w-[min(640px,90%)] -translate-x-1/2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-2 backdrop-blur-md shadow-lg md:hidden">
        <div className="flex items-center justify-between">
          {links.slice(0, 4).map((l) => (
            <Link key={l.href} href={l.href} className="flex flex-col items-center text-xs text-zinc-200">
              <span className="h-6 w-6 rounded-md bg-zinc-800/60" />
              <span className="mt-1">{l.label.split(' ')[0]}</span>
            </Link>
          ))}
          <Link href="/admin/settings" className="flex flex-col items-center text-xs text-zinc-200">
            <span className="h-6 w-6 rounded-md bg-zinc-800/60" />
            <span className="mt-1">More</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}

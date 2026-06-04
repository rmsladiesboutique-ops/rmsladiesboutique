"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const router = useRouter();

  // Skip shell UI on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/appointments", label: "Appointments" },
    { href: "/admin/designs", label: "Designs" },
    { href: "/admin/availability", label: "Availability" },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(184,137,47,0.1),transparent_24%),radial-gradient(circle_at_85%_12%,rgba(255,255,255,0.18),transparent_18%)]">
      <header className="sticky top-0 z-40 w-full border-b border-black/5 bg-[rgba(248,242,235,0.72)] backdrop-blur-xl dark:border-white/10 dark:bg-black/55">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <button aria-label="Toggle menu" aria-expanded={open} className="rounded-full border border-black/10 bg-white/70 p-2 md:hidden dark:border-white/10 dark:bg-white/5" onClick={() => setOpen((s) => !s)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber-700 dark:text-amber-200"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div>
              <Link href="/admin" className="text-lg font-semibold text-foreground">RMS LADIES BOUTIQUE</Link>
              <p className="text-xs text-foreground/60">Boutique operations workspace</p>
            </div>
          </div>

          <nav aria-label="Admin navigation" className="hidden items-center gap-2 rounded-full border border-black/5 bg-white/70 px-2 py-2 md:flex dark:border-white/10 dark:bg-white/5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm transition ${isActive(l.href) ? "bg-amber-500 text-black shadow-sm" : "text-foreground/70 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <form onSubmit={handleLogout}>
              <Button variant="ghost" size="sm" type="submit" className="border border-black/10 bg-white/70 text-foreground hover:bg-white dark:border-white/10 dark:bg-white/5">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>
        </div>

        {open ? (
          <div className="border-t border-black/5 bg-white/90 md:hidden dark:border-white/10 dark:bg-black/70">
            <div className="flex flex-col px-4 py-3">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-xl px-3 py-3 text-sm text-foreground/80 transition hover:bg-black/5 dark:hover:bg-white/5" onClick={() => setOpen(false)}>{l.label}</Link>
              ))}
              <form onSubmit={handleLogout} className="mt-2">
                <Button variant="ghost" size="sm" type="submit" className="w-full justify-start border border-black/10 bg-white/70 text-foreground hover:bg-white dark:border-white/10 dark:bg-white/5">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </form>
            </div>
          </div>
        ) : null}
      </header>

      <div className="min-h-[calc(100vh-64px)] pb-24">{children}</div>

      <footer aria-label="Mobile admin navigation" className="fixed bottom-4 left-1/2 z-50 w-[min(640px,90%)] -translate-x-1/2 rounded-full border border-black/5 bg-white/80 px-4 py-2 shadow-[0_18px_50px_-32px_rgba(36,24,14,0.85)] backdrop-blur-xl dark:border-white/10 dark:bg-black/65 md:hidden">
        <div className="flex items-center justify-between">
          {links.slice(0, 5).map((l) => (
            <Link key={l.href} href={l.href} className={`flex flex-col items-center rounded-xl px-2 py-1 text-xs transition ${isActive(l.href) ? "text-amber-700 dark:text-amber-200" : "text-foreground/65"}`}>
              <span className={`h-6 w-6 rounded-md ${isActive(l.href) ? "bg-amber-500/20" : "bg-black/5 dark:bg-white/10"}`} />
              <span className="mt-1">{l.label.split(" ")[0]}</span>
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Design Catalog" },
  { href: "/book", label: "Book Appointment" },
  { href: "/dashboard", label: "Customer Dashboard" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-black/70 backdrop-blur">
      <div className="mx-auto container flex items-center justify-between px-2 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-amber-200">
          <Image src="/rms-logo.jpeg" alt="RMS Ladies Boutique" width={150} height={52} priority className="h-10 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-zinc-300 hover:text-amber-200">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/book">
            <Button size="sm">Book Now</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname() ?? "";

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="mt-24 border-t border-black/10 bg-gradient-to-r from-amber-50 via-fuchsia-50 to-teal-50 dark:border-white/10 dark:bg-gradient-to-r dark:from-[#090706] dark:via-[#14100f] dark:to-[#131010]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-10 text-sm text-foreground/70 md:flex-row md:px-8">
        <div>
          <p className="font-semibold text-foreground">RMS Ladies Boutique</p>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-foreground/55">High-fashion tailoring, made unforgettable</p>
        </div>
        <div className="space-y-1 text-center md:text-right">
          <p className="font-medium text-foreground/75">WhatsApp: +1 555 200 3456</p>
          <p className="text-foreground/65">support@ateliernoir.com</p>
        </div>
      </div>
    </footer>
  );
}

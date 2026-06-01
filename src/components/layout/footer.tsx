"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="mt-24 border-t border-black/5 bg-white/60 dark:border-white/10 dark:bg-black/45">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-foreground/65 md:flex-row md:px-8">
        <div>
          <p className="font-semibold text-foreground">RMS Ladies Boutique</p>
          <p className="mt-1 text-xs uppercase tracking-[0.24em] text-foreground/45">Luxury tailoring and bridal fashion</p>
        </div>
        <p>WhatsApp: +1 555 200 3456 | support@ateliernoir.com</p>
      </div>
    </footer>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { Globe, MapPin, PhoneCall } from "lucide-react";

type FooterProps = {
  siteTitle?: string;
  tagline?: string;
  phone?: string;
  email?: string;
};

export function Footer({ siteTitle, tagline, phone, email }: FooterProps) {
  const pathname = usePathname() ?? "";

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="mt-24 border-t border-black/10 bg-gradient-to-r from-amber-50 via-fuchsia-50 to-teal-50 dark:border-white/10 dark:bg-gradient-to-r dark:from-[#090706] dark:via-[#14100f] dark:to-[#131010]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 text-sm text-foreground/70 md:flex-row md:px-8">
        <div>
          <p className="font-semibold text-foreground">{siteTitle ?? "Atelier Noir"}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-foreground/55">{tagline ?? "Expert tailoring and personalised womenswear appointments."}</p>
        </div>
        <div className="grid gap-2 text-center md:text-right">
          <a href="tel:+918296028147" className="inline-flex items-center justify-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-amber-100 dark:bg-zinc-900 dark:text-white">
            <PhoneCall className="h-4 w-4" /> 8296028147
          </a>
          <a href="https://maps.app.goo.gl/ouR5nVnGQCM6aPxK6?g_st=aw" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-sky-100 dark:bg-zinc-900 dark:text-white">
            <MapPin className="h-4 w-4" /> View location
          </a>
          <a href="https://www.instagram.com/rmsladiesboutique?igsh=M3gybDBzdmkyN2Y5" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-pink-100 dark:bg-zinc-900 dark:text-white">
            <Globe className="h-4 w-4" /> Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

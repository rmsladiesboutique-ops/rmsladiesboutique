"use client";

import { usePathname } from "next/navigation";
import { MapPin, PhoneCall } from "lucide-react";

function InstagramLogo(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="instagram-gradient-footer" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f09433" />
          <stop offset="0.3" stopColor="#e6683c" />
          <stop offset="0.6" stopColor="#dc2743" />
          <stop offset="1" stopColor="#cc2366" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#instagram-gradient-footer)" />
      <path d="M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.3" fill="#fff" />
      <circle cx="16.5" cy="7.5" r="1.1" fill="#fff" />
    </svg>
  );
}

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
    <footer className="mt-24 border-t border-slate-200/70 bg-gradient-to-b from-white/95 via-slate-50/95 to-slate-100 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:border-white/10 dark:bg-[#080706] dark:text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-12 md:flex-row md:px-8">
        <div>
          <p className="text-3xl font-semibold uppercase tracking-[0.24em] text-foreground dark:text-slate-100">{siteTitle ?? "RMS LADIES BOUTIQUE"}</p>
          <p className="mt-3 max-w-md text-sm uppercase tracking-[0.28em] text-foreground/65 dark:text-slate-400">{tagline ?? "Expert tailoring and personalised womenswear appointments."}</p>
        </div>
        <div className="grid gap-3 text-left md:text-right">
          <a href="tel:+918296028147" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-5 py-4 text-base font-semibold text-foreground shadow-sm transition hover:border-amber-200 hover:bg-amber-50 dark:border-white/10 dark:bg-zinc-900 dark:text-white">
            <PhoneCall className="h-4 w-4" /> 8296028147
          </a>
          <a href="https://maps.app.goo.gl/ouR5nVnGQCM6aPxK6?g_st=aw" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-5 py-4 text-base font-semibold text-foreground shadow-sm transition hover:border-sky-200 hover:bg-sky-50 dark:border-white/10 dark:bg-zinc-900 dark:text-white">
            <MapPin className="h-4 w-4" /> View location
          </a>
          <a href="https://www.instagram.com/rmsladiesboutique?igsh=M3gybDBzdmkyN2Y5" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-5 py-4 text-base font-semibold text-foreground shadow-sm transition hover:border-pink-200 hover:bg-pink-50 dark:border-white/10 dark:bg-zinc-900 dark:text-white">
            <InstagramLogo className="h-4 w-4" /> Instagram
          </a>
        </div>
      </div>
      <div className="border-t border-slate-200/50 dark:border-white/5 mt-8 pt-6 px-4 md:px-8">
        <p className="text-xs tracking-[0.22em] text-center uppercase text-foreground/40 dark:text-slate-500">This is a website developed by EGB DEVELOPERS</p>
      </div>
    </footer>
  );
}

"use client";

import { usePathname } from "next/navigation";

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
    <footer className="border-t border-[#e7d8ca] bg-[linear-gradient(180deg,#fffaf6_0%,#f6efe8_100%)] text-slate-950 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">RMS Ladies Boutique</p>
            <p className="text-2xl font-semibold tracking-[-0.02em] text-slate-950 dark:text-white">{siteTitle ?? "RMS LADIES BOUTIQUE"}</p>
            <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">{tagline ?? "A discreet couture atelier crafting tailored womenswear with timeless elegance and personalized service."}</p>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Contact</p>
            {phone ? <p className="text-sm font-semibold text-slate-950 dark:text-white">{phone}</p> : null}
            {email ? <p className="text-sm text-slate-600 dark:text-slate-400">{email}</p> : null}
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Explore</p>
            <a href="/book" className="text-sm font-semibold text-slate-950 transition hover:text-amber-700 dark:text-slate-100">Book a consultation</a>
            <a href="https://www.instagram.com/rmsladiesboutique" target="_blank" rel="noreferrer" className="text-sm font-semibold text-slate-950 transition hover:text-amber-700 dark:text-slate-100">Instagram</a>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200/50 pt-6 text-center text-xs uppercase tracking-[0.24em] text-slate-500 dark:border-white/10 dark:text-slate-400">
          An exclusive bespoke fashion experience designed for exceptional women.
        </div>
      </div>
    </footer>
  );
}

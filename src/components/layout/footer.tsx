"use client";

import { usePathname } from "next/navigation";

type FooterProps = {
  siteTitle?: string;
  tagline?: string;
};

export function Footer({ siteTitle, tagline }: FooterProps) {
  const pathname = usePathname() ?? "";

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="mt-24 border-t border-slate-200/70 bg-gradient-to-b from-white/95 via-amber-50/80 to-slate-100 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:border-white/10 dark:bg-[#080706] dark:text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-16 md:flex-row md:px-8">
        <div className="max-w-2xl">
          <p className="text-3xl font-semibold uppercase tracking-[0.24em] text-foreground dark:text-slate-100">{siteTitle ?? "RMS LADIES BOUTIQUE"}</p>
          <p className="mt-3 max-w-md text-sm uppercase tracking-[0.28em] text-foreground/65 dark:text-slate-400">{tagline ?? "Expert tailoring and personalised womenswear appointments."}</p>
        </div>
      </div>
      <div className="border-t border-slate-200/50 dark:border-white/5 mt-8 pt-6 px-4 md:px-8">
        <p className="text-xs tracking-[0.22em] text-center uppercase text-foreground/40 dark:text-slate-500">This is a website developed by EGB DEVELOPERS</p>
      </div>
    </footer>
  );
}

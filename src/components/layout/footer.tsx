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
    <footer className="mt-24 border-t border-slate-200/70 bg-gradient-to-b from-white/95 via-amber-50/80 to-slate-100 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:border-white/10 dark:bg-[#080706] dark:text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="max-w-2xl">
          <p className="text-3xl font-semibold uppercase tracking-[0.24em] text-foreground dark:text-slate-100">{siteTitle ?? "RMS LADIES BOUTIQUE"}</p>
          <p className="mt-3 max-w-md text-sm uppercase tracking-[0.28em] text-foreground/65 dark:text-slate-400">{tagline ?? "Expert tailoring and personalised womenswear appointments."}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {phone ? (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Studio phone</p>
              <p className="mt-2 font-semibold text-foreground dark:text-white">{phone}</p>
            </div>
          ) : null}
          {email ? (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Email</p>
              <p className="mt-2 font-semibold text-foreground dark:text-white">{email}</p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="border-t border-slate-200/50 dark:border-white/5 mt-8 pt-6 px-4 md:px-8">
        <p className="text-xs tracking-[0.22em] text-center uppercase text-foreground/40 dark:text-slate-500">Designed and managed for a boutique couture experience.</p>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { Mail, MapPin, PhoneCall, ArrowRight } from "lucide-react";
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
    <footer className="border-t border-[#111827]/10 bg-[#FAF7F2] text-[#1F2937]">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 lg:py-16">
        <div className="grid gap-10 rounded-[2rem] border border-[#111827]/8 bg-white p-8 shadow-[0_24px_70px_-40px_rgba(17,24,39,0.12)] lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:p-10">
          <div className="space-y-4">
            <p className="section-label">RMS Ladies Boutique</p>
            <h3 className="text-2xl font-bold tracking-[-0.03em] text-[#1F2937] md:text-3xl">{siteTitle ?? "RMS LADIES BOUTIQUE"}</h3>
            <p className="max-w-xl text-sm leading-7 text-[#6B7280]">{tagline ?? "A discreet couture atelier crafting tailored womenswear with timeless elegance, premium fittings, and personalized service."}</p>
          </div>

          <div className="space-y-3 rounded-[1.5rem] border border-[#111827]/8 bg-[#FAF7F2] p-5">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#6B7280]">Contact</p>
            <ul className="space-y-2.5 text-xs leading-6 text-[#1F2937]">
              {phone ? <li className="flex items-center gap-2.5 rounded-2xl border border-[#111827]/8 bg-white px-3 py-2"><PhoneCall className="h-3.5 w-3.5 text-[#B8864A]" />{phone}</li> : null}
              {email ? <li className="flex items-center gap-2.5 rounded-2xl border border-[#111827]/8 bg-white px-3 py-2"><Mail className="h-3.5 w-3.5 text-[#B8864A]" />{email}</li> : null}
              <li className="flex items-center gap-2.5 rounded-2xl border border-[#111827]/8 bg-white px-3 py-2"><MapPin className="h-3.5 w-3.5 text-[#B8864A]" />Boutique appointments and design consultations</li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="section-label">Explore</p>
            <div className="space-y-3 text-sm font-semibold text-[#1F2937]">
              <Link href="/book" className="block rounded-[1rem] border border-[#111827]/8 bg-[#FAF7F2] px-4 py-3 transition hover:-translate-y-0.5 hover:border-[#B8864A]/40 hover:bg-white">Book a consultation</Link>
              <Link href="/catalog" className="block rounded-[1rem] border border-[#111827]/8 bg-[#FAF7F2] px-4 py-3 transition hover:-translate-y-0.5 hover:border-[#B8864A]/40 hover:bg-white">Browse the collection</Link>
              <a href="https://www.instagram.com/rmsladiesboutique" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-[1rem] border border-[#111827]/8 bg-[#FAF7F2] px-4 py-3 transition hover:-translate-y-0.5 hover:border-pink-300 hover:bg-white"><span className="flex items-center gap-3"><ArrowRight className="h-4 w-4 text-pink-600" /> Instagram</span><span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#6B7280]">Follow</span></a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-[1.25rem] border border-[#111827]/8 bg-white px-4 py-4 text-center text-[0.72rem] uppercase tracking-[0.28em] text-[#6B7280] md:flex-row md:text-left">
          <span>An exclusive bespoke fashion experience designed for exceptional women.</span>
          <span>RMS Ladies Boutique • Luxury tailoring and styling</span>
        </div>
      </div>
    </footer>
  );
}

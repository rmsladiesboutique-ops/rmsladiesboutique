import Link from "next/link";
import Image from "next/image";
import { getSettings } from "@/lib/services";
import { Sparkles, Star, Heart, Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

export async function Footer() {
  const settings = await getSettings();
  const siteTitle = settings?.shopName ?? "RMS Boutique";
  const footerText = settings?.homepageContent?.footerText ?? "Luxury tailoring and couture designs crafted with passion and precision for the modern woman.";
  const contactPhone = settings?.phoneNumber ?? "+971509715097";
  const contactEmail = settings?.email ?? "info@rmsboutique.com";
  const contactAddress = settings?.address ?? "123 Fashion Street, Dubai, UAE";

  return (
    <footer className="relative overflow-hidden bg-[#111827] text-white">
      {/* Decorative top gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="section-container pt-20 pb-10">
        {/* Main grid */}
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr] pb-16">
          {/* Brand column */}
          <div className="space-y-7">
            <Link href="/" className="inline-flex items-center gap-4">
              <Image
                src="/rms-logo.jpeg"
                alt={siteTitle}
                width={160}
                height={64}
                className="h-14 w-auto rounded-2xl border border-white/10 bg-white/5 p-1 object-contain"
              />
            </Link>
            <p className="max-w-sm text-body text-white/60 leading-relaxed">
              {footerText}
            </p>
            <div className="gold-line" />
            <div className="flex gap-3">
              {[
                { icon: Sparkles, label: "Instagram", href: "#" },
                { icon: Star, label: "Facebook", href: "#" },
                { icon: Heart, label: "X", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:scale-105 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.32em] text-[#D4AF37]">Explore</h3>
            <nav className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/catalog", label: "Design Catalog" },
                { href: "/book", label: "Book Appointment" },
                { href: "/dashboard", label: "Customer Dashboard" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-1 text-sm text-white/60 transition-all duration-300 hover:text-[#D4AF37]"
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.32em] text-[#D4AF37]">Services</h3>
            <nav className="space-y-3">
              {["Bridal Couture", "Occasion Wear", "Custom Tailoring", "Private Fittings"].map((item) => (
                <Link
                  key={item}
                  href="/catalog"
                  className="group flex items-center gap-1 text-sm text-white/60 transition-all duration-300 hover:text-[#D4AF37]"
                >
                  {item}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.32em] text-[#D4AF37]">Contact</h3>
            <div className="space-y-5">
              {[
                { icon: Phone, label: "Phone", value: contactPhone, href: `tel:${contactPhone}` },
                { icon: Mail, label: "Email", value: contactEmail, href: `mailto:${contactEmail}` },
                { icon: MapPin, label: "Address", value: contactAddress },
                { icon: Clock, label: "Hours", value: "Mon – Sat, 10am – 7pm" },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#D4AF37]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/40">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-white/80 transition hover:text-[#D4AF37]">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-white/80">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="luxury-divider mb-8" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-white/40">
            © {new Date().getFullYear()} {siteTitle}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/" className="text-small text-white/40 transition hover:text-[#D4AF37]">
              Privacy Policy
            </Link>
            <Link href="/" className="text-small text-white/40 transition hover:text-[#D4AF37]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";
import { getSettings } from "@/lib/services";
import { Sparkles, Star, Heart, Phone, Mail, MapPin, Clock } from "lucide-react";

export async function Footer() {
  const settings = await getSettings();
  const siteTitle = settings?.shopName ?? "RMS Boutique";
  const footerText = settings?.homepageContent?.footerText ?? "Luxury tailoring and couture designs.";
  const phoneNumber = settings?.phoneNumber ?? "8951432847";
  const emailAddress = settings?.contactEmail ?? "rmsladiesboutique@gmail.com";
  const address = "RMS Ladies Boutique";
  const addressLink = "https://maps.app.goo.gl/ouR5nVnGQCM6aPxK6?g_st=aw";
  const instagramLink = "https://www.instagram.com/rmsladiesboutique?igsh=M3gybDBzdmkyN2Y5";

  return (
    <footer className="border-t border-[#E5E7EB] bg-[#FAF7F2] pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr] pb-16 border-b border-[#E5E7EB]">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/rms-logo.jpeg"
                alt={siteTitle}
                width={160}
                height={64}
                priority
                className="h-16 w-auto rounded-3xl border border-[#E5E7EB] bg-white p-1 shadow-lg"
              />
            </Link>
            <p className="text-body text-[#6B7280] max-w-md leading-relaxed">
              {footerText}
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white text-[#111827] shadow-lg transition-all duration-300 hover:scale-[1.08] hover:border-[#B8864A]/30 hover:text-[#B8864A] hover:shadow-xl"
              >
                <Sparkles className="h-6 w-6" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white text-[#111827] shadow-lg transition-all duration-300 hover:scale-[1.08] hover:border-[#B8864A]/30 hover:text-[#B8864A] hover:shadow-xl"
              >
                <Star className="h-6 w-6" />
              </a>
              <a
                href="#"
                aria-label="X"
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white text-[#111827] shadow-lg transition-all duration-300 hover:scale-[1.08] hover:border-[#B8864A]/30 hover:text-[#B8864A] hover:shadow-xl"
              >
                <Heart className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.32em] text-[#111827]">Quick Links</h3>
            <nav className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/catalog", label: "Design Catalog" },
                { href: "/book", label: "Book Appointment" },
                { href: "/dashboard", label: "Customer Dashboard" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-body text-[#6B7280] transition-all duration-300 hover:text-[#B8864A]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.32em] text-[#111827]">Contact</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-[#E5E7EB] text-[#B8864A] shadow-lg">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6B7280]">Phone</p>
                  <a href={`tel:${phoneNumber}`} className="text-body text-[#111827] hover:text-[#B8864A] transition-all duration-300">
                    {phoneNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-[#E5E7EB] text-[#B8864A] shadow-lg">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6B7280]">Email</p>
                  <a href={`mailto:${emailAddress}`} className="text-body text-[#111827] hover:text-[#B8864A] transition-all duration-300">
                    {emailAddress}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-[#E5E7EB] text-[#B8864A] shadow-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6B7280]">Address</p>
                  <a href={addressLink} target="_blank" rel="noopener noreferrer" className="text-body text-[#111827] hover:text-[#B8864A] transition-all duration-300">
                    {address}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-[#E5E7EB] text-[#B8864A] shadow-lg">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6B7280]">Hours</p>
                  <p className="text-body text-[#111827]">Mon - Sat, 10am - 7pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-[#6B7280]">
            © {new Date().getFullYear()} {siteTitle}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/" className="text-small text-[#6B7280] hover:text-[#B8864A] transition-all duration-300">
              Privacy Policy
            </Link>
            <Link href="/" className="text-small text-[#6B7280] hover:text-[#B8864A] transition-all duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

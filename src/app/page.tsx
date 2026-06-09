import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Scissors, Sparkles, Star, Heart, CheckCircle } from "lucide-react";
import {
  LuxuryReveal,
  LuxuryParallax,
  FloatingGlow,
} from "@/components/shared/luxury-boutique";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSettings, getDesigns, getFeaturedDesigns } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, designs, featuredDesigns] = await Promise.all([
    getSettings(),
    getDesigns(),
    getFeaturedDesigns(),
  ]);

  const catalogPath = "/catalog";
  const bookingPath = "/book";
  const latestDesigns = designs.slice(0, 4);

  const testimonials = [
    { name: "Amara", quote: "The fit was flawless and the service made me feel truly cared for." },
    { name: "Nina", quote: "A luxury tailoring experience that felt effortless and modern." },
    { name: "Zara", quote: "Every detail was perfect. Will be back for all my special occasions!" },
  ];

  const processSteps = [
    { title: "Book Appointment", description: "Schedule your private consultation", icon: <Calendar className="h-6 w-6" /> },
    { title: "Measurements & Fit", description: "Personalized fitting for perfect silhouette", icon: <Scissors className="h-6 w-6" /> },
    { title: "Customization", description: "Choose fabrics, colors & details", icon: <Sparkles className="h-6 w-6" /> },
    { title: "Delivery", description: "Receive your luxury piece", icon: <CheckCircle className="h-6 w-6" /> },
  ];

  const storyFeatures = [
    { title: "Premium Fabrics", desc: "Carefully sourced materials", icon: Star },
    { title: "Private Fittings", desc: "One-on-one appointments", icon: Heart },
    { title: "Handcrafted Details", desc: "Meticulous attention to detail", icon: Sparkles },
    { title: "Custom Fit", desc: "Made just for you", icon: CheckCircle },
  ];

  return (
    <main className="relative overflow-hidden">
      <FloatingGlow />

      {/* Full-screen cinematic hero */}
      <LuxuryCinematicHero
        title="Luxury Tailoring for the"
        titleAccent="Modern Woman"
        description={
          settings?.homepageContent?.heroDescription ??
          "Discover a curated collection of bespoke designs, from bridal couture to everyday elegance, crafted with passion and precision."
        }
        bookingPath={bookingPath}
        catalogPath={catalogPath}
      />

      {/* Latest Designs */}
      <section className="section-padding relative bg-[#FAF7F2]">
        <LuxuryParallax />
        <div className="section-container relative">
          <LuxuryReveal className="mb-14">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-4">
                <p className="section-label">Latest designs</p>
                <h2 className="text-section-heading text-[#111827]">
                  New pieces for your wardrobe
                </h2>
                <div className="gold-line" />
              </div>
              <Link
                href={catalogPath}
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#B8864A] transition hover:text-[#9a6f3a]"
              >
                View All
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </LuxuryReveal>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {latestDesigns.map((design) => (
              <LuxuryReveal key={design.id} className="mt-0">
                <Link href={`/catalog/${design.id}`} className="product-card group block">
                  <div className="product-card-image">
                    <Image
                      src={design.imageUrl}
                      alt={design.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="space-y-3 p-7 text-[#111827]">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#6B7280]">{design.category}</p>
                    <h3 className="text-card-heading">{design.title}</h3>
                    <p className="text-small text-[#6B7280] line-clamp-2">{design.description}</p>
                    <div className="luxury-divider my-4" />
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-[#B8864A]">{formatCurrency(design.price)}</span>
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#111827] group-hover:text-[#B8864A] transition-colors">
                        View →
                      </span>
                    </div>
                  </CardContent>
                </Link>
              </LuxuryReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Boutique Story — bento layout */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <LuxuryReveal>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Text block */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-7">
                <p className="section-label">Our Story</p>
                <h2 className="text-section-heading text-[#111827]">
                  Crafting Excellence, One Piece at a Time
                </h2>
                <div className="gold-line" />
                <p className="text-body text-[#6B7280]">
                  With years of experience in couture tailoring, we bring together premium fabrics, meticulous craftsmanship,
                  and personalized design to create pieces that make you feel confident and elegant.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {storyFeatures.map((item) => (
                    <div
                      key={item.title}
                      className="group flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-[#FAF7F2] p-5 transition-all duration-300 hover:border-[#B8864A]/25 hover:shadow-[0_16px_48px_-16px_rgba(17,24,39,0.12)]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#111827] text-[#D4AF37] transition-transform group-hover:scale-105">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#111827]">{item.title}</h4>
                        <p className="mt-1 text-small text-[#6B7280]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bento image grid */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-5">
                <div className="relative col-span-1 row-span-2 aspect-[3/4] overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-24px_rgba(17,24,39,0.2)]">
                  <Image src="/images/bridal-wear.jpeg" alt="Bridal wear" fill className="object-cover transition-transform duration-700 hover:scale-105" priority />
                  <div className="absolute inset-0 image-overlay-bottom" />
                  <div className="absolute bottom-5 left-5">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">Bridal</p>
                  </div>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-24px_rgba(17,24,39,0.2)]">
                  <Image src="/images/occasional-wear.jpeg" alt="Occasion wear" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0 image-overlay-bottom" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">Occasion</p>
                  </div>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-24px_rgba(17,24,39,0.2)]">
                  <Image src="/images/simple-daily-wear.jpeg" alt="Daily wear" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0 image-overlay-bottom" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">Daily</p>
                  </div>
                </div>
              </div>
            </div>
          </LuxuryReveal>
        </div>
      </section>

      {/* Featured Designs */}
      {featuredDesigns.length > 0 && (
        <section className="section-padding bg-[#FAF7F2]">
          <div className="section-container">
            <LuxuryReveal className="mb-14">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-4">
                  <p className="section-label">Featured collection</p>
                  <h2 className="text-section-heading text-[#111827]">Our most loved designs</h2>
                  <div className="gold-line" />
                </div>
                <Link
                  href={catalogPath}
                  className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#B8864A] transition hover:text-[#9a6f3a]"
                >
                  Shop All
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </LuxuryReveal>

            <div className="grid gap-7 lg:grid-cols-3">
              {featuredDesigns.map((design, i) => (
                <LuxuryReveal key={design.id} className="mt-0">
                  <Link
                    href={`/catalog/${design.id}`}
                    className={`product-card group block ${i === 0 ? "lg:row-span-2" : ""}`}
                  >
                    <div className="product-card-image">
                      <Image
                        src={design.imageUrl}
                        alt={design.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        priority={i === 0}
                      />
                      <div className="absolute inset-0 image-overlay-bottom opacity-60" />
                      <div className="absolute left-6 top-6">
                        <Badge className="fashion-chip bg-white/90">Featured</Badge>
                      </div>
                    </div>
                    <CardContent className="space-y-4 p-8 text-[#111827]">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#6B7280]">{design.category}</p>
                      <h3 className="text-card-heading">{design.title}</h3>
                      <p className="text-small text-[#6B7280] line-clamp-3">{design.description}</p>
                    </CardContent>
                  </Link>
                </LuxuryReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <LuxuryReveal>
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <p className="section-label">The Experience</p>
              <h2 className="text-section-heading text-[#111827]">How it works</h2>
              <div className="gold-line mx-auto" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <LuxuryReveal key={index} className="mt-0">
                  <div className="luxury-card group relative overflow-hidden p-8">
                    <div className="absolute -right-4 -top-4 text-[5rem] font-bold leading-none text-[#FAF7F2] select-none">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="relative space-y-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#111827] text-[#D4AF37] shadow-lg transition-transform group-hover:scale-105">
                        {step.icon}
                      </div>
                      <h3 className="text-card-heading">{step.title}</h3>
                      <p className="text-small text-[#6B7280]">{step.description}</p>
                    </div>
                  </div>
                </LuxuryReveal>
              ))}
            </div>
          </LuxuryReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-[#FAF7F2]">
        <div className="section-container">
          <LuxuryReveal>
            <div className="rounded-[2rem] border border-[#B8864A]/10 bg-white p-10 sm:p-14 lg:p-16 shadow-[0_32px_80px_-32px_rgba(17,24,39,0.12)]">
              <div className="text-center space-y-4 mb-14">
                <p className="section-label">Testimonials</p>
                <h2 className="text-section-heading text-[#111827]">What our clients say</h2>
                <div className="gold-line mx-auto" />
              </div>
              <div className="grid gap-7 md:grid-cols-3">
                {testimonials.map((item, i) => (
                  <LuxuryReveal key={i} className="mt-0">
                    <div className="group rounded-2xl border border-[#E5E7EB] bg-[#FAF7F2] p-8 transition-all duration-300 hover:border-[#B8864A]/20 hover:shadow-[0_20px_60px_-20px_rgba(17,24,39,0.1)]">
                      <div className="flex gap-1 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>
                      <p className="text-body text-[#111827] leading-relaxed">"{item.quote}"</p>
                      <div className="luxury-divider my-6" />
                      <p className="text-small font-bold uppercase tracking-[0.28em] text-[#6B7280]">{item.name}</p>
                    </div>
                  </LuxuryReveal>
                ))}
              </div>
            </div>
          </LuxuryReveal>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-container pb-28 pt-8">
        <LuxuryReveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#111827] p-12 sm:p-16 lg:p-20 text-center shadow-[0_40px_100px_-40px_rgba(17,24,39,0.5)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.15),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(184,134,74,0.1),transparent_60%)]" />
            <div className="relative max-w-2xl mx-auto space-y-7">
              <p className="section-label text-[#D4AF37]">Ready for your perfect piece?</p>
              <h2 className="text-section-heading text-white">Create your dream outfit today</h2>
              <p className="text-body text-white/70">
                Book a private consultation and let us bring your vision to life.
              </p>
              <div className="pt-2">
                <Link href={bookingPath} aria-label="Book an appointment">
                  <Button className="btn-primary text-xs px-12 py-4">
                    Book Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </LuxuryReveal>
      </section>
    </main>
  );
}

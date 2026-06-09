import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Scissors, Sparkles, Star, Heart, CheckCircle } from "lucide-react";
import {
  LuxuryHeroSlider,
  LuxuryReveal,
  LuxuryParallax,
  FloatingGlow,
  LuxuryStats,
} from "@/components/shared/luxury-boutique";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSettings, getDesigns, getFeaturedDesigns } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";

export default async function Home() {
  const [settings, designs, featuredDesigns] = await Promise.all([
    getSettings(),
    getDesigns(),
    getFeaturedDesigns(),
  ]);

  const contactPhone = settings?.phoneNumber ?? "+971509715097";
  const catalogPath = "/catalog";
  const bookingPath = "/book";

  const latestDesigns = designs.slice(0, 4);

  const testimonials = [
    { name: "Amara", quote: "The fit was flawless and the service made me feel truly cared for." },
    { name: "Nina", quote: "A luxury tailoring experience that felt effortless and modern." },
    { name: "Zara", quote: "Every detail was perfect. Will be back for all my special occasions!" },
  ];

  const processSteps = [
    { title: "Book Appointment", description: "Schedule your private consultation", icon: <Calendar className="h-7 w-7" /> },
    { title: "Measurements & Fit", description: "Personalized fitting for perfect silhouette", icon: <Scissors className="h-7 w-7" /> },
    { title: "Customization", description: "Choose fabrics, colors & details", icon: <Sparkles className="h-7 w-7" /> },
    { title: "Delivery", description: "Receive your luxury piece", icon: <CheckCircle className="h-7 w-7" /> },
  ];

  return (
    <main className="relative overflow-hidden">
      <FloatingGlow />
      <LuxuryParallax />

      {/* Hero Section */}
      <section className="px-6 pt-32 sm:px-10 lg:px-16 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1.2fr] items-center">
            <LuxuryReveal className="space-y-8">
              <div className="inline-block">
                <Badge className="fashion-chip border-[#B8864A]/30 bg-white px-6 py-2.5 text-[0.7rem]">
                  New Arrivals 2025
                </Badge>
              </div>
              <h1 className="text-hero text-[#111827] leading-tight">
                Luxury Tailoring for the
                <span className="block text-[#B8864A] mt-2">Modern Woman</span>
              </h1>
              <p className="text-body max-w-xl text-[#6B7280] leading-relaxed">
                {settings?.homepageContent?.heroDescription ??
                  "Discover a curated collection of bespoke designs, from bridal couture to everyday elegance, crafted with passion and precision."}
              </p>
              <div className="flex flex-wrap gap-5 pt-4">
                <Link href={bookingPath} aria-label="Book an appointment">
                  <Button className="btn-primary text-xs px-10 py-4">
                    Book Appointment
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={catalogPath} aria-label="Explore designs">
                  <Button className="btn-ghost border-[#E5E7EB] text-xs px-10 py-4">
                    Explore Collection
                  </Button>
                </Link>
              </div>

              <div className="pt-6">
                <LuxuryStats />
              </div>
            </LuxuryReveal>

            <LuxuryReveal>
              <LuxuryHeroSlider />
            </LuxuryReveal>
          </div>
        </div>
      </section>

      {/* Latest Designs Section */}
      <section className="px-6 sm:px-10 lg:px-16 py-24">
        <div className="mx-auto max-w-7xl">
          <LuxuryReveal className="mb-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-3">
                <p className="section-label">Latest designs</p>
                <h2 className="text-section-heading text-[#111827]">
                  New pieces for your wardrobe
                </h2>
              </div>
              <Link href={catalogPath} className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#B8864A] transition hover:text-[#9a6f3a]">
                View All
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </LuxuryReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {latestDesigns.map((design) => (
              <LuxuryReveal key={design.id} className="mt-0">
                <Link
                  href={`/catalog/${design.id}`}
                  className="group overflow-hidden rounded-[2rem] border border-[#E5E7EB] bg-white shadow-[0_30px_70px_-40px_rgba(17,24,39,0.15)] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_40px_90px_-40px_rgba(17,24,39,0.25)]"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={design.imageUrl}
                      alt={design.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="space-y-4 p-8 text-[#111827]">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#6B7280]">{design.category}</p>
                    <h3 className="text-card-heading">{design.title}</h3>
                    <p className="text-small text-[#6B7280] line-clamp-2 leading-relaxed">{design.description}</p>
                    <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#E5E7EB] mt-4 pt-5">
                      <span className="text-xl font-bold text-[#B8864A]">{formatCurrency(design.price)}</span>
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#111827]">View</span>
                    </div>
                  </CardContent>
                </Link>
              </LuxuryReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Boutique Story Section */}
      <section className="px-6 sm:px-10 lg:px-16 py-24 bg-gradient-to-b from-[#FAF7F2] to-white">
        <div className="mx-auto max-w-7xl">
          <LuxuryReveal>
            <div className="rounded-[2.5rem] border border-[#E5E7EB] bg-white p-10 sm:p-14 lg:p-16 shadow-[0_40px_90px_-40px_rgba(17,24,39,0.15)]">
              <div className="flex flex-col gap-16 lg:grid lg:grid-cols-[1fr_1.2fr] items-center">
                <div className="space-y-8">
                  <p className="section-label">Our Story</p>
                  <h2 className="text-section-heading text-[#111827] leading-tight">
                    Crafting Excellence, One Piece at a Time
                  </h2>
                  <p className="text-body text-[#6B7280] leading-relaxed">
                    With years of experience in couture tailoring, we bring together premium fabrics, meticulous craftsmanship,
                    and personalized design to create pieces that make you feel confident and elegant.
                  </p>

                  <div className="grid gap-6 pt-4">
                    {[
                      { title: "Premium Fabrics", desc: "Carefully sourced materials", icon: Star },
                      { title: "Private Fittings", desc: "One-on-one appointments", icon: Heart },
                      { title: "Handcrafted Details", desc: "Meticulous attention to detail", icon: Sparkles },
                      { title: "Custom Fit", desc: "Made just for you", icon: CheckCircle },
                    ].map((item, index) => (
                      <div key={item.title} className="flex items-center gap-6 rounded-[2rem] border border-[#E5E7EB] bg-[#FAF7F2] p-7 transition-all duration-300 hover:border-[#B8864A]/20 hover:shadow-[0_20px_60px_-20px_rgba(17,24,39,0.1)]">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#111827] text-[#B8864A] shadow-lg">
                          <item.icon className="h-8 w-8" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-[#111827] mb-1">{item.title}</h4>
                          <p className="text-small text-[#6B7280]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 grid-cols-2">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-2xl">
                    <Image
                      src="/images/bridal-wear.jpeg"
                      alt="Bridal wear"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="space-y-6">
                    <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-2xl">
                      <Image
                        src="/images/occasional-wear.jpeg"
                        alt="Occasion wear"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-2xl">
                      <Image
                        src="/images/simple-daily-wear.jpeg"
                        alt="Daily wear"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LuxuryReveal>
        </div>
      </section>

      {/* Featured Designs Section */}
      {featuredDesigns.length > 0 && (
        <section className="px-6 sm:px-10 lg:px-16 py-24">
          <div className="mx-auto max-w-7xl">
            <LuxuryReveal className="mb-12">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-3">
                  <p className="section-label">Featured collection</p>
                  <h2 className="text-section-heading text-[#111827]">Our most loved designs</h2>
                </div>
                <Link href={catalogPath} className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#B8864A] transition hover:text-[#9a6f3a]">
                  Shop All
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </LuxuryReveal>

            <div className="grid gap-8 lg:grid-cols-3">
              {featuredDesigns.map((design) => (
                <LuxuryReveal key={design.id} className="mt-0">
                  <Link href={`/catalog/${design.id}`} className="group overflow-hidden rounded-[2.5rem] border border-[#E5E7EB] bg-white shadow-[0_30px_70px_-40px_rgba(17,24,39,0.15)] transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_40px_100px_-40px_rgba(17,24,39,0.3)]">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={design.imageUrl}
                        alt={design.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-108"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        priority
                      />
                      <div className="absolute inset-0 image-overlay-bottom" />
                      <div className="absolute left-8 top-8">
                        <Badge className="fashion-chip bg-white/95 backdrop-blur-md">Featured</Badge>
                      </div>
                    </div>
                    <CardContent className="space-y-5 p-10 text-[#111827]">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#6B7280]">{design.category}</p>
                      <h3 className="text-card-heading">{design.title}</h3>
                      <p className="text-small text-[#6B7280] line-clamp-3 leading-relaxed">{design.description}</p>
                    </CardContent>
                  </Link>
                </LuxuryReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="px-6 sm:px-10 lg:px-16 py-24 bg-gradient-to-b from-white to-[#FAF7F2]">
        <div className="mx-auto max-w-7xl">
          <LuxuryReveal>
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <p className="section-label">The Experience</p>
              <h2 className="text-section-heading text-[#111827]">
                How it works
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <LuxuryReveal key={index} className="mt-0">
                  <Card className="luxury-card p-1 border-0">
                    <CardContent className="p-8 space-y-6">
                      <div className="flex items-center gap-5">
                        <div className="h-16 w-16 rounded-full bg-[#111827] flex items-center justify-center text-white font-bold text-xl shadow-xl">
                          {index + 1}
                        </div>
                        <div className="text-[#B8864A]">
                          {step.icon}
                        </div>
                      </div>
                      <h3 className="text-card-heading">{step.title}</h3>
                      <p className="text-small text-[#6B7280] leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </LuxuryReveal>
              ))}
            </div>
          </LuxuryReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 sm:px-10 lg:px-16 py-24">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-[#B8864A]/10 bg-white p-10 sm:p-16 lg:p-20 shadow-[0_40px_100px_-40px_rgba(17,24,39,0.15)]">
          <LuxuryReveal>
            <div className="text-center space-y-4 mb-16">
              <p className="section-label">Testimonials</p>
              <h2 className="text-section-heading text-[#111827]">
                What our clients say
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((item, i) => (
                <LuxuryReveal key={i} className="mt-0">
                  <div className="rounded-[2rem] border border-[#E5E7EB] bg-[#FAF7F2] p-9 transition-all duration-300 hover:border-[#B8864A]/20 hover:shadow-[0_20px_60px_-20px_rgba(17,24,39,0.1)]">
                    <div className="flex gap-1.5 mb-8">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-6 w-6 fill-[#B8864A] text-[#B8864A]" />
                      ))}
                    </div>
                    <p className="text-body text-[#111827] leading-relaxed">“{item.quote}”</p>
                    <p className="mt-8 text-small font-bold uppercase tracking-[0.32em] text-[#6B7280]">{item.name}</p>
                  </div>
                </LuxuryReveal>
              ))}
            </div>
          </LuxuryReveal>
        </div>
      </section>

      {/* Luxury CTA Banner */}
      <section className="px-6 sm:px-10 lg:px-16 pb-32 pt-12">
        <div className="mx-auto max-w-7xl">
          <LuxuryReveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#B8864A] via-[#a57743] to-[#9a6f3a] p-12 sm:p-16 lg:p-20 text-center shadow-[0_40px_100px_-40px_rgba(184,134,74,0.5)]">
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_top,white,transparent_60%)]" />
              <div className="relative max-w-3xl mx-auto space-y-8">
                <p className="section-label text-white/90">Ready for your perfect piece?</p>
                <h2 className="text-section-heading text-white">Create your dream outfit today</h2>
                <p className="text-body text-white/90 leading-relaxed">
                  Book a private consultation and let us bring your vision to life.
                </p>
                <div className="pt-4">
                  <Link href={bookingPath} aria-label="Book an appointment">
                    <Button className="bg-white text-[#B8864A] hover:bg-white/90 text-xs px-12 py-4 rounded-full font-bold uppercase tracking-[0.28em] shadow-[0_24px_50px_-20px_rgba(17,24,39,0.3)] transition-all duration-300 hover:scale-[1.03]">
                      Book Now
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </LuxuryReveal>
        </div>
      </section>
    </main>
  );
}

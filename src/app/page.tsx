import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Scissors, Sparkles, Star, Heart, MapPin, CheckCircle } from "lucide-react";
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
  const bridalDesigns = designs.filter((d) => d.category === "bridal").slice(0, 2);
  const occasionDesigns = designs.filter((d) => d.category === "occasion").slice(0, 2);

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
      <section className="px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-center">
            <LuxuryReveal className="space-y-6">
              <Badge className="fashion-chip">New Arrivals 2025</Badge>
              <h1 className="hero-heading text-[#111827]">
                Luxury Tailoring for the
                <span className="block text-[#B8864A]">Modern Woman</span>
              </h1>
              <p className="max-w-lg text-base leading-8 text-[#6B7280]">
                {settings?.homepageContent?.heroDescription ??
                  "Discover a curated collection of bespoke designs, from bridal couture to everyday elegance, crafted with passion and precision."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={bookingPath} aria-label="Book an appointment">
                  <Button
                    size="lg"
                    className="rounded-full bg-[#111827] px-8 text-white hover:bg-[#1F2937] transition-all"
                  >
                    Book Appointment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={catalogPath} aria-label="Explore designs">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-[#B8864A] text-[#9a6f3a] hover:bg-[#FAF7F2] hover:text-[#9a6f3a]"
                  >
                    Explore Collection
                  </Button>
                </Link>
              </div>

              <LuxuryStats />
            </LuxuryReveal>

            <LuxuryReveal>
              <LuxuryHeroSlider />
            </LuxuryReveal>
          </div>
        </div>
      </section>

      {/* New Arrivals & Bridal/Occasion Section */}
      <section className="mt-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <LuxuryReveal className="mt-14">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-label text-[#6B7280]">Latest designs</p>
                <h2 className="section-heading mt-2 text-[#111827]">
                  New pieces for your wardrobe
                </h2>
              </div>
              <Link href={catalogPath} className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#9a6f3a] transition hover:text-[#B8864A]">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </LuxuryReveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestDesigns.map((design) => (
              <LuxuryReveal key={design.id}>
                <Link
                  href={`/catalog/${design.id}`}
                  className="group overflow-hidden rounded-[2rem] border border-[#E5E7EB] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_24px_70px_-40px_rgba(17,24,39,0.18)]"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={design.imageUrl}
                      alt={design.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <CardContent className="space-y-3 p-5 text-[#111827]">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6B7280]">{design.category}</p>
                    <h3 className="card-title">{design.title}</h3>
                    <p className="text-sm leading-6 text-[#6B7280] line-clamp-2">{design.description}</p>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-lg font-semibold text-[#B8864A]">{formatCurrency(design.price)}</span>
                      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#111827]">View</span>
                    </div>
                  </CardContent>
                </Link>
              </LuxuryReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Boutique Story / Why Choose Us */}
      <section className="mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <LuxuryReveal>
            <div className="rounded-[2.5rem] border border-[#E5E7EB] bg-[#FAF7F2] p-8 sm:p-10">
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[0.9fr_1.1fr] items-center">
                <div className="space-y-4">
                  <p className="section-label text-[#9a6f3a]">Our Story</p>
                  <h2 className="section-heading text-[#111827]">
                    Crafting Excellence, One Piece at a Time
                  </h2>
                  <p className="text-base leading-8 text-[#6B7280]">
                    With years of experience in couture tailoring, we bring together premium fabrics, meticulous craftsmanship,
                    and personalized design to create pieces that make you feel confident and elegant.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                      { title: "Premium Fabrics", desc: "Carefully sourced materials", icon: Star },
                      { title: "Private Fittings", desc: "One-on-one appointments", icon: Heart },
                      { title: "Handcrafted Details", desc: "Meticulous attention to detail", icon: Sparkles },
                      { title: "Custom Fit", desc: "Made just for you", icon: CheckCircle },
                    ].map((item) => (
                      <div key={item.title} className="rounded-[1.75rem] bg-white p-5 border border-[#E5E7EB]">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF7F2] text-[#B8864A]">
                          <item.icon className="h-6 w-6" />
                        </div>
                        <h4 className="mt-4 text-lg font-semibold text-[#111827]">{item.title}</h4>
                        <p className="mt-2 text-sm text-[#6B7280]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-2">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem]">
                    <Image
                      src="/images/bridal-wear.jpeg"
                      alt="Bridal wear"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-[2rem]">
                      <Image
                        src="/images/occasional-wear.jpeg"
                        alt="Occasion wear"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem]">
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

      {/* Featured Collections */}
      {featuredDesigns.length > 0 && (
        <section className="mt-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <LuxuryReveal>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="section-label text-[#6B7280]">Featured collection</p>
                  <h2 className="section-heading text-[#111827]">Our most loved designs</h2>
                </div>
                <Link href={catalogPath} className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#9a6f3a] transition hover:text-[#B8864A]">
                  Shop All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </LuxuryReveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {featuredDesigns.map((design) => (
                <LuxuryReveal key={design.id}>
                  <Link href={`/catalog/${design.id}`} className="group overflow-hidden rounded-[2.5rem] border border-[#E5E7EB] bg-white shadow-sm transition hover:-translate-y-2">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={design.imageUrl}
                        alt={design.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        priority
                      />
                      <div className="absolute inset-0 image-overlay-bottom" />
                      <div className="absolute left-6 top-6">
                        <Badge className="fashion-chip">Featured</Badge>
                      </div>
                    </div>
                    <CardContent className="space-y-3 p-6 text-[#111827]">
                      <p className="text-xs uppercase tracking-[0.28em] text-[#6B7280]">{design.category}</p>
                      <h3 className="card-title">{design.title}</h3>
                      <p className="text-sm leading-7 text-[#6B7280] line-clamp-3">{design.description}</p>
                    </CardContent>
                  </Link>
                </LuxuryReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <LuxuryReveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="section-label text-[#6B7280]">The Experience</p>
              <h2 className="section-heading text-[#111827] mt-3">
                How it works
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <LuxuryReveal key={index} className="mt-0">
                  <Card className="rounded-[2rem] border border-[#E5E7EB] bg-white">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-[#111827] flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="text-[#B8864A]">
                          {step.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold font-display text-[#111827]">{step.title}</h3>
                      <p className="text-sm text-[#6B7280]">{step.description}</p>
                    </CardContent>
                  </Card>
                </LuxuryReveal>
              ))}
            </div>
          </LuxuryReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-[#E5E7EB] bg-[#111827] p-8 text-white sm:p-10">
          <LuxuryReveal>
            <div className="text-center">
              <p className="section-label text-white/70">Testimonials</p>
              <h2 className="section-heading text-white mt-3">
                What our clients say
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((item, i) => (
                <LuxuryReveal key={i} className="mt-0">
                  <div className="rounded-[2rem] border border-white/15 bg-white/5 p-6">
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-[#B8864A] text-[#B8864A]" />
                      ))}
                    </div>
                    <p className="text-base leading-7 text-white/80">“{item.quote}”</p>
                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-white">{item.name}</p>
                  </div>
                </LuxuryReveal>
              ))}
            </div>
          </LuxuryReveal>
        </div>
      </section>

      {/* Luxury CTA Banner */}
      <section className="mt-20 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-7xl">
          <LuxuryReveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#B8864A] to-[#9a6f3a] p-10 sm:p-12 text-center">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_white,_transparent_50%)]"></div>
              <div className="relative max-w-2xl mx-auto space-y-6">
                <p className="section-label text-white/80">Ready for your perfect piece?</p>
                <h2 className="section-heading text-white">Create your dream outfit today</h2>
                <p className="text-lg text-white/90">
                  Book a private consultation and let us bring your vision to life.
                </p>
                <Link href={bookingPath} aria-label="Book an appointment">
                  <Button
                    size="lg"
                    className="rounded-full bg-white text-[#111827] hover:bg-[#f8fafc] px-10"
                  >
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </LuxuryReveal>
        </div>
      </section>
    </main>
  );
}

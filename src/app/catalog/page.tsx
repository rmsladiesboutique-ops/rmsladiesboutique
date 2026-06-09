import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { LuxuryReveal } from "@/components/shared/luxury-boutique";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDesigns } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  const designs = await getDesigns();
  const latestDesigns = designs.slice(0, 4);
  const hasDesigns = designs.length > 0;

  const bridalWear = designs.filter((d) => d.category === "Bridal Wear");
  const occasionWear = designs.filter((d) => d.category === "Occasion Wear");
  const signaturePieces = designs.filter((d) => d.category === "Signature Piece");

  const heroImage = "/images/bridal-wear.jpeg";

  const productCardClass = "product-card group block";

  return (
    <main className="bg-[#FAF7F2]">
      {/* Catalog Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image src={heroImage} alt="Editorial fashion collection" fill className="object-cover" priority sizes="100vw" />
          <div className="image-overlay-hero" />
        </div>
        <div className="relative z-10 section-container pb-16 pt-32">
          <LuxuryReveal>
            <span className="fashion-chip border-white/20 bg-white/10 text-[#D4AF37] backdrop-blur-md">
              <Sparkles className="mr-2 inline h-4 w-4" />
              Full Collection
            </span>
            <p className="section-label mt-6 text-[#D4AF37]">Discover Our Designs</p>
            <h1 className="text-section-heading mt-4 max-w-2xl text-white">
              Explore our curated collection of luxury pieces, from bridal couture to everyday elegance.
            </h1>
            <div className="gold-line mt-6 bg-gradient-to-r from-[#D4AF37] to-[#B8864A]" />
          </LuxuryReveal>
        </div>
      </section>

      {/* Latest Designs */}
      <section className="section-padding pt-16">
        <div className="section-container">
          <LuxuryReveal className="mb-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-3">
                <p className="section-label">New arrivals</p>
                <h2 className="text-section-heading text-[#111827]">Latest additions to our collection</h2>
              </div>
            </div>
          </LuxuryReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {latestDesigns.map((design) => (
              <LuxuryReveal key={design.id} className="mt-0">
                <Link
                  href={`/catalog/${design.id}`}
                  className={productCardClass}
                >
                  <div className="product-card-image">
                    <Image
                      src={design.imageUrl}
                      alt={design.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority
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

      {/* Bridal Wear */}
      {bridalWear.length > 0 && (
        <section className="section-padding pt-0">
          <div className="section-container">
            <LuxuryReveal className="mb-12">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-3">
                  <p className="section-label">Bridal Wear</p>
                  <h2 className="text-section-heading text-[#111827]">Elegant designs for your special day</h2>
                </div>
              </div>
            </LuxuryReveal>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {bridalWear.map((design) => (
                <LuxuryReveal key={design.id} className="mt-0">
                  <Link
                    href={`/catalog/${design.id}`}
                    className={productCardClass}
                >
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
      )}

      {/* Occasion Wear */}
      {occasionWear.length > 0 && (
        <section className="section-padding pt-0">
          <div className="section-container">
            <LuxuryReveal className="mb-12">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-3">
                  <p className="section-label">Occasion Wear</p>
                  <h2 className="text-section-heading text-[#111827]">Elegant pieces for every occasion</h2>
                </div>
              </div>
            </LuxuryReveal>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {occasionWear.map((design) => (
                <LuxuryReveal key={design.id} className="mt-0">
                  <Link
                    href={`/catalog/${design.id}`}
                    className={productCardClass}
                >
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
      )}

      {/* Signature Pieces */}
      {signaturePieces.length > 0 && (
        <section className="section-padding pt-0">
          <div className="section-container">
            <LuxuryReveal className="mb-12">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-3">
                  <p className="section-label">Signature Pieces</p>
                  <h2 className="text-section-heading text-[#111827]">Our most exclusive designs</h2>
                </div>
              </div>
            </LuxuryReveal>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {signaturePieces.map((design) => (
                <LuxuryReveal key={design.id} className="mt-0">
                  <Link
                    href={`/catalog/${design.id}`}
                    className={productCardClass}
                >
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
      )}

      {/* Full Collection Grid */}
      {hasDesigns && (
        <section className="section-padding pt-0">
          <div className="section-container">
            <LuxuryReveal className="mb-12">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-3">
                  <p className="section-label">Full collection</p>
                  <h2 className="text-section-heading text-[#111827]">All our luxury designs</h2>
                </div>
              </div>
            </LuxuryReveal>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {designs.map((design) => (
                <LuxuryReveal key={design.id} className="mt-0">
                  <Link
                    href={`/catalog/${design.id}`}
                    className={productCardClass}
                >
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
      )}

      {/* Bottom CTA */}
      {hasDesigns && (
        <section className="section-container pb-28 pt-8">
          <div>
            <LuxuryReveal className="mt-0">
              <div className="rounded-[2.5rem] border border-[#B8864A]/10 bg-[#FAF7F2] p-10 sm:p-16 lg:p-20 shadow-[0_40px_100px_-40px_rgba(17,24,39,0.15)]">
                <div className="grid gap-12 lg:grid-cols-[1.1fr_1.2fr] items-center">
                  <div className="space-y-8">
                    <p className="section-label">The boutique edit</p>
                    <h2 className="text-section-heading text-[#111827]">More than a catalog — a personal fashion story.</h2>
                    <p className="text-body text-[#6B7280] leading-relaxed">
                      Each design is selected with thoughtful proportions, premium finishes, and a sense of occasion. Book your consultation and let us tailor the collection to your needs.
                    </p>
                    <div className="pt-4">
                      <Link href="/book" aria-label="Book appointment">
                        <Button className="btn-primary text-xs px-10 py-4">
                          Book Appointment
                          <ArrowRight className="ml-3 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {latestDesigns.slice(0, 4).map((design) => (
                      <div key={design.id} className="rounded-[2rem] overflow-hidden border border-[#E5E7EB] bg-white p-5 transition-all duration-300 hover:border-[#B8864A]/20 hover:shadow-[0_20px_60px_-20px_rgba(17,24,39,0.1)]">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem]">
                          <Image src={design.imageUrl} alt={design.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" loading="lazy" />
                        </div>
                        <div className="mt-6 space-y-3">
                          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#6B7280]">{design.category}</p>
                          <h3 className="text-lg font-bold text-[#111827]">{design.title}</h3>
                          <p className="text-small text-[#B8864A] font-bold">{formatCurrency(design.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </LuxuryReveal>
          </div>
        </section>
      )}
    </main>
  );
}

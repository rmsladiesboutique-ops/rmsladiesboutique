import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getDesignById, getFeaturedDesigns } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { designId: string } }): Promise<Metadata> {
  const design = await getDesignById(params.designId);
  if (!design) {
    return { title: "Design not found | RMS LADIES BOUTIQUE" };
  }

  return {
    title: `${design.title} | RMS LADIES BOUTIQUE`,
    description: design.description,
  };
}

export default async function DesignDetailPage({ params }: { params: { designId: string } }) {
  const design = await getDesignById(params.designId);
  if (!design) return notFound();

  const relatedDesigns = (await getFeaturedDesigns(4)).filter((item) => item.id !== design.id);

  return (
    <main className="bg-[#FAF7F2] text-[#1F2937]">
      {/* Split-screen hero */}
      <section className="relative min-h-[90vh] pt-24">
        <div className="section-container grid gap-10 lg:grid-cols-2 lg:gap-16 items-center py-12 lg:py-20">
          {/* Content */}
          <div className="order-2 lg:order-1 space-y-7">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="fashion-chip">{design.category}</Badge>
              {design.available ? (
                <span className="rounded-full border border-emerald-300/30 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                  Available
                </span>
              ) : (
                <span className="rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#6B7280]">
                  Unavailable
                </span>
              )}
            </div>
            <h1 className="text-hero text-[#111827]">{design.title}</h1>
            <div className="gold-line" />
            <p className="text-body text-[#6B7280]">{design.description}</p>
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <span className="text-3xl font-bold text-[#B8864A]">{formatCurrency(design.price)}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.26em] text-[#6B7280]">
                Luxury tailoring by appointment
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B8864A]">Design details</p>
                <p className="mt-3 text-small text-[#6B7280]">
                  Crafted for confidence and elegance, this piece balances modern tailoring with timeless luxury.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B8864A]">Styled for</p>
                <p className="mt-3 text-small text-[#6B7280]">
                  Private appointments, curated gatherings, and refined wardrobe capsules.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/book" className="btn-primary text-xs px-8 py-3.5">
                Book a consultation
              </Link>
              <Link href="/catalog" className="btn-secondary text-xs px-8 py-3.5">
                Back to catalog
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_40px_100px_-40px_rgba(17,24,39,0.25)]">
              <div className="relative aspect-[3/4] w-full">
                <Image src={design.imageUrl} alt={design.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                <div className="absolute inset-0 image-overlay-bottom opacity-50" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">Made with intention</p>
                  <p className="mt-2 text-xl font-bold text-white drop-shadow-lg">
                    A statement piece for moments that matter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="section-padding border-t border-[#E5E7EB] bg-white">
        <div className="section-container grid gap-12 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <p className="section-label">Craftsmanship</p>
            <h2 className="text-section-heading text-[#111827]">A signature experience in every detail.</h2>
            <div className="gold-line" />
            <p className="text-body text-[#6B7280]">
              From the first measurement to the final fitting, the atelier brings together premium fabrics, exacting hand finishes, and thoughtful design to ensure every piece looks as exquisite as it feels.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { icon: Star, title: "Precision tailoring", description: "Seams and silhouettes refined for flawless movement." },
              { icon: Sparkles, title: "Luxury materials", description: "Silk, satin, and premium textures sourced for their drape and feel." },
              { icon: MapPin, title: "Private consultation", description: "A discreet studio experience tailored to your schedule." },
            ].map((item) => (
              <Card key={item.title} className="luxury-card border-0 p-0">
                <CardContent className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111827] text-[#D4AF37]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-card-heading">{item.title}</h3>
                  <p className="text-small text-[#6B7280]">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedDesigns.length > 0 ? (
        <section className="section-padding bg-[#FAF7F2]">
          <div className="section-container">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
              <div className="space-y-3">
                <p className="section-label">Related collection</p>
                <h2 className="text-section-heading text-[#111827]">More atelier favorites</h2>
              </div>
              <Link
                href="/catalog"
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#B8864A] transition hover:text-[#9a6f3a]"
              >
                Back to catalog
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3">
              {relatedDesigns.map((item) => (
                <Link key={item.id} href={`/catalog/${item.id}`} className="product-card group block">
                  <div className="product-card-image">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="space-y-3 text-[#111827]">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#6B7280]">{item.category}</p>
                    <h3 className="text-card-heading">{item.title}</h3>
                    <p className="text-small text-[#6B7280] line-clamp-3">{item.description}</p>
                  </CardContent>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

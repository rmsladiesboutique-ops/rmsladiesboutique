import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <main className="bg-[#fbf6f0] text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,248,238,0.92),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(171,137,97,0.12),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div className="space-y-6 rounded-[2.5rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_90px_-40px_rgba(15,12,10,0.18)] backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/95 sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="fashion-chip">{design.category}</Badge>
              {design.available ? <span className="rounded-full border border-emerald-300/20 bg-emerald-50 px-3 py-1 text-xs uppercase tracking-[0.28em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-100">Available</span> : <span className="rounded-full border border-slate-400/20 bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">Unavailable</span>}
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white sm:text-6xl">{design.title}</h1>
            <p className="max-w-3xl text-xl leading-9 text-slate-700 dark:text-slate-300">{design.description}</p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <span className="text-3xl font-semibold text-amber-700 dark:text-amber-300">{formatCurrency(design.price)}</span>
              <span className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Luxury tailoring by appointment</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6 dark:border-white/10 dark:bg-slate-900/85">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Design details</p>
                <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">Crafted for confidence and elegance, this piece balances modern tailoring with timeless luxury.</p>
              </div>
              <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6 dark:border-white/10 dark:bg-slate-900/85">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Styled for</p>
                <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">Private appointments, curated gatherings, and refined wardrobe capsules.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/book" className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-slate-800">
                Book a consultation
              </Link>
              <Link href="/catalog" className="inline-flex w-full items-center justify-center rounded-full border border-slate-900/10 bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950 transition hover:bg-slate-50">
                Back to catalog
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-slate-950/95 shadow-[0_60px_120px_-72px_rgba(15,12,10,0.35)] dark:border-white/10">
            <div className="relative h-80 w-full overflow-hidden rounded-[2.5rem] sm:h-[28rem] md:h-[34rem] lg:h-[42rem]">
              <Image src={design.imageUrl} alt={design.title} fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <p className="text-xs uppercase tracking-[0.28em] text-white/75">Made with intention</p>
                <p className="mt-3 text-xl font-semibold sm:text-2xl">A statement piece for moments that matter.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-[#fffdf8] px-4 py-24 sm:px-6 lg:px-8 dark:border-white/10 dark:bg-slate-950/95">
        <div className="mx-auto max-w-7xl grid gap-12 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Craftsmanship</p>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">A signature experience in every detail.</h2>
            <p className="max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
              From the first measurement to the final fitting, the atelier brings together premium fabrics, exacting hand finishes, and thoughtful design to ensure every piece looks as exquisite as it feels.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { icon: Star, title: "Precision tailoring", description: "Seams and silhouettes refined for flawless movement." },
              { icon: Sparkles, title: "Luxury materials", description: "Silk, satin, and premium textures sourced for their drape and feel." },
              { icon: MapPin, title: "Private consultation", description: "A discreet studio experience tailored to your schedule." },
            ].map((item) => (
              <Card key={item.title} className="rounded-[2rem] border border-slate-200/70 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900/90">
                <CardContent className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-950 text-amber-300 dark:bg-amber-500/10 dark:text-amber-300">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                  <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {relatedDesigns.length > 0 ? (
        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Related collection</p>
                <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">More atelier favorites.</h2>
              </div>
              <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-amber-700 transition hover:text-amber-600">
                Back to catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {relatedDesigns.map((item) => (
                <Link key={item.id} href={`/catalog/${item.id}`} className="group overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_28px_80px_-40px_rgba(15,12,10,0.25)] dark:border-white/10 dark:bg-slate-900/85">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
                  </div>
                  <CardContent className="space-y-3 p-6 text-slate-950 dark:text-white">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">{item.category}</p>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-sm leading-7 text-slate-700 dark:text-slate-300 line-clamp-3">{item.description}</p>
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

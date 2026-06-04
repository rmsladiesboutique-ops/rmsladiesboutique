import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDesigns, getNewArrivals, getSettings } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Design Catalog | RMS LADIES BOUTIQUE",
  description: "Explore our premium tailoring collections and curated design stories.",
};

export default async function CatalogPage() {
  const [designs, latestDesigns, settings] = await Promise.all([
    getDesigns(),
    getNewArrivals(10),
    getSettings(),
  ]);
  const homepage = settings?.homepageContent;
  const pageTitle = homepage?.catalogTitle ?? "Design Catalog";
  const pageDescription = homepage?.catalogDescription ?? "Explore statement styles, hand-selected fabrics, and runway-ready tailoring for your most memorable moments.";

  const byCategory = designs.reduce(
    (acc, design) => {
      const categoryKey = design.category?.toLowerCase().includes("bridal")
        ? "bridal"
        : design.category?.toLowerCase().includes("occasion") || design.category?.toLowerCase().includes("occasional")
        ? "occasion"
        : "signature";

      acc[categoryKey].push(design);
      return acc;
    },
    {
      occasion: [] as typeof designs,
      bridal: [] as typeof designs,
      signature: [] as typeof designs,
    },
  );

  const heroImage = designs.find((design) => design.isFeatured)?.imageUrl || latestDesigns[0]?.imageUrl || designs[0]?.imageUrl || "/images/bridal-wear.jpeg";
  const hasDesigns = designs.length > 0;

  return (
    <main className="relative overflow-hidden bg-[#fbf6f0] text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,248,238,0.92),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(171,137,97,0.14),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/95 p-10 shadow-[0_30px_90px_-40px_rgba(15,12,10,0.18)] dark:border-white/10 dark:bg-slate-950/95">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Collection</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white sm:text-6xl">{pageTitle}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-700 dark:text-slate-300">{pageDescription}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/85">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Featured edit</p>
                <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">A select edit of our latest atelier pieces.</p>
              </div>
              <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/85">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Curated service</p>
                <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Personal styling and private fittings by appointment.</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-slate-950/95 shadow-[0_60px_120px_-72px_rgba(15,12,10,0.35)] dark:border-white/10">
            <Image src={heroImage} alt="Editorial fashion collection" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <p className="text-xs uppercase tracking-[0.28em] text-white/75">Designed for quiet luxury</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight">The boutique’s signature story.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-16">
          {latestDesigns.length > 0 ? (
            <section className="rounded-[2.5rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_-40px_rgba(15,12,10,0.18)] dark:border-white/10 dark:bg-slate-950/95 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Latest designs</p>
                  <h2 className="mt-2 text-4xl font-semibold text-slate-950 dark:text-white">Newest boutique pieces at a glance.</h2>
                </div>
                <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-amber-700 transition hover:text-amber-600">
                  Browse full catalog <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {latestDesigns.map((design) => (
                  <Link
                    key={design.id}
                    href={`/catalog/${design.id}`}
                    className="group overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-950/95 text-white transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-32px_rgba(15,12,10,0.18)] dark:border-white/10"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={design.imageUrl}
                        alt={design.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="space-y-3 p-5 text-white">
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-200/80">{design.category}</p>
                      <h3 className="text-xl font-semibold">{design.title}</h3>
                      <p className="text-sm leading-6 text-slate-200/80 line-clamp-2">{design.description}</p>
                      <div className="flex items-center justify-between gap-4 text-amber-200">
                        <span className="font-semibold">{formatCurrency(design.price)}</span>
                        <span className="text-xs uppercase tracking-[0.28em]">View</span>
                      </div>
                    </CardContent>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {hasDesigns ? (
            Object.entries(byCategory).map(([key, items]) => {
              const label = key === "bridal" ? "Bridal Collection" : key === "occasion" ? "Occasion Wear" : "Signature Pieces";
              const description =
                key === "bridal"
                  ? "Soft silhouettes, elevated details, and refined dressmaking for meaningful moments."
                  : key === "occasion"
                  ? "Fashion-forward tailoring designed for gatherings, celebrations, and evenings out."
                  : "Daily luxury with polished shapes, premium textures, and effortless style.";

              return (
                <div key={key} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">{label}</p>
                    <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">{label}</h2>
                    <p className="max-w-2xl text-base leading-8 text-slate-700 dark:text-slate-300">{description}</p>
                  </div>
                  <div className="grid gap-6">
                    {items.slice(0, 3).map((design) => (
                      <Link key={design.id} href={`/catalog/${design.id}`} className="group overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_24px_70px_-40px_rgba(15,12,10,0.15)] transition hover:-translate-y-1 hover:shadow-[0_30px_90px_-45px_rgba(15,12,10,0.25)] dark:border-white/10 dark:bg-slate-950/95">
                        <div className="relative h-80 w-full overflow-hidden">
                          <Image src={design.imageUrl} alt={design.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        </div>
                        <CardContent className="space-y-3 p-7 text-slate-950 dark:text-white">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">{design.category}</p>
                              <h3 className="mt-3 text-2xl font-semibold">{design.title}</h3>
                            </div>
                            <Badge className={design.available ? "border-amber-300 bg-amber-500/10 text-amber-200" : "border-zinc-600 bg-zinc-700/50 text-zinc-200"}>
                              {design.available ? "Available" : "Unavailable"}
                            </Badge>
                          </div>
                          <p className="text-sm leading-7 text-slate-700 dark:text-slate-300 line-clamp-3">{design.description}</p>
                          <div className="flex items-center justify-between gap-4 text-amber-700 dark:text-amber-300">
                            <span className="text-lg font-semibold">{formatCurrency(design.price)}</span>
                            <span className="text-xs uppercase tracking-[0.32em]">View details</span>
                          </div>
                        </CardContent>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-[2rem] border border-amber-200/30 bg-amber-50/70 p-10 text-center text-amber-900 shadow-sm">
              <p className="text-xl font-semibold">No catalog pieces are available yet.</p>
              <p className="mt-3 text-sm">Add more designs through the admin panel to bring the boutique collection to life.</p>
            </div>
          )}

          {hasDesigns ? (
            <div className="rounded-[2.5rem] border border-slate-200/80 bg-slate-950/95 p-8 text-white shadow-[0_40px_100px_-64px_rgba(15,12,10,0.35)] dark:border-white/10 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="space-y-6">
                  <p className="text-xs uppercase tracking-[0.32em] text-amber-300/80">The boutique edit</p>
                  <h2 className="text-4xl font-semibold tracking-tight text-white">More than a catalog — a personal fashion story.</h2>
                  <p className="max-w-3xl text-base leading-8 text-slate-200/80">
                    Each design is selected with thoughtful proportions, premium finishes, and a sense of occasion. Book your consultation and let us tailor the collection to your needs.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {latestDesigns.slice(0, 4).map((design) => (
                    <div key={design.id} className="rounded-[2rem] overflow-hidden border border-white/10 bg-white/10 p-4">
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-slate-900">
                        <Image src={design.imageUrl} alt={design.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" loading="lazy" />
                      </div>
                      <div className="mt-4">
                        <p className="text-sm uppercase tracking-[0.28em] text-slate-300">{design.category}</p>
                        <h3 className="mt-2 text-lg font-semibold text-white">{design.title}</h3>
                        <p className="mt-2 text-sm text-slate-300">{formatCurrency(design.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

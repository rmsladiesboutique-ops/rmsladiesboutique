import type { Metadata } from "next";
import Image from "next/image";
import { getDesigns } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Design Catalog | Atelier Noir",
  description: "Browse premium tailoring styles and ready-to-customize design options.",
};

export default async function CatalogPage() {
  const designs = await getDesigns();

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="glass-panel-strong rounded-[2.5rem] p-6 md:p-8 lg:p-10">
        <p className="text-sm uppercase tracking-[0.28em] text-foreground/55">Collection</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Design Catalog</h1>
        <p className="mt-3 max-w-2xl text-foreground/70">Explore statement styles, hand-selected fabrics, and runway-ready tailoring for your most memorable moments.</p>

        <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {designs.map((design) => (
            <Card
              key={design.id}
              className="relative overflow-hidden border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_100px_-45px_rgba(209,155,84,0.5)]"
            >
              <div className="relative h-56 w-full overflow-hidden rounded-[1.75rem] border border-white/10">
                <Image src={design.imageUrl} alt={design.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
              <CardContent className="space-y-3 pt-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-semibold">{design.title}</h2>
                    <p className="text-sm text-foreground/55">{design.category}</p>
                  </div>
                  <Badge className={design.available ? "" : "border-zinc-600 bg-zinc-700/40 text-zinc-200"}>
                    {design.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
                <p className="text-sm text-foreground/75 leading-7">{design.description}</p>
                <p className="text-lg font-semibold text-amber-700 dark:text-amber-200">{formatCurrency(design.price)}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}

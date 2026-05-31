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
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">Design Catalog</h1>
      <p className="mt-3 max-w-2xl text-zinc-400">Explore custom and signature styles. Admins can control this catalog from the dashboard.</p>

      <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {designs.map((design) => (
          <Card key={design.id} className="overflow-hidden">
            <div className="relative h-56 w-full">
              <Image src={design.imageUrl} alt={design.title} fill className="object-cover" />
            </div>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-medium">{design.title}</h2>
                <Badge className={design.available ? "" : "border-zinc-600 bg-zinc-700/40 text-zinc-200"}>
                  {design.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <p className="text-sm text-zinc-500">{design.category}</p>
              <p className="text-sm text-zinc-300">{design.description}</p>
              <p className="text-amber-300">{formatCurrency(design.price)}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}

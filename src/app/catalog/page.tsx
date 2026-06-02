import type { Metadata } from "next";
import Image from "next/image";
import { getDesigns, getSettings } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Design Catalog | Atelier Noir",
  description: "Browse premium tailoring styles and ready-to-customize design options.",
};

export default async function CatalogPage() {
  const designs = await getDesigns();
  const settings = await getSettings();
  const homepage = settings?.homepageContent;
  const pageTitle = homepage?.catalogTitle ?? "Design Catalog";
  const pageDescription = homepage?.catalogDescription ?? "Explore statement styles, hand-selected fabrics, and runway-ready tailoring for your most memorable moments.";

  const bySection = {
    occasion: [] as typeof designs,
    bridal: [] as typeof designs,
    regular: [] as typeof designs,
  };

  for (const d of designs) {
    const c = (d.category || "").toLowerCase();
    if (c.includes("bridal")) bySection.bridal.push(d);
    else if (c.includes("occasion") || c.includes("occasional")) bySection.occasion.push(d);
    else bySection.regular.push(d);
  }

  const hasDesigns = designs.length > 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="glass-panel-strong rounded-[2.5rem] p-6 md:p-8 lg:p-10">
        <p className="text-sm uppercase tracking-[0.28em] text-foreground/55">Collection</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{pageTitle}</h1>
        <p className="mt-3 max-w-2xl text-foreground/70">{pageDescription}</p>

        {!hasDesigns ? (
          <div className="mt-10 rounded-[2rem] border border-amber-200/30 bg-amber-50/70 p-8 text-center text-sm text-amber-900 shadow-sm">
            No designs are available yet. Upload your latest catalog pieces from the admin panel to populate this page.
          </div>
        ) : (
            <section className="mt-10 space-y-10">
            {[
            { key: "occasion", title: "Occasion Wear", items: bySection.occasion },
            { key: "bridal", title: "Bridal Wear", items: bySection.bridal },
            { key: "regular", title: "Simple Regular Wear", items: bySection.regular },
          ].map((section) => (
            <div key={section.key}>
              <h3 className="text-2xl font-semibold">{section.title}</h3>
              {section.items.length === 0 ? (
                <p className="mt-2 text-sm text-foreground/60">No items in this section.</p>
              ) : (
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((design) => (
                    <Card
                      key={design.id}
                      className="relative overflow-hidden border-white/20 bg-slate-950/95 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_100px_-45px_rgba(209,155,84,0.5)]"
                    >
                      <div className="relative h-56 w-full overflow-hidden rounded-[1.75rem] border border-white/10">
                        <Image src={design.imageUrl} alt={design.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      </div>
                      <CardContent className="space-y-3 pt-4 text-white">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <h2 className="text-xl font-semibold text-white">{design.title}</h2>
                            <p className="text-sm text-amber-100/80">{design.category}</p>
                          </div>
                          <Badge className={design.available ? "border-amber-300 bg-amber-500/10 text-amber-200" : "border-zinc-600 bg-zinc-700/40 text-zinc-200"}>
                            {design.available ? "Available" : "Unavailable"}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/70 leading-7">{design.description}</p>
                        <p className="text-lg font-semibold text-amber-200">{formatCurrency(design.price)}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

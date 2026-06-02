import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSettings } from "@/lib/services";

export default async function Home() {
  const settings = await getSettings();
  const homepage = settings?.homepageContent;
  const heroBadge = homepage?.heroBadge ?? "Simple Regular Wear";
  const heroHeadline = homepage?.heroHeadline ?? "Tailoring made for women who value fit, comfort and style.";
  const heroDescription = homepage?.heroDescription ?? "Book a private womenswear appointment and explore a curated catalog of streamlined, premium designs.";
  const heroPrimaryCta = homepage?.heroPrimaryCta ?? "Book a fitting";
  const heroSecondaryCta = homepage?.heroSecondaryCta ?? "Explore the catalog";
  const heroStats = homepage?.heroStats?.length
    ? homepage.heroStats
    : [
        { value: "120+", label: "Appointments booked" },
        { value: "4.9/5", label: "Client satisfaction" },
        { value: "2-3 weeks", label: "Ready-to-wear timeline" },
      ];
  const deliveryNote = homepage?.deliveryNote ?? "Every piece is finished with care and delivered in a discreet, women-only studio experience.";
  const featureSectionTitle = homepage?.featureSectionTitle ?? "What we craft";
  const featureSectionSubtitle = homepage?.featureSectionSubtitle ?? "Personal fittings, refined tailoring, and effortless wardrobe pieces for modern women.";
  const featureCards = homepage?.featureCards?.length
    ? homepage.featureCards
    : [
        { title: "Precise fitting", description: "Every visit begins with measurements designed for movement and confidence." },
        { title: "Modern tailoring", description: "Clean silhouettes with thoughtful finishes for both daily wear and special occasions." },
      ];
  const featuredCollectionTitle = homepage?.featuredCollectionTitle ?? "Ready-to-wear favorites";
  const featuredCollectionItems = homepage?.featuredCollectionItems?.length
    ? homepage.featuredCollectionItems
    : [
        { title: "Essential blazer", description: "Effortless structure for polished everyday dressing." },
        { title: "Signature dress", description: "Soft volume and tailored details for easy confidence." },
        { title: "Classic shirt", description: "Versatile layering pieces cut for a flattering fit." },
      ];

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 md:px-8 md:pt-14">
      <section className="hero-grid hero-spotlight grid items-center gap-6 overflow-hidden rounded-[2.5rem] p-5 sm:p-6 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:p-10 lg:p-12">
        <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="fashion-chip">{heroBadge}</Badge>
            </div>

            <h1 className="max-w-xl text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl">
              {heroHeadline}
            </h1>

            <p className="max-w-xl text-base leading-8 text-foreground/72 sm:text-lg">
              {heroDescription}
            </p>

            <p className="max-w-xl text-base leading-8 text-foreground/72 sm:text-lg">
              Shape your clothes according to your desire with custom fittings, refined tailoring, and an expert touch at every stage.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-100/90 px-4 py-2 text-sm font-semibold text-amber-900 shadow-sm shadow-amber-200/20">
              <span className="rounded-full bg-amber-500 px-2 py-1 text-xs uppercase tracking-[0.2em] text-black">Free delivery</span>
              <span>within 5km range</span>
            </div>

            <p className="max-w-xl text-sm font-medium uppercase tracking-[0.24em] text-amber-700 sm:text-base">
              {deliveryNote}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/book" className="w-full sm:w-auto"><Button size="lg" className="w-full sm:w-auto">{heroPrimaryCta}</Button></Link>
              <Link href="/catalog" className="w-full sm:w-auto"><Button size="lg" variant="outline" className="w-full sm:w-auto">{heroSecondaryCta}</Button></Link>
            </div>

            <div className="grid gap-3 pt-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.value + stat.label} className="fashion-chip rounded-3xl p-4">
                  <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-sm text-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-gradient-to-br from-fuchsia-300/30 to-coral-200/0 blur-3xl" />
          <div className="absolute -right-10 bottom-10 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-200/20 to-coral-200/0 blur-3xl" />
          <div className="relative h-[340px] overflow-hidden rounded-[2rem] border border-white/20 shadow-[0_45px_120px_-60px_rgba(37,25,15,0.95)] sm:h-[440px]">
            <Image
              src={homepage?.heroImageUrl || "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1300&q=80"}
              alt={homepage?.heroHeadline ? homepage.heroHeadline : "Couture fashion scene"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-[1.75rem] border border-white/15 bg-black/40 p-5 text-white backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.26em] text-white/70">Studio edit</p>
              <p className="mt-2 text-lg font-semibold">Every look is crafted with couture detail and editorial energy.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
        <Card className="feature-highlight rounded-[2rem] p-8">
          <CardContent className="space-y-5">
            <p className="text-sm uppercase tracking-[0.28em] text-foreground/55">Signature services</p>
            <h2 className="text-4xl font-semibold">{featureSectionTitle}</h2>
            <p className="max-w-2xl text-base leading-8 text-foreground/72">
              {featureSectionSubtitle}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {featureCards.map((card) => (
                <div key={card.title} className="rounded-3xl border border-white/15 bg-white/10 p-4 text-sm text-foreground/75 shadow-[0_18px_50px_-40px_rgba(209,155,84,0.35)] backdrop-blur-sm">
                  <p className="font-semibold text-foreground">{card.title}</p>
                  <p className="mt-2">{card.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel rounded-[2rem] p-8">
          <CardContent className="space-y-5">
            <p className="text-sm uppercase tracking-[0.28em] text-foreground/55">{featuredCollectionTitle}</p>
            <div className="grid gap-4">
              {featuredCollectionItems.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-white/15 bg-black/5 p-4 shadow-[0_15px_45px_-35px_rgba(37,25,15,0.6)]">
                  <p className="text-lg font-semibold text-foreground">{item.title}</p>
                  <p className="mt-2 text-sm text-foreground/65">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3">
        {[
          ["Occasion Wear", "Personal pattern drafting and hand-finished construction for women."],
          ["Bridal Couture", "Ceremonial gowns and eveningwear designed to your shape and style."],
          ["Simple Regular Wear", "Precision fitting and silhouette refinement for a flawless feminine fit."],
        ].map(([title, desc]) => (
          <Card key={title} className="fashion-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_45px_120px_-60px_rgba(209,155,84,0.45)]">
            <CardContent>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm text-foreground/65">{desc}</p>
              <ArrowRight className="mt-6 h-4 w-4 text-amber-700 dark:text-amber-200" />
            </CardContent>
          </Card>
        ))}
      </section>

      {(homepage?.pricingTitle || homepage?.pricingItems?.length) || (homepage?.testimonialsTitle || homepage?.testimonialsItems?.length) ? (
        <section className="mt-14 grid gap-8 md:mt-16 md:grid-cols-2">
          {homepage?.pricingItems?.length ? (
            <Card className="fashion-card">
              <CardContent>
                {homepage.pricingTitle && <h3 className="text-2xl">{homepage.pricingTitle}</h3>}
                <div className="mt-4 space-y-3 text-sm text-foreground/72">
                  {homepage.pricingItems.map((item) => (
                    <p key={item.title}>{item.title}: {item.description}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}

          {homepage?.testimonialsItems?.length ? (
            <Card className="fashion-card">
              <CardContent>
                {homepage.testimonialsTitle && <h3 className="text-2xl">{homepage.testimonialsTitle}</h3>}
                <div className="mt-4 space-y-4 text-sm text-foreground/72">
                  {homepage.testimonialsItems.map((item) => (
                    <p key={item.title}>&quot;{item.description}&quot; - {item.title}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </section>
      ) : null}

      {homepage?.ctaTitle || homepage?.ctaDescription || homepage?.ctaButton ? (
        <section className="mt-14 overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-r from-amber-400/10 via-fuchsia-200/10 to-teal-200/10 p-8 text-center shadow-[0_40px_90px_-52px_rgba(209,155,84,0.8)] md:mt-16 md:p-10">
          {homepage.ctaTitle && <h3 className="text-3xl font-semibold">{homepage.ctaTitle}</h3>}
          {homepage.ctaDescription && <p className="mt-2 text-foreground/70">{homepage.ctaDescription}</p>}
          {homepage.ctaButton && (
            <div className="mt-6"><Link href="/book"><Button size="lg">{homepage.ctaButton}</Button></Link></div>
          )}
        </section>
      ) : null}
    </main>
  );
}

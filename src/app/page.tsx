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
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 md:px-8 md:pt-14">
      <section className="hero-grid hero-spotlight grid items-center gap-6 overflow-hidden rounded-[2.5rem] p-5 sm:p-6 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:p-10 lg:p-12">
        <div className="space-y-6">
          {homepage?.heroBadge || homepage?.heroHeadline || homepage?.heroDescription || homepage?.heroPrimaryCta || homepage?.heroSecondaryCta || homepage?.heroStats?.length || homepage?.deliveryNote || settings?.phoneNumber || settings?.contactEmail ? (
            <>
              {(homepage.heroBadge || homepage.heroHeadline) && (
                <div className="flex flex-wrap items-center gap-3">
                  {homepage.heroBadge && <Badge className="fashion-chip">{homepage.heroBadge}</Badge>}
                </div>
              )}

              {homepage.heroHeadline && (
                <h1 className="max-w-xl text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl">
                  {homepage.heroHeadline}
                </h1>
              )}

              {homepage.heroDescription && (
                <p className="max-w-xl text-base leading-8 text-foreground/72 sm:text-lg">
                  {homepage.heroDescription}
                </p>
              )}

              {homepage.deliveryNote && (
                <p className="max-w-xl text-sm font-medium uppercase tracking-[0.24em] text-amber-700 sm:text-base">
                  {homepage.deliveryNote}
                </p>
              )}

              {(settings?.phoneNumber || settings?.contactEmail) && (
                <div className="rounded-[2rem] border border-white/10 bg-black/5 p-5 text-sm text-foreground/80 shadow-sm sm:max-w-md">
                  <p className="font-semibold text-foreground">Contact us</p>
                  {settings?.phoneNumber && <p className="mt-2">Phone: {settings.phoneNumber}</p>}
                  {settings?.contactEmail && <p>Email: {settings.contactEmail}</p>}
                </div>
              )}

              {(homepage.heroPrimaryCta || homepage.heroSecondaryCta) && (
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {homepage.heroPrimaryCta && (
                    <Link href="/book" className="w-full sm:w-auto"><Button size="lg" className="w-full sm:w-auto">{homepage.heroPrimaryCta}</Button></Link>
                  )}
                  {homepage.heroSecondaryCta && (
                    <Link href="/catalog" className="w-full sm:w-auto"><Button size="lg" variant="outline" className="w-full sm:w-auto">{homepage.heroSecondaryCta}</Button></Link>
                  )}
                </div>
              )}

              {homepage.heroStats?.length ? (
                <div className="grid gap-3 pt-3 sm:grid-cols-3">
                  {homepage.heroStats.map((stat) => (
                    <div key={stat.value + stat.label} className="fashion-chip rounded-3xl p-4">
                      <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                      <p className="mt-1 text-sm text-foreground/60">{stat.label}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </>
          ) : null}
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

      {homepage?.featureSectionTitle || homepage?.featureSectionSubtitle || homepage?.featureCards?.length || homepage?.featuredCollectionTitle || homepage?.featuredCollectionItems?.length ? (
        <section className="mt-14 grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
          <Card className="feature-highlight rounded-[2rem] p-8">
            <CardContent className="space-y-5">
              <p className="text-sm uppercase tracking-[0.28em] text-foreground/55">Signature services</p>
              {homepage.featureSectionTitle && <h2 className="text-4xl font-semibold">{homepage.featureSectionTitle}</h2>}
              {homepage.featureSectionSubtitle && (
                <p className="max-w-2xl text-base leading-8 text-foreground/72">
                  {homepage.featureSectionSubtitle}
                </p>
              )}
              {homepage.featureCards?.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {homepage.featureCards.map((card) => (
                    <div key={card.title} className="rounded-3xl border border-white/15 bg-white/10 p-4 text-sm text-foreground/75 shadow-[0_18px_50px_-40px_rgba(209,155,84,0.35)] backdrop-blur-sm">
                      <p className="font-semibold text-foreground">{card.title}</p>
                      <p className="mt-2">{card.description}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>

          {homepage.featuredCollectionItems?.length ? (
            <Card className="glass-panel rounded-[2rem] p-8">
              <CardContent className="space-y-5">
                {homepage.featuredCollectionTitle && (
                  <p className="text-sm uppercase tracking-[0.28em] text-foreground/55">{homepage.featuredCollectionTitle}</p>
                )}
                <div className="grid gap-4">
                  {homepage.featuredCollectionItems.map((item) => (
                    <div key={item.title} className="rounded-[1.5rem] border border-white/15 bg-black/5 p-4 shadow-[0_15px_45px_-35px_rgba(37,25,15,0.6)]">
                      <p className="text-lg font-semibold text-foreground">{item.title}</p>
                      <p className="mt-2 text-sm text-foreground/65">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </section>
      ) : null}

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

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, MapPin, MessageSquare, PhoneCall } from "lucide-react";
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
          <div className="hidden md:block absolute -left-10 top-8 h-28 w-28 rounded-full bg-gradient-to-br from-fuchsia-300/30 to-coral-200/0 blur-3xl" />
          <div className="hidden md:block absolute -right-10 bottom-10 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-200/20 to-coral-200/0 blur-3xl" />
          <div className="relative h-[280px] overflow-hidden rounded-[2rem] border border-white/20 shadow-none md:shadow-[0_45px_120px_-60px_rgba(37,25,15,0.95)] sm:h-[340px] md:h-[440px]">
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

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Occasion Wear",
            desc: "Personal pattern drafting and hand-finished construction for women.",
            imageUrl: "https://images.unsplash.com/photo-1520975911890-39f0106742fe?auto=format&fit=crop&w=1200&q=80",
          },
          {
            title: "Bridal Couture",
            desc: "Ceremonial gowns and eveningwear designed to your shape and style.",
            imageUrl: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80",
          },
          {
            title: "Simple Daily Wear",
            desc: "Precision fitting and silhouette refinement for a flawless feminine fit.",
            imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
          },
        ].map((card) => (
          <Link key={card.title} href="/catalog" className="group block">
            <Card className="fashion-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_45px_120px_-60px_rgba(209,155,84,0.45)]">
              <CardContent className="grid gap-4 lg:grid-cols-[120px_1fr]">
                <div className="relative h-40 overflow-hidden rounded-[1.5rem] border border-white/15 bg-zinc-950 sm:h-44">
                  <Image src={card.imageUrl} alt={card.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">{card.title}</h2>
                    <p className="mt-3 text-sm text-foreground/65">{card.desc}</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <ArrowRight className="h-5 w-5 text-amber-700 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
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

      <section className="mt-14 rounded-[2rem] border border-black/10 bg-white/95 p-8 shadow-[0_24px_60px_-48px_rgba(15,12,10,0.35)] dark:border-white/10 dark:bg-zinc-950/90">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm uppercase tracking-[0.26em] text-foreground/55">Contact details</p>
          <h2 className="mt-3 text-4xl font-semibold text-foreground">Ready to book your fitting?</h2>
          <p className="mt-3 text-base leading-7 text-foreground/70">
            Reach out directly via phone, WhatsApp, location or Instagram for fast styling support and appointment help.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.75rem] border border-black/10 bg-slate-50 p-5 text-foreground shadow-sm transition hover:-translate-y-1 hover:shadow-[0_25px_60px_-40px_rgba(15,12,10,0.45)] dark:border-white/10 dark:bg-zinc-900 dark:text-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                <PhoneCall className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm font-semibold text-foreground">Call studio</p>
              <a href="tel:+918296028147" className="mt-3 block text-lg font-semibold text-slate-950 transition hover:text-amber-700 dark:text-white">
                8296028147
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-black/10 bg-slate-50 p-5 text-foreground shadow-sm transition hover:-translate-y-1 hover:shadow-[0_25px_60px_-40px_rgba(15,12,10,0.45)] dark:border-white/10 dark:bg-zinc-900 dark:text-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                <MessageSquare className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm font-semibold text-foreground">WhatsApp</p>
              <a
                href="https://wa.me/918296028147?text=Hey!%20I%20just%20visited%20your%20website%20and%20need%20more%20details."
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Message us
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-black/10 bg-slate-50 p-5 text-foreground shadow-sm transition hover:-translate-y-1 hover:shadow-[0_25px_60px_-40px_rgba(15,12,10,0.45)] dark:border-white/10 dark:bg-zinc-900 dark:text-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
                <MapPin className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm font-semibold text-foreground">Visit the studio</p>
              <a
                href="https://maps.app.goo.gl/ouR5nVnGQCM6aPxK6?g_st=aw"
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-base font-medium text-slate-950 transition hover:text-sky-700 dark:text-white"
              >
                View location
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-black/10 bg-slate-50 p-5 text-foreground shadow-sm transition hover:-translate-y-1 hover:shadow-[0_25px_60px_-40px_rgba(15,12,10,0.45)] dark:border-white/10 dark:bg-zinc-900 dark:text-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300">
                <Instagram className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm font-semibold text-foreground">Instagram</p>
              <a
                href="https://www.instagram.com/rmsladiesboutique?igsh=M3gybDBzdmkyN2Y5"
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-base font-medium text-slate-950 transition hover:text-pink-700 dark:text-white"
              >
                @rmsladiesboutique
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

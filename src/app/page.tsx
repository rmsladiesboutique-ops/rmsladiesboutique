import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, PhoneCall, Sparkles, Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDesigns, getFeaturedDesigns, getNewArrivals, getSettings } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";
import { FloatingGlow, LuxuryHeroSlider, LuxuryParallax, LuxuryReveal, LuxuryStats } from "@/components/shared/luxury-boutique";

function InstagramLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="instagram-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f58529" />
          <stop offset="0.3" stopColor="#dd2a7b" />
          <stop offset="0.6" stopColor="#8134af" />
          <stop offset="1" stopColor="#515bd4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#instagram-gradient)" />
      <rect x="7" y="7" width="10" height="10" rx="3" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.7" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.5" cy="7.5" r="1.1" fill="#fff" />
    </svg>
  );
}

export default async function Home() {
  const [designs, settings, latestArrivals, featuredArrivals] = await Promise.all([
    getDesigns(),
    getSettings(),
    getNewArrivals(12),
    getFeaturedDesigns(6),
  ]);
  const homepage = settings?.homepageContent;
  const heroBadge = homepage?.heroBadge ?? "RMS LADIES BOUTIQUE";
  const heroHeadline = homepage?.heroHeadline ?? "Luxury women’s tailoring designed for modern confidence.";
  const heroDescription = homepage?.heroDescription ?? "Book a private fitting, explore elevated collections, and enjoy polished tailoring designed for real life.";
  const heroExtra = homepage?.heroExtra ?? "Private appointments, expert guidance, and a calm boutique experience from first fitting to final delivery.";
  const catalogPath = "/catalog";
  const heroPrimaryCta = homepage?.heroPrimaryCta ?? "Book your appointment";
  const heroSecondaryCta = homepage?.heroSecondaryCta ?? "View our collection";
  const latestDesigns = latestArrivals.length ? latestArrivals : designs.slice(0, 12);
  const featuredDesigns = (featuredArrivals.length ? featuredArrivals : latestDesigns).slice(0, 4);
  const bridalDesigns = designs.filter((design) => (design.category ?? "").toLowerCase().includes("bridal")).slice(0, 4);
  const latestGallery = latestDesigns.slice(0, 4);
  const occasionDesigns = designs.filter((design) => {
    const category = (design.category ?? "").toLowerCase();
    return category.includes("occasion") || category.includes("occasional");
  }).slice(0, 4);
  const trendingDesigns = featuredDesigns.length ? featuredDesigns : latestDesigns.slice(0, 4);
  const newArrivals = latestDesigns.slice(0, 4);
  const deliveryNote = homepage?.deliveryNote ?? "Finished in our women-only boutique studio with attentive tailoring and premium local delivery.";

  const contactPhone = settings?.phoneNumber ?? "8951432847";
  const whatsappNumber = contactPhone.replace(/\D/g, "") || "918951432847";
  const whatsappLink = homepage?.heroPrimaryCta
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello RMS Ladies Boutique, I would like to book an appointment.")}`
    : `https://wa.me/${whatsappNumber}`;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 md:px-8 md:pt-14">
      <section className="hero-grid hero-spotlight relative overflow-hidden rounded-[2.5rem] border border-[#efe4d8] bg-[linear-gradient(160deg,#fffaf7_0%,#fff7f2_52%,#f7efe7_100%)] p-6 shadow-[0_40px_120px_-60px_rgba(15,12,10,0.18)] sm:p-8 lg:p-10">
        <LuxuryParallax />
        <FloatingGlow />
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_right,_rgba(255,214,179,0.35),_transparent_45%)]" aria-hidden="true" />
        <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl mix-blend-screen" aria-hidden="true" />
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="relative z-10 mx-auto w-full max-w-xl rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-[0_30px_70px_-26px_rgba(15,12,10,0.12)] backdrop-blur-xl sm:max-w-none sm:p-8 lg:p-10 text-left">
            <div className="flex flex-wrap items-center gap-3 sm:justify-start">
              <Badge className="fashion-chip">{heroBadge}</Badge>
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
              {heroHeadline}
            </h1>
            <p className="mt-6 max-w-2xl text-[1.02rem] leading-8 text-slate-900 sm:text-lg dark:text-slate-100">
              {heroDescription}
            </p>
            <p className="mt-4 max-w-2xl text-[1.02rem] leading-8 text-slate-900 sm:text-lg dark:text-slate-100">
              {heroExtra}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-white/90 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-amber-800 shadow-[0_16px_40px_-24px_rgba(145,111,79,0.45)]">
              <Sparkles className="h-3.5 w-3.5" />
              Curated for women who value softness, precision, and confidence
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[1.5rem] border border-amber-200/70 bg-amber-50/90 p-4 shadow-sm shadow-amber-200/20 dark:border-amber-300/20 dark:bg-amber-500/10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-900 shadow-sm dark:bg-slate-950/80 dark:text-amber-100">
                <MapPin className="h-3.5 w-3.5" />
                Free delivery within 5 km
              </span>
              <p className="text-sm leading-6 text-slate-900 dark:text-slate-100">{deliveryNote}</p>
            </div>
            <div className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-2">
              <Link href="/book" className="w-full"><Button size="lg" className="w-full rounded-full">{heroPrimaryCta}</Button></Link>
              <Link href={catalogPath} className="w-full"><Button size="lg" variant="outline" className="w-full rounded-full">{heroSecondaryCta}</Button></Link>
            </div>
            <LuxuryStats />
          </div>
          <div className="relative">
            <LuxuryHeroSlider />
            <div className="mt-4 rounded-[1.75rem] border border-[#efe4d8] bg-white/90 p-4 text-sm text-slate-900 shadow-[0_18px_45px_-32px_rgba(15,12,10,0.35)] backdrop-blur-xl">
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-amber-800">Studio promise</p>
              <p className="mt-2 leading-7">Private fittings, premium finishes, and calm styling guidance from first consultation to final delivery.</p>
            </div>
          </div>
        </div>
      </section>

      <LuxuryReveal className="mt-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-900 dark:text-slate-200">Latest designs</p>
            <h2 className="mt-2 text-4xl font-semibold text-slate-950 dark:text-white">New work from the boutique, refreshed daily.</h2>
          </div>
          <Link href={catalogPath} className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-amber-700 transition hover:text-amber-600">
            Explore the full collection <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 auto-rows-min sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {latestGallery.map((design, index) => {
            const spanClasses =
              index === 0
                ? "sm:col-span-2 sm:row-span-2"
                : index === 2
                ? "lg:col-span-2"
                : index === 5
                ? "sm:col-span-2"
                : "";

            return (
              <Link
                key={design.id}
                href={`/catalog/${design.id}`}
                className={`group relative flex min-h-[20rem] flex-col overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-950/95 text-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-24px_rgba(15,12,10,0.32)] ${spanClasses}`}
              >
                <div className="absolute inset-0">
                  <Image
                    src={design.imageUrl}
                    alt={design.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                </div>
                <div className="relative z-10 mt-auto p-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-100/95">{design.category}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{design.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-100/95">{design.description}</p>
                  <div className="mt-4 flex items-center justify-between gap-4 text-sm text-amber-200">
                    <span>{formatCurrency(design.price)}</span>
                    <span className="rounded-full border border-amber-200/30 bg-amber-200/10 px-3 py-1">View</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </LuxuryReveal>

      {featuredDesigns.length > 0 ? (
        <LuxuryReveal className="mt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-900 dark:text-slate-200">Featured collection</p>
              <h2 className="mt-2 text-4xl font-semibold text-slate-950 dark:text-white">Highlighted designs from the boutique.</h2>
            </div>
            <Link href={catalogPath} className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-amber-700 transition hover:text-amber-600">
              View catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredDesigns.map((design) => (
              <Card key={design.id} className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-950 text-white shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:shadow-[0_36px_120px_-60px_rgba(0,0,0,0.35)]">
                <div className="relative h-72 w-full overflow-hidden">
                  <Image src={design.imageUrl} alt={design.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                </div>
                <CardContent className="space-y-3 p-6 text-white">
                  <Badge className="fashion-chip">{design.category}</Badge>
                  <h3 className="text-2xl font-semibold">{design.title}</h3>
                  <p className="text-sm text-slate-100/95 line-clamp-3">{design.description}</p>
                  <div className="flex items-center justify-between gap-3 text-sm text-amber-200">
                    <span>{formatCurrency(design.price)}</span>
                    <span className="rounded-full border border-amber-200/30 bg-amber-200/10 px-3 py-1">Featured</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </LuxuryReveal>
      ) : null}

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-40px_rgba(15,12,10,0.18)] dark:border-white/10 dark:bg-slate-950/95 dark:text-white sm:p-10">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-900 dark:text-slate-200">New arrivals</p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-950 dark:text-white">Fresh wardrobe moments, ready to inspire.</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-900 dark:text-slate-200">
            Discover the latest tailoring options and curated pieces that can be personalized for your next appointment.
          </p>
          <div className="mt-8 space-y-4">
            {newArrivals.slice(0, 3).map((design) => (
              <div key={design.id} className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-900/85">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-900 dark:text-slate-200">{design.category}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{design.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-900 dark:text-slate-200 line-clamp-2">{design.description}</p>
                  </div>
                  <p className="text-lg font-semibold text-amber-700 dark:text-amber-300">{formatCurrency(design.price)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/catalog"
              aria-label="Explore all designs"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:border-white/10 dark:bg-slate-100 dark:text-slate-950"
            >
              Explore all designs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-8 shadow-[0_30px_80px_-40px_rgba(15,12,10,0.18)] dark:border-white/10 dark:bg-slate-950/95 dark:text-white">
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-900 dark:text-slate-200">Bridal and occasion</p>
                <h3 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Showcase styling for your special day.</h3>
              </div>
              <div className="grid gap-4">
                {bridalDesigns.map((design) => (
                  <div key={design.id} className="rounded-[1.75rem] border border-slate-200/70 bg-white p-5 dark:border-white/10 dark:bg-slate-900/85">
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-900 dark:text-slate-200">{design.category}</p>
                    <h4 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{design.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-slate-900 dark:text-slate-200 line-clamp-2">{design.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,12,10,0.18)] dark:border-white/10 dark:bg-slate-950/95 dark:text-white">
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-900 dark:text-slate-200">Crafted for everyday elegance</p>
                <h3 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Shop timeless silhouettes.</h3>
              </div>
              {occasionDesigns.length > 0 ? (
                occasionDesigns.map((design) => (
                  <div key={design.id} className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-900/85">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-950 dark:text-white">{design.title}</p>
                        <p className="mt-1 text-sm text-slate-900 dark:text-slate-200 line-clamp-2">{design.description}</p>
                      </div>
                      <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">{formatCurrency(design.price)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-6 text-sm text-slate-900 dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-200">
                  Browse the full catalog to discover elegant occasion favorites.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-900 dark:text-slate-200">Trending designs</p>
            <h2 className="mt-2 text-4xl font-semibold text-slate-950 dark:text-white">The current boutique edit.</h2>
          </div>
          <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-amber-700 transition hover:text-amber-600">
            Discover more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {trendingDesigns.map((design) => (
            <Link
              key={design.id}
              href={`/catalog/${design.id}`}
              className="group overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-32px_rgba(15,12,10,0.16)] dark:border-white/10 dark:bg-slate-950/95"
            >
              <div className="relative h-72 w-full overflow-hidden rounded-t-[2rem]">
                <Image src={design.imageUrl} alt={design.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" loading="lazy" />
              </div>
              <div className="space-y-3 p-6 text-slate-950 dark:text-white">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-900 dark:text-slate-200">{design.category}</p>
                <h3 className="text-xl font-semibold">{design.title}</h3>
                <p className="text-sm leading-7 text-slate-900 dark:text-slate-200 line-clamp-2">{design.description}</p>
                <div className="flex items-center justify-between gap-4 text-amber-700 dark:text-amber-300">
                  <span className="font-semibold">{formatCurrency(design.price)}</span>
                  <span className="text-xs uppercase tracking-[0.28em]">View</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-3">
        {[
          { title: "Studio finesse", description: "Precision tailoring, private fittings, and couture-level finishes.", icon: Sparkles },
          { title: "Premium fabrics", description: "Hand-selected materials finished in polished, wearable silhouettes.", icon: Star },
          { title: "Personal styling", description: "Dedicated guidance at every appointment for beautifully balanced ensembles.", icon: Heart },
        ].map((item) => (
          <Card key={item.title} className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,12,10,0.18)] dark:border-white/10 dark:bg-slate-950/95 dark:text-white">
            <CardContent className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">{item.title}</h3>
              <p className="text-sm leading-7 text-slate-900 dark:text-slate-200">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-14 rounded-[2rem] border border-slate-200/80 bg-slate-50 p-8 text-slate-950 shadow-[0_40px_90px_-52px_rgba(209,155,84,0.8)] dark:border-white/10 dark:bg-slate-950/95 dark:text-white sm:p-10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-900 dark:text-slate-200">Testimonials</p>
            <h2 className="mt-3 text-4xl font-semibold text-slate-950 dark:text-white">Client stories from the boutique.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {(homepage?.testimonialsItems?.length ? homepage.testimonialsItems : [
              { title: "Amara", description: "The fit was flawless and the service made me feel truly cared for." },
              { title: "Nina", description: "A luxury tailoring experience that felt effortless and modern." },
            ]).map((item) => (
              <div key={item.title} className="rounded-[2rem] border border-slate-200/70 bg-white p-6 text-slate-950 shadow-sm dark:border-white/10 dark:bg-slate-900/85 dark:text-white">
                <p className="text-base leading-7 text-slate-900 dark:text-slate-200">“{item.description}”</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-900 dark:text-white">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14 rounded-[2.5rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-40px_rgba(15,12,10,0.18)] dark:border-white/10 dark:bg-slate-950/95 dark:ring-1 dark:ring-white/10 sm:p-10">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200/70 bg-slate-50/95 p-8 shadow-[0_30px_70px_-30px_rgba(15,12,10,0.12)] dark:border-white/10 dark:bg-slate-900/85">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.26em] text-slate-900 dark:text-slate-200">Contact details</p>
            <h2 className="mt-3 text-4xl font-semibold text-slate-950 dark:text-white">Ready to book your fitting?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-900 dark:text-slate-200">
              Reach out directly via phone, WhatsApp, location or Instagram for fast styling support and appointment help.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.75rem] border border-slate-200/70 bg-white p-5 text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-30px_rgba(15,12,10,0.18)] dark:border-white/10 dark:bg-zinc-900 dark:text-white sm:p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 sm:h-14 sm:w-14 sm:rounded-3xl">
                <PhoneCall className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-950 dark:text-white">Call studio</p>
              <a href={`tel:${contactPhone}`} className="mt-2 block text-base font-semibold text-slate-950 transition hover:text-amber-700 dark:text-white sm:text-lg">
                {contactPhone}
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/70 bg-white p-5 text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-30px_rgba(15,12,10,0.18)] dark:border-white/10 dark:bg-zinc-900 dark:text-white sm:p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 sm:h-14 sm:w-14 sm:rounded-3xl">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
                  <circle cx="12" cy="12" r="10" fill="#25D366" />
                  <path
                    d="M15.72 14.28c-.17-.09-1.08-.52-1.23-.58-.15-.06-.26-.07-.37.08-.11.14-.44.52-.54.62-.1.09-.2.1-.36.03-.16-.08-.7-.26-1.32-.82-.49-.44-.82-.98-.92-1.18-.1-.2-.01-.31.07-.4.08-.08.18-.2.27-.31.09-.11.12-.18.18-.29.06-.11.03-.2 0-.28-.03-.09-.28-.64-.39-.86-.13-.24-.26-.2-.36-.2h-.32c-.1 0-.28 0-.43.02-.15.02-.35.08-.53.3-.18.22-.68.76-.68 1.84 0 1.08.65 2.12.74 2.33.08.2 1.56 2.4 3.8 3.65.57.27 1.07.43 1.46.43.35 0 1.07-.16 1.45-.84.38-.68.39-1.3.32-1.44-.07-.14-.23-.22-.41-.31Z"
                    fill="#fff"
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-950 dark:text-white">WhatsApp</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Message us
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/70 bg-white p-5 text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-30px_rgba(15,12,10,0.18)] dark:border-white/10 dark:bg-zinc-900 dark:text-white sm:p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300 sm:h-14 sm:w-14 sm:rounded-3xl">
                <MapPin className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-950 dark:text-white">Visit the studio</p>
              <a
                href="https://maps.app.goo.gl/ouR5nVnGQCM6aPxK6?g_st=aw"
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-base font-medium text-slate-950 transition hover:text-sky-700 dark:text-white"
              >
                View location
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/70 bg-white p-5 text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-30px_rgba(15,12,10,0.18)] dark:border-white/10 dark:bg-zinc-900 dark:text-white sm:p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-300 text-white dark:bg-pink-500/15 dark:text-pink-200 sm:h-14 sm:w-14 sm:rounded-3xl">
                <InstagramLogo className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-950 dark:text-white">Instagram</p>
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

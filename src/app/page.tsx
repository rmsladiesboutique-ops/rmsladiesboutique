import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSettings } from "@/lib/services";

function InstagramLogo(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="instagram-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f09433" />
          <stop offset="0.3" stopColor="#e6683c" />
          <stop offset="0.6" stopColor="#dc2743" />
          <stop offset="1" stopColor="#cc2366" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#instagram-gradient)" />
      <path d="M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.3" fill="#fff" />
      <circle cx="16.5" cy="7.5" r="1.1" fill="#fff" />
    </svg>
  );
}

function WhatsAppLogo(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="#25D366" />
      <path
        d="M16.5 15.6c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4 0-.6.1-.2.1-.6.2-.9.3-.2.1-.4.1-.6-.2-.2-.3-.8-.9-1-1.1-.2-.2-.3-.4-.2-.6.1-.2.2-.4.3-.6.1-.2.1-.4 0-.7-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.6 0-.9 0-.3 0-.7.1-1 .4-.3.3-1.2 1.2-1.2 2.8 0 1.6 1.2 3.2 1.3 3.5.1.3 2.2 3.4 5.4 4.6.8.3 1.4.5 1.9.5.5 0 1.5-.2 2-1.1.5-.9.5-1.7.4-1.8-.1-.1-.3-.2-.5-.3Z"
        fill="#fff"
      />
    </svg>
  );
}

export default async function Home() {
  const settings = await getSettings();
  const homepage = settings?.homepageContent;
  const heroBadge = homepage?.heroBadge ?? "Bespoke Atelier";
  const heroHeadline = homepage?.heroHeadline ?? "Bespoke tailoring for women who demand precision, comfort and enduring style.";
  const heroDescription = homepage?.heroDescription ?? "Secure a private appointment with our atelier and refine your wardrobe with expertly crafted pieces.";
  const heroExtra = homepage?.heroExtra ?? "Personal fittings, refined tailoring, and hand-finished construction designed for your life.";
  const heroPrimaryCta = homepage?.heroPrimaryCta ?? "Book an appointment";
  const heroSecondaryCta = homepage?.heroSecondaryCta ?? "Browse the collection";
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
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 md:px-8 md:pt-14">
      <section className="hero-grid hero-spotlight overflow-hidden rounded-[2.5rem] p-8 sm:p-10 shadow-[0_30px_60px_-40px_rgba(15,12,10,0.12)]">
        <div className="space-y-8 mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="fashion-chip">{heroBadge}</Badge>
            </div>

            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl">
              {heroHeadline}
            </h1>

            <p className="text-base leading-8 text-foreground/80 sm:text-lg">
              {heroDescription}
            </p>

            <p className="text-base leading-8 text-foreground/80 sm:text-lg">
              {heroExtra}
            </p>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-100/90 px-4 py-2 text-sm font-semibold text-amber-900 shadow-sm shadow-amber-200/20">
                <span className="rounded-full bg-amber-500 px-2 py-1 text-xs uppercase tracking-[0.2em] text-black">Free delivery</span>
                <span>within 5km range</span>
              </div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-700 sm:text-base">
                {deliveryNote}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/book" className="w-full sm:w-auto"><Button size="lg" className="w-full sm:w-auto">{heroPrimaryCta}</Button></Link>
              <Link href="/catalog" className="w-full sm:w-auto"><Button size="lg" variant="outline" className="w-full sm:w-auto">{heroSecondaryCta}</Button></Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.value + stat.label} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-5 text-center shadow-sm dark:border-slate-700/70 dark:bg-slate-900/80">
                  <p className="text-lg font-semibold text-foreground dark:text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-foreground/60 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
        <Card className="feature-highlight rounded-[2rem] p-8 shadow-xl border border-black/5">
          <CardContent className="space-y-5">
            <p className="text-sm uppercase tracking-[0.28em] text-foreground/55">Signature services</p>
            <h2 className="text-4xl font-semibold">{featureSectionTitle}</h2>
            <p className="max-w-2xl text-base leading-8 text-foreground/75">
              {featureSectionSubtitle}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {featureCards.map((card) => (
                <div key={card.title} className="rounded-3xl border border-slate-200/70 bg-white/95 text-slate-950 dark:bg-slate-950/80 dark:text-white p-5 text-sm shadow-sm">
                  <p className="font-semibold text-slate-950 dark:text-white">{card.title}</p>
                  <p className="mt-2 text-slate-700 dark:text-slate-300">{card.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
              <a href="tel:+918951432847" className="mt-3 block text-lg font-semibold text-slate-950 transition hover:text-amber-700 dark:text-white">
                8951432847
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-black/10 bg-slate-50 p-5 text-foreground shadow-sm transition hover:-translate-y-1 hover:shadow-[0_25px_60px_-40px_rgba(15,12,10,0.45)] dark:border-white/10 dark:bg-zinc-900 dark:text-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                <WhatsAppLogo className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm font-semibold text-foreground">WhatsApp</p>
              <a
                href="https://wa.me/918951432847?text=Hey!%20I%20just%20visited%20your%20website%20and%20need%20more%20details."
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
                <InstagramLogo className="h-5 w-5" />
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

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

function WhatsAppLogo(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="#25D366" />
      <path
        d="M15.72 14.28c-.17-.09-1.08-.52-1.23-.58-.15-.06-.26-.07-.37.08-.11.14-.44.52-.54.62-.1.09-.2.1-.36.03-.16-.08-.7-.26-1.32-.82-.49-.44-.82-.98-.92-1.18-.1-.2-.01-.31.07-.4.08-.08.18-.2.27-.31.09-.11.12-.18.18-.29.06-.11.03-.2 0-.28-.03-.09-.28-.64-.39-.86-.13-.24-.26-.2-.36-.2h-.32c-.1 0-.28 0-.43.02-.15.02-.35.08-.53.3-.18.22-.68.76-.68 1.84 0 1.08.65 2.12.74 2.33.08.2 1.56 2.4 3.8 3.65.57.27 1.07.43 1.46.43.35 0 1.07-.16 1.45-.84.38-.68.39-1.3.32-1.44-.07-.14-.23-.22-.41-.31Z"
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
      <section className="hero-grid hero-spotlight grid gap-10 lg:grid-cols-[1.25fr_0.95fr] overflow-hidden rounded-[2.5rem] p-8 sm:p-10 shadow-[0_30px_60px_-40px_rgba(15,12,10,0.12)]">
        <div className="space-y-8 mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="fashion-chip">{heroBadge}</Badge>
            </div>

            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl">
              {heroHeadline}
            </h1>

            <p className="text-base leading-8 text-slate-900 sm:text-lg">
              {heroDescription}
            </p>

            <p className="text-base leading-8 text-slate-900 sm:text-lg">
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
                <div key={stat.value + stat.label} className="rounded-3xl border border-slate-200/80 bg-white p-5 text-center shadow-sm dark:border-slate-700/70 dark:bg-slate-900/80">
                  <p className="text-lg font-semibold text-slate-950 dark:text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
        </div>

        <div className="hero-image-panel relative hidden overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-50 shadow-[0_30px_80px_-50px_rgba(15,12,10,0.12)] dark:border-slate-700/70 dark:bg-slate-900/80 lg:block">
          <div className="hero-image-accent" />
          <Image src="/images/bridal-wear.jpeg" alt="Tailored garment" fill className="object-cover" priority />
          <div className="hero-image-copy absolute inset-x-0 bottom-0 p-6 backdrop-blur-sm bg-white/30 text-slate-900 dark:bg-slate-950/50 dark:text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-700 dark:text-slate-300">Studio craftsmanship</p>
            <p className="mt-2 text-xl font-semibold">Refined finishes for every occasion</p>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card className="feature-highlight rounded-[2rem] p-8 shadow-xl border border-slate-200/70 bg-white">
          <CardContent className="space-y-5">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-700">Signature services</p>
            <h2 className="text-4xl font-semibold text-slate-950">{featureSectionTitle}</h2>
            <p className="max-w-2xl text-base leading-8 text-slate-800">
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

        <Card className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-8 text-slate-950 shadow-xl dark:border-white/10 dark:bg-slate-950/90 dark:text-white">
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Why clients choose us</p>
              <h3 className="mt-3 text-3xl font-semibold">Tailored results with thoughtful service</h3>
            </div>
            <div className="space-y-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
              <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/85">
                <p className="font-semibold">One-on-one fittings</p>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Expert measurements and styling guidance for every appointment.</p>
              </div>
              <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/85">
                <p className="font-semibold">Premium craftsmanship</p>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Luxury finishes, precise construction and time-honored tailoring techniques.</p>
              </div>
              <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/85">
                <p className="font-semibold">Discreet studio experience</p>
                <p className="mt-2 text-slate-600 dark:text-slate-400">A comfortable, private environment designed for personal wardrobe care.</p>
              </div>
            </div>
            <div className="mt-2">
              <Link href="/book" className="inline-flex items-center justify-center rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-800">
                Book a private consultation
              </Link>
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
                <div className="mt-4 space-y-3 text-sm text-slate-700">
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
                <div className="mt-4 space-y-4 text-sm text-slate-700">
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
          {homepage.ctaTitle && <h3 className="text-3xl font-semibold text-slate-950">{homepage.ctaTitle}</h3>}
          {homepage.ctaDescription && <p className="mt-2 text-slate-800">{homepage.ctaDescription}</p>}
          {homepage.ctaButton && (
            <div className="mt-6"><Link href="/book"><Button size="lg">{homepage.ctaButton}</Button></Link></div>
          )}
        </section>
      ) : null}

      <section className="mt-14 rounded-[2rem] border border-black/10 bg-white/95 p-8 shadow-[0_24px_60px_-48px_rgba(15,12,10,0.35)] dark:border-white/10 dark:bg-zinc-950/90">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm uppercase tracking-[0.26em] text-slate-700">Contact details</p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-950">Ready to book your fitting?</h2>
          <p className="mt-3 text-base leading-7 text-slate-800">
            Reach out directly via phone, WhatsApp, location or Instagram for fast styling support and appointment help.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.75rem] border border-slate-200/70 bg-white p-5 text-slate-950 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_25px_60px_-40px_rgba(15,12,10,0.45)] dark:border-white/10 dark:bg-zinc-900 dark:text-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                <PhoneCall className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm font-semibold text-slate-950 dark:text-white">Call studio</p>
              <a href="tel:+918951432847" className="mt-3 block text-lg font-semibold text-slate-950 transition hover:text-amber-700 dark:text-white">
                8951432847
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/70 bg-white p-5 text-slate-950 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_25px_60px_-40px_rgba(15,12,10,0.45)] dark:border-white/10 dark:bg-zinc-900 dark:text-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                <WhatsAppLogo className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm font-semibold text-slate-950 dark:text-white">WhatsApp</p>
              <a
                href="https://wa.me/918951432847?text=Hey!%20I%20just%20visited%20your%20website%20and%20need%20more%20details."
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Message us
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/70 bg-white p-5 text-slate-950 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_25px_60px_-40px_rgba(15,12,10,0.45)] dark:border-white/10 dark:bg-zinc-900 dark:text-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
                <MapPin className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm font-semibold text-slate-950 dark:text-white">Visit the studio</p>
              <a
                href="https://maps.app.goo.gl/ouR5nVnGQCM6aPxK6?g_st=aw"
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-base font-medium text-slate-950 transition hover:text-sky-700 dark:text-white"
              >
                View location
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/70 bg-white p-5 text-slate-950 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_25px_60px_-40px_rgba(15,12,10,0.45)] dark:border-white/10 dark:bg-zinc-900 dark:text-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-300 text-white dark:bg-pink-500/15 dark:text-pink-200">
                <InstagramLogo className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm font-semibold text-slate-950 dark:text-white">Instagram</p>
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

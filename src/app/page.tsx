import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, Scissors, Sparkles, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 md:px-8 md:pt-14">
      <section className="hero-grid hero-spotlight grid items-center gap-6 overflow-hidden rounded-[2.5rem] p-5 sm:p-6 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:p-10 lg:p-12">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="fashion-chip">Luxury Ladies Boutique</Badge>
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/55">Editorial tailoring • color-forward fashion</span>
          </div>
          <h1 className="max-w-xl text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl">
            A couture atelier where bold color, impeccable fit, and celebration meet.
          </h1>
          <p className="max-w-xl text-base leading-8 text-foreground/72 sm:text-lg">
            RMS Ladies Boutique blends couture precision with modern digital glamour. Discover statement silhouettes, reserve fittings, and follow your bespoke creation from studio to reveal.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/book" className="w-full sm:w-auto"><Button size="lg" className="w-full sm:w-auto">Book Appointment</Button></Link>
            <Link href="/catalog" className="w-full sm:w-auto"><Button size="lg" variant="outline" className="w-full sm:w-auto">Browse Collection</Button></Link>
          </div>
          <div className="grid gap-3 pt-3 sm:grid-cols-3">
            {[
              ["12+ years", "Fine tailoring"],
              ["Custom fits", "Bold statement pieces"],
              ["Live tracking", "Studio-to-door updates"],
            ].map(([value, label]) => (
              <div key={value} className="fashion-chip rounded-3xl p-4">
                <p className="text-lg font-semibold text-foreground">{value}</p>
                <p className="mt-1 text-sm text-foreground/60">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-gradient-to-br from-fuchsia-300/30 to-coral-200/0 blur-3xl" />
          <div className="absolute -right-10 bottom-10 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-200/20 to-coral-200/0 blur-3xl" />
          <div className="relative h-[340px] overflow-hidden rounded-[2rem] border border-white/20 shadow-[0_45px_120px_-60px_rgba(37,25,15,0.95)] sm:h-[440px]">
            <Image
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1300&q=80"
              alt="Couture fashion scene"
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
            <h2 className="text-4xl font-semibold">Couture styling, made unexpectedly vivid.</h2>
            <p className="max-w-2xl text-base leading-8 text-foreground/72">
              From wedding couture to custom eveningwear, each piece is tailored with premium fabrics, layered silhouettes, and runway-ready details.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Editorial Fit", "Precision patterning for every curve."],
                ["Artisan Finish", "Luxury hand-finish details."],
                ["Curated Color", "Rich palettes that make a statement."],
                ["Fast Tracking", "Transparent progress notifications."],
              ].map(([title, subtitle]) => (
                <div key={title} className="rounded-3xl border border-white/15 bg-white/10 p-4 text-sm text-foreground/75 shadow-[0_18px_50px_-40px_rgba(209,155,84,0.35)] backdrop-blur-sm">
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="mt-2">{subtitle}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel rounded-[2rem] p-8">
          <CardContent className="space-y-5">
            <p className="text-sm uppercase tracking-[0.28em] text-foreground/55">Featured collection</p>
            <div className="grid gap-4">
              {[
                ["Velvet Noir", "Satin trims, sculpted shoulders, and dramatic drape."],
                ["Blush Splendor", "Soft silhouettes with vibrant hand-embroidery."],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-[1.5rem] border border-white/15 bg-black/5 p-4 shadow-[0_15px_45px_-35px_rgba(37,25,15,0.6)]">
                  <p className="text-lg font-semibold text-foreground">{title}</p>
                  <p className="mt-2 text-sm text-foreground/65">{desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3">
        {[
          ["Bespoke Suits", "Personal pattern drafting and hand-finished construction."],
          ["Wedding Couture", "Ceremonial garments designed to your body and style."],
          ["Alteration Studio", "Precision fitting, sleeve balance, and full silhouette correction."],
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

      <section className="mt-14 grid gap-8 md:mt-16 md:grid-cols-2">
        <Card className="fashion-card">
          <CardContent>
            <h3 className="text-2xl">Pricing Highlights</h3>
            <div className="mt-4 space-y-3 text-sm text-foreground/72">
              <p>Two-Piece Suit: $650+</p>
              <p>Three-Piece Suit: $850+</p>
              <p>Sherwani / Traditional: $1,200+</p>
              <p>Alteration Packages: $80+</p>
            </div>
          </CardContent>
        </Card>
        <Card className="fashion-card">
          <CardContent>
            <h3 className="text-2xl">Client Testimonials</h3>
            <div className="mt-4 space-y-4 text-sm text-foreground/72">
              <p>&quot;The fit was immaculate. Their status tracking kept me updated at every step.&quot; - Daniel R.</p>
              <p>&quot;Our wedding outfits were stunning and delivered exactly on schedule.&quot; - Neha &amp; Arjun</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-14 overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-r from-amber-400/10 via-fuchsia-200/10 to-teal-200/10 p-8 text-center shadow-[0_40px_90px_-52px_rgba(209,155,84,0.8)] md:mt-16 md:p-10">
        <h3 className="text-3xl font-semibold">Ready for your first fitting?</h3>
        <p className="mt-2 text-foreground/70">Reserve a slot in under two minutes and get your unique 6-digit tracking code instantly.</p>
        <div className="mt-6"><Link href="/book"><Button size="lg">Start Booking</Button></Link></div>
      </section>
    </main>
  );
}

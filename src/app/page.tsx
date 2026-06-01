import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, Scissors, Sparkles, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 md:px-8 md:pt-14">
      <section className="hero-grid grid items-center gap-6 overflow-hidden rounded-[2rem] p-5 sm:p-6 md:grid-cols-2 md:gap-8 md:p-10 lg:p-12">
        <div className="space-y-5 sm:space-y-6">
          <Image src="/rms-logo.jpeg" alt="RMS Ladies Boutique" width={340} height={170} className="h-auto w-[220px] sm:w-[310px]" priority />
          <Badge>Luxury Ladies Boutique</Badge>
          <h1 className="max-w-xl text-4xl leading-[1.03] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Elegant tailoring, bridalwear, and custom fashion designed around you.
          </h1>
          <p className="max-w-xl text-sm text-foreground/72 sm:text-base md:text-lg">
            RMS Ladies Boutique blends couture craftsmanship with a premium digital experience. Browse designs, book fittings, submit custom requests, and track production in real time.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/book" className="w-full sm:w-auto"><Button size="lg" className="w-full sm:w-auto">Book Appointment</Button></Link>
            <Link href="/catalog" className="w-full sm:w-auto"><Button size="lg" variant="outline" className="w-full sm:w-auto">Explore Designs</Button></Link>
          </div>
        </div>
        <div className="relative h-[320px] overflow-hidden rounded-[1.75rem] border border-white/30 shadow-[0_35px_90px_-50px_rgba(24,18,12,0.9)] sm:h-[420px]">
          <Image
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1300&q=80"
            alt="Tailoring studio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>
      </section>

      <section className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3">
        {[
          ["Bespoke Suits", "Personal pattern drafting and hand-finished construction."],
          ["Wedding Couture", "Ceremonial garments designed to your body and style."],
          ["Alteration Studio", "Precision fitting, sleeve balance, and full silhouette correction."],
        ].map(([title, desc]) => (
          <Card key={title}><CardContent><h2 className="text-2xl">{title}</h2><p className="mt-2 text-sm text-foreground/65">{desc}</p><ArrowRight className="mt-6 h-4 w-4 text-amber-700 dark:text-amber-200" /></CardContent></Card>
        ))}
      </section>

      <section className="mt-14 grid gap-8 md:mt-16 md:grid-cols-2">
        <Card>
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
        <Card>
          <CardContent>
            <h3 className="text-2xl">Client Testimonials</h3>
            <div className="mt-4 space-y-4 text-sm text-foreground/72">
              <p>&quot;The fit was immaculate. Their status tracking kept me updated at every step.&quot; - Daniel R.</p>
              <p>&quot;Our wedding outfits were stunning and delivered exactly on schedule.&quot; - Neha &amp; Arjun</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-14 rounded-[2rem] border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-500/6 to-transparent p-8 text-center shadow-[0_30px_70px_-50px_rgba(184,137,47,0.8)] md:mt-16 md:p-10">
        <h3 className="text-3xl">Ready for your first fitting?</h3>
        <p className="mt-2 text-foreground/70">Reserve a slot in under two minutes and get your unique 6-digit tracking code instantly.</p>
        <div className="mt-6"><Link href="/book"><Button size="lg">Start Booking</Button></Link></div>
      </section>
    </main>
  );
}

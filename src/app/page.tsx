import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-16 md:px-8">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <Image src="/rms-logo.jpeg" alt="RMS Ladies Boutique" width={340} height={170} className="h-auto w-[260px] sm:w-[320px]" priority />
          <Badge>Luxury Ladies Boutique</Badge>
          <h1 className="text-5xl leading-tight tracking-tight md:text-6xl">
            Elegant tailoring, bridalwear, and custom fashion made for you.
          </h1>
          <p className="max-w-xl text-zinc-400">
            RMS Ladies Boutique blends couture craftsmanship with digital convenience. Browse designs, book fittings, submit custom requests, and track production in real time.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/book"><Button size="lg">Book Appointment</Button></Link>
            <Link href="/catalog"><Button size="lg" variant="outline">Explore Designs</Button></Link>
          </div>
        </div>
        <div className="relative h-[420px] overflow-hidden rounded-2xl border border-zinc-800">
          <Image
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1300&q=80"
            alt="Tailoring studio"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {[
          ["Bespoke Suits", "Personal pattern drafting and hand-finished construction."],
          ["Wedding Couture", "Ceremonial garments designed to your body and style."],
          ["Alteration Studio", "Precision fitting, sleeve balance, and full silhouette correction."],
        ].map(([title, desc]) => (
          <Card key={title}><CardContent><h2 className="text-2xl">{title}</h2><p className="mt-2 text-sm text-zinc-400">{desc}</p></CardContent></Card>
        ))}
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <Card>
          <CardContent>
            <h3 className="text-2xl">Pricing Highlights</h3>
            <div className="mt-4 space-y-3 text-sm text-zinc-300">
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
            <div className="mt-4 space-y-4 text-sm text-zinc-300">
              <p>&quot;The fit was immaculate. Their status tracking kept me updated at every step.&quot; - Daniel R.</p>
              <p>&quot;Our wedding outfits were stunning and delivered exactly on schedule.&quot; - Neha &amp; Arjun</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-16 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center">
        <h3 className="text-3xl">Ready for your first fitting?</h3>
        <p className="mt-2 text-zinc-300">Reserve a slot in under two minutes and get your unique 6-digit tracking code instantly.</p>
        <div className="mt-6"><Link href="/book"><Button size="lg">Start Booking</Button></Link></div>
      </section>
    </main>
  );
}

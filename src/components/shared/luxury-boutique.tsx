"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  { image: "/images/bridal-wear.jpeg", label: "Bridal Studio", title: "Tailored for unforgettable moments" },
  { image: "/images/occasional-wear.jpeg", label: "Occasion Edit", title: "Luxury silhouettes with a soft glow" },
  { image: "/images/simple-daily-wear.jpeg", label: "Modern Essentials", title: "Polished looks for every day" },
];

export function LuxuryHeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % heroSlides.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 shadow-[0_30px_80px_-40px_rgba(15,12,10,0.45)] md:h-[520px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={heroSlides[index].image}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image src={heroSlides[index].image} alt={heroSlides[index].title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,9,0.25)_0%,rgba(6,7,9,0.55)_55%,rgba(6,7,9,0.82)_100%)]" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 md:p-6">
        <span className="rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[0.68rem] uppercase tracking-[0.32em] text-amber-100 backdrop-blur-md">Editorial atelier</span>
        <span className="rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[0.68rem] uppercase tracking-[0.32em] text-white/90 backdrop-blur-md">Luxury styling</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white md:p-8">
        <p className="text-[0.72rem] uppercase tracking-[0.35em] text-amber-100/90">{heroSlides[index].label}</p>
        <h2 className="mt-3 max-w-md text-2xl font-semibold tracking-[-0.04em] md:text-3xl">{heroSlides[index].title}</h2>
      </div>

      <div className="absolute right-4 top-4 z-10 flex gap-2 md:right-6 md:top-6">
        {heroSlides.map((slide, slideIndex) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setIndex(slideIndex)}
            className={`h-2.5 rounded-full transition-all ${slideIndex === index ? "w-10 bg-white" : "w-2.5 bg-white/45 hover:bg-white/75"}`}
            aria-label={`Show slide ${slideIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function LuxuryReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    gsap.fromTo(
      node,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: node,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}

export function LuxuryParallax() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -24]);

  return (
    <motion.div style={{ y }} className="pointer-events-none absolute inset-x-0 top-20 hidden h-48 rounded-full bg-[radial-gradient(circle,_rgba(201,155,105,0.12),transparent_60%)] blur-3xl lg:block" />
  );
}

export function FloatingGlow() {
  const itemClass = "pointer-events-none absolute rounded-full bg-white/10 blur-3xl";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`${itemClass} left-10 top-16 h-24 w-24 opacity-70`} />
      <div className={`${itemClass} right-12 top-28 h-32 w-32 opacity-60`} />
      <div className={`${itemClass} bottom-10 left-1/3 h-28 w-28 opacity-50`} />
    </div>
  );
}

export function LuxuryStats() {
  const stats = useMemo(
    () => [
      { value: "120+", label: "Private fittings" },
      { value: "4.9/5", label: "Client satisfaction" },
      { value: "72h", label: "Response time" },
    ],
    [],
  );

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((item) => (
        <motion.div
          key={item.label}
          whileHover={{ y: -4 }}
          className="rounded-[1.7rem] border border-[#efe4d8] bg-white/90 p-5 text-center shadow-[0_20px_40px_-26px_rgba(15,12,10,0.35)] backdrop-blur-xl"
        >
          <p className="text-3xl font-semibold tracking-[-0.05em] text-slate-950">{item.value}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-600">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

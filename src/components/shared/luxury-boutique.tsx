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
    <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-[#B8864A]/20 bg-white shadow-[0_30px_80px_-40px_rgba(17,24,39,0.15)] md:h-[520px]">
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
          <div className="absolute inset-0 image-overlay" />
          <div className="absolute inset-0 image-overlay-bottom" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 md:p-6">
        <span className="inline-flex items-center rounded-full border border-[#B8864A]/30 bg-[#FAF7F2]/90 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#B8864A] backdrop-blur-md">Editorial atelier</span>
        <span className="inline-flex items-center rounded-full border border-[#B8864A]/30 bg-[#FAF7F2]/90 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#B8864A] backdrop-blur-md">Luxury styling</span>
      </div>
      <motion.div
        key={`copy-${index}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 z-10 p-6 text-white md:p-8"
      >
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.32em] text-[#B8864A]">{heroSlides[index].label}</p>
        <h2 className="mt-3 max-w-md text-hero text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">{heroSlides[index].title}</h2>
      </motion.div>

      <div className="absolute right-4 top-16 z-10 flex gap-2 md:right-6 md:top-20">
        {heroSlides.map((slide, slideIndex) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setIndex(slideIndex)}
            className={`h-2.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-[#B8864A]/70 ${slideIndex === index ? "w-10 bg-[#B8864A]" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
            aria-label={`Show slide ${slideIndex + 1}`}
            aria-current={slideIndex === index ? "true" : undefined}
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
    <motion.div style={{ y }} className="pointer-events-none absolute inset-x-0 top-20 hidden h-48 rounded-full bg-[radial-gradient(circle,_rgba(184,134,74,0.12),transparent_60%)] blur-3xl lg:block" />
  );
}

export function FloatingGlow() {
  const itemClass = "pointer-events-none absolute rounded-full bg-[#B8864A]/10 blur-3xl";

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
          whileHover={{ y: -4, scale: 1.02 }}
          className="fashion-card rounded-[1.7rem] p-5 text-center"
        >
          <p className="text-3xl font-bold tracking-[-0.05em] text-[#1F2937]">{item.value}</p>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.24em] text-[#6B7280]">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

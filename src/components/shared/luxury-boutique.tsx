"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  { image: "/images/bridal-wear.jpeg", label: "Bridal Studio", title: "Tailored for unforgettable moments" },
  { image: "/images/occasional-wear.jpeg", label: "Occasion Edit", title: "Luxury silhouettes with a soft glow" },
  { image: "/images/simple-daily-wear.jpeg", label: "Modern Essentials", title: "Polished looks for every day" },
];

type CinematicHeroProps = {
  title: string;
  titleAccent: string;
  description: string;
  bookingPath: string;
  catalogPath: string;
};

export function LuxuryCinematicHero({
  title,
  titleAccent,
  description,
  bookingPath,
  catalogPath,
}: CinematicHeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % heroSlides.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlides[index].image}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[index].image}
              alt={heroSlides[index].title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="image-overlay-hero" />
        <div className="absolute inset-0 bg-noise opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container w-full pt-32 pb-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="fashion-chip border-white/20 bg-white/10 text-[#D4AF37] backdrop-blur-md">
              {heroSlides[index].label}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-hero mt-8 text-white"
          >
            {title}
            <span className="mt-2 block text-gradient-gold">{titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 max-w-xl text-body text-white/80"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-10 flex flex-wrap gap-5"
          >
            <Link href={bookingPath} aria-label="Book an appointment">
              <Button className="btn-primary text-xs px-10 py-4">
                Book Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={catalogPath} aria-label="Explore designs">
              <Button className="btn-ghost text-xs px-10 py-4">
                Explore Collection
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-14"
          >
            <LuxuryStats variant="dark" />
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-12 right-6 flex gap-2 sm:right-10 lg:right-16">
          {heroSlides.map((slide, slideIndex) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => setIndex(slideIndex)}
              className={`h-1 rounded-full transition-all duration-500 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 ${
                slideIndex === index ? "w-12 bg-[#D4AF37]" : "w-6 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Show slide ${slideIndex + 1}`}
              aria-current={slideIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.32em]">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

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
        <span className="fashion-chip">Editorial atelier</span>
        <span className="fashion-chip">Luxury styling</span>
      </div>
      <motion.div
        key={`copy-${index}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 z-10 p-6 text-white md:p-8"
      >
        <p className="section-label text-[#D4AF37]">{heroSlides[index].label}</p>
        <h2 className="mt-3 max-w-md font-[family-name:var(--font-display)] text-3xl font-bold text-white drop-shadow-lg md:text-4xl">
          {heroSlides[index].title}
        </h2>
      </motion.div>

      <div className="absolute right-4 top-16 z-10 flex gap-2 md:right-6 md:top-20">
        {heroSlides.map((slide, slideIndex) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setIndex(slideIndex)}
            className={`h-1 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 ${
              slideIndex === index ? "w-10 bg-[#D4AF37]" : "w-6 bg-white/40 hover:bg-white/70"
            }`}
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

    const trigger = gsap.fromTo(
      node,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: node,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
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
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <motion.div
      style={{ y }}
      className="pointer-events-none absolute inset-x-0 top-20 hidden h-64 rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.08),transparent_65%)] blur-3xl lg:block"
    />
  );
}

export function FloatingGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-[#D4AF37]/6 blur-3xl" />
      <div className="absolute right-[5%] top-[40%] h-96 w-96 rounded-full bg-[#B8864A]/5 blur-3xl" />
      <div className="absolute bottom-[10%] left-1/3 h-64 w-64 rounded-full bg-[#D4AF37]/4 blur-3xl" />
    </div>
  );
}

export function LuxuryStats({ variant = "light" }: { variant?: "light" | "dark" }) {
  const stats = useMemo(
    () => [
      { value: "120+", label: "Private fittings" },
      { value: "4.9/5", label: "Client satisfaction" },
      { value: "72h", label: "Response time" },
    ],
    [],
  );

  const isDark = variant === "dark";

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((item) => (
        <motion.div
          key={item.label}
          whileHover={{ y: -4, scale: 1.02 }}
          className={`rounded-[1.5rem] p-5 text-center backdrop-blur-md transition-all ${
            isDark
              ? "border border-white/10 bg-white/8"
              : "fashion-card"
          }`}
        >
          <p className={`text-3xl font-bold tracking-tight ${isDark ? "text-white" : "text-[#1F2937]"}`}>
            {item.value}
          </p>
          <p className={`mt-2 text-xs font-semibold uppercase tracking-[0.24em] ${isDark ? "text-white/60" : "text-[#6B7280]"}`}>
            {item.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

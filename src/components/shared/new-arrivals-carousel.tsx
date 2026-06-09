"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import type { DesignItem } from "@/types/domain";
import { formatCurrency } from "@/lib/utils";

function chunkDesigns(items: DesignItem[], size: number) {
  const chunks: DesignItem[][] = [];

  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }

  return chunks;
}

export function NewArrivalsCarousel({ designs }: { designs: DesignItem[] }) {
  const slides = useMemo(() => chunkDesigns(designs, 3), [designs]);
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setIndex((current) => (current + 1) % slides.length);
  const prevSlide = () => setIndex((current) => (current - 1 + slides.length) % slides.length);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) return;

    const endX = event.changedTouches[0]?.clientX ?? 0;
    const delta = touchStart - endX;

    if (delta > 60) nextSlide();
    if (delta < -60) prevSlide();

    setTouchStart(null);
  };

  if (!designs.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div
        className="rounded-[2rem] border border-[#E5E7EB] bg-white p-4 shadow-[0_30px_70px_-40px_rgba(17,24,39,0.18)] sm:p-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#B8864A]">Fresh arrivals</p>
            <h3 className="mt-2 text-xl font-semibold text-[#111827] sm:text-2xl">Swipe through the latest boutique drops</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={prevSlide}
              aria-label="Previous arrivals"
              className="rounded-full border-[#E5E7EB] bg-[#FAF7F2] hover:border-[#B8864A]/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={nextSlide}
              aria-label="Next arrivals"
              className="rounded-full border-[#E5E7EB] bg-[#FAF7F2] hover:border-[#B8864A]/30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index]?.map((item) => item.id).join("-") ?? index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {slides[index]?.map((design) => (
              <Link
                key={design.id}
                href={`/catalog/${design.id}`}
                className="group overflow-hidden rounded-[1.75rem] border border-[#E5E7EB] bg-[#FAF7F2] shadow-[0_18px_50px_-28px_rgba(17,24,39,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B8864A]/30 hover:shadow-[0_28px_60px_-24px_rgba(17,24,39,0.22)]"
              >
                <div className="relative h-64 overflow-hidden sm:h-72">
                  <Image
                    src={design.imageUrl}
                    alt={design.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#111827] shadow-md">New</span>
                </div>
                <CardContent className="space-y-3 p-6 text-[#111827] sm:p-7">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#6B7280]">{design.category}</p>
                  <h4 className="text-xl font-semibold text-[#111827]">{design.title}</h4>
                  <p className="text-small text-[#6B7280] line-clamp-2">{design.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-[#B8864A]">{formatCurrency(design.price)}</span>
                    <span className="inline-flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#111827] transition-colors group-hover:text-[#B8864A]">
                      View
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 text-sm text-[#6B7280]">
        <p className="text-small">Swipe left or right on mobile, or use the arrows to browse the latest 10 arrivals.</p>
        <div className="flex items-center gap-2">
          {slides.map((_, slideIndex) => (
            <button
              key={slideIndex}
              type="button"
              onClick={() => setIndex(slideIndex)}
              className={`h-2 rounded-full transition-all duration-300 ${slideIndex === index ? "w-8 bg-[#B8864A]" : "w-2 bg-[#D1D5DB] hover:w-4"}`}
              aria-label={`Go to arrival group ${slideIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

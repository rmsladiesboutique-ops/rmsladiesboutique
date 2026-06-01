import type { Metadata } from "next";
import { BookingForm } from "@/components/shared/booking-form";
import { Card, CardContent } from "@/components/ui/card";
import { getAvailability, getSettings } from "@/lib/services";

export const metadata: Metadata = {
  title: "Book Appointment | Atelier Noir for Women",
  description: "Book women's couture fittings and custom tailoring appointments for a premium female-only experience.",
};

export default async function BookPage() {
  const availability = await getAvailability();
  const settings = await getSettings();
  const homepage = settings?.homepageContent;
  const open = availability.rules.filter((r) => !r.isBlocked);
  const pageTitle = homepage?.bookPageTitle ?? "Book your women’s couture fitting";
  const pageDescription = homepage?.bookPageSubtitle ?? "Select an available slot, share your measurements, and describe your custom design preferences. Our atelier crafts every appointment for the modern woman.";

  return (
    <main className="mx-auto max-w-5xl px-4 py-14 md:px-8">
      <section className="glass-panel rounded-[2.5rem] border border-amber-200/20 p-6 md:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.28em] text-foreground/55">Appointments</p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{pageTitle}</h1>
            <p className="max-w-2xl text-base leading-8 text-foreground/72">
              {pageDescription}
            </p>
            <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-[0_25px_70px_-48px_rgba(209,155,84,0.6)] backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-700/90">Booking status</p>
              <p className="text-sm text-foreground/70">Open slots are updated in real time. Holiday mode pauses bookings automatically.</p>
            </div>
          </div>

          <Card className="mt-0 border border-white/10 bg-white/10 shadow-[0_28px_90px_-46px_rgba(30,22,16,0.45)]">
            <CardContent className="space-y-6">
              {availability.holidayMode ? (
                <div className="rounded-[1.75rem] border border-amber-300/30 bg-amber-50/80 p-6 text-amber-800">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em]">Holiday mode active</p>
                  <p className="mt-2 text-sm">Booking is temporarily paused while the atelier rests and prepares the next collection.</p>
                </div>
              ) : (
                <BookingForm
                  availableDates={open.map((o) => o.date)}
                  availableSlots={Array.from(new Set(open.flatMap((o) => o.slots)))}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { BookingForm } from "@/components/shared/booking-form";
import { Card, CardContent } from "@/components/ui/card";
import { getAvailability, getSettings } from "@/lib/services";

export const metadata: Metadata = {
  title: "Book Appointment | RMS Ladies Boutique",
  description: "Book women's couture fittings and custom tailoring appointments for a premium female-only experience.",
};

export default async function BookPage() {
  const availability = await getAvailability();
  const settings = await getSettings();
  const homepage = settings?.homepageContent;
  const open = availability.rules.filter((r) => !r.isBlocked && r.slots.length > 0);
  const availableDateSlots = open.reduce<Record<string, string[]>>((acc, rule) => {
    acc[rule.date] = rule.slots;
    return acc;
  }, {});
  const pageTitle = homepage?.bookPageTitle ?? "Book your women’s couture fitting";
  const pageDescription = homepage?.bookPageSubtitle ?? "Select an available slot, share your measurements, and describe your custom design preferences. Our atelier crafts every appointment for the modern woman.";

  return (
    <main className="mx-auto max-w-6xl px-4 py-14 md:px-8">
      <section className="glass-panel rounded-[2.5rem] border border-amber-200/20 p-6 md:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_minmax(320px,420px)]">
          <div className="space-y-6">
            <p className="section-label">Appointments</p>
            <h1 className="text-4xl font-bold tracking-tight text-[#1F2937] md:text-5xl">{pageTitle}</h1>
            <p className="max-w-2xl text-base leading-8 text-[#6B7280]">
              {pageDescription}
            </p>
            <div className="grid gap-4 rounded-[2rem] border border-[#111827]/8 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#B8864A]">Booking status</p>
              <p className="text-sm leading-7 text-[#6B7280]">Open slots reflect the latest studio schedule. Holiday mode pauses booking automatically until the atelier reopens.</p>
              {availability.holidayMode ? (
                <p className="text-sm text-[#6B7280]">For holiday requests, contact {settings?.contactEmail ?? "the studio"}.</p>
              ) : null}
            </div>
            {!availability.holidayMode && open.length > 0 ? (
              <div className="rounded-[2rem] border border-[#111827]/8 bg-[#FAF7F2] p-5 text-sm">
                <p className="font-semibold text-[#1F2937]">Next available dates</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[#6B7280]">
                  {open.slice(0, 6).map((slot) => (
                    <span key={slot.date} className="rounded-full border border-[#111827]/10 bg-white px-3 py-2 text-[#1F2937]">{slot.date}</span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <Card className="mt-0 border border-[#111827]/8 bg-white shadow-sm">
            <CardContent className="space-y-6">
              {availability.holidayMode ? (
                <div className="rounded-[1.75rem] border border-amber-300/30 bg-amber-50/80 p-6 text-amber-800">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em]">Holiday mode active</p>
                  <p className="mt-2 text-sm">Booking is temporarily paused while the atelier rests and prepares the next collection.</p>
                    </div>
              ) : (
                <BookingForm
                  availableDates={open.map((o) => o.date)}
                  availableDateSlots={availableDateSlots}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

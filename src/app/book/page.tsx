import type { Metadata } from "next";
import { BookingForm } from "@/components/shared/booking-form";
import { Card, CardContent } from "@/components/ui/card";
import { getAvailability, getSettings } from "@/lib/services";

export const dynamic = "force-dynamic";

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
  const pageTitle = homepage?.bookPageTitle ?? "Book your women's couture fitting";
  const pageDescription = homepage?.bookPageSubtitle ?? "Select an available slot, share your measurements, and describe your custom design preferences. Our atelier crafts every appointment for the modern woman.";

  return (
    <main className="min-h-screen bg-[#FAF7F2] pt-28 pb-20">
      <div className="section-container">
        <section className="glass-panel rounded-[2rem] p-8 md:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_minmax(320px,440px)]">
            <div className="space-y-7">
              <div>
                <p className="section-label">Appointments</p>
                <h1 className="text-section-heading mt-3 text-[#111827]">{pageTitle}</h1>
                <div className="gold-line mt-5" />
              </div>
              <p className="max-w-xl text-body text-[#6B7280]">{pageDescription}</p>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#B8864A]">Booking status</p>
                <p className="mt-3 text-small text-[#6B7280]">
                  Open slots reflect the latest studio schedule. Holiday mode pauses booking automatically until the atelier reopens.
                </p>
                {availability.holidayMode ? (
                  <p className="mt-3 text-small text-[#6B7280]">
                    For holiday requests, contact {settings?.contactEmail ?? "the studio"}.
                  </p>
                ) : null}
              </div>

              {!availability.holidayMode && open.length > 0 ? (
                <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAF7F2] p-6">
                  <p className="text-sm font-semibold text-[#1F2937]">Next available dates</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {open.slice(0, 6).map((slot) => (
                      <span
                        key={slot.date}
                        className="rounded-full border border-[#B8864A]/20 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1F2937]"
                      >
                        {slot.date}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <Card className="border-[#E5E7EB]/80 bg-white">
              <CardContent className="space-y-6">
                {availability.holidayMode ? (
                  <div className="rounded-2xl border border-[#B8864A]/25 bg-[#FAF7F2] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#B8864A]">Holiday mode active</p>
                    <p className="mt-3 text-small text-[#6B7280]">
                      Booking is temporarily paused while the atelier rests and prepares the next collection.
                    </p>
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
      </div>
    </main>
  );
}

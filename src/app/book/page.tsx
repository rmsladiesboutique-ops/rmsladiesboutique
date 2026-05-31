import type { Metadata } from "next";
import { BookingForm } from "@/components/shared/booking-form";
import { Card, CardContent } from "@/components/ui/card";
import { getAvailability } from "@/lib/services";

export const metadata: Metadata = {
  title: "Book Appointment | Atelier Noir",
  description: "Book premium tailoring appointments and submit custom stitching requirements.",
};

export default async function BookPage() {
  const availability = await getAvailability();
  const open = availability.rules.filter((r) => !r.isBlocked);

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <h1 className="text-4xl font-semibold">Book an Appointment</h1>
      <p className="mt-3 text-zinc-400">Pick an available slot and share your measurements. Custom requests include full requirement capture.</p>

      <Card className="mt-8">
        <CardContent>
          {availability.holidayMode ? (
            <p className="text-sm text-amber-200">Holiday mode is active. Booking is temporarily paused.</p>
          ) : (
            <BookingForm
              availableDates={open.map((o) => o.date)}
              availableSlots={Array.from(new Set(open.flatMap((o) => o.slots)))}
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
}

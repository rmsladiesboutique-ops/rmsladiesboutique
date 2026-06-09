import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAppointmentById, getSettings } from "@/lib/services";

export const metadata: Metadata = {
  title: "Booking Confirmation | RMS Ladies Boutique",
  description: "Your appointment confirmation and booking code.",
};

export default async function ConfirmationPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const booking = await getAppointmentById(id);
  const settings = await getSettings();
  const homepage = settings?.homepageContent;
  const confirmationTitle = homepage?.confirmationTitle ?? "Booking Confirmed";
  const confirmationDescription = homepage?.confirmationDescription ?? "Your appointment was submitted successfully.";
  const successMessage = booking
    ? "Your appointment is confirmed. Our team will contact you shortly with the appointment details."
    : confirmationDescription;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <Card>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[#1F2937]">{confirmationTitle}</h1>
            <p className="text-lg leading-8 text-[#6B7280]">{successMessage}</p>
          </div>

          {booking ? (
            <>
              <div className="space-y-3 rounded-3xl border border-[#B8864A]/25 bg-[#FAF7F2] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#B8864A]">Appointment Submitted</p>
                <div className="rounded-2xl bg-[#111827] p-6 text-center text-white shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">Your 6-digit booking code</p>
                  <p className="mt-3 font-mono text-5xl font-bold tracking-[0.28em] text-[#B8864A]">{booking.customerCode}</p>
                  <p className="mt-3 text-sm text-white/80">Your team will contact you shortly with confirmation details.</p>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-[#111827]/10 bg-white p-5">
                <h2 className="text-lg font-bold text-[#1F2937]">Appointment Details</h2>
                <div className="space-y-2 text-[#1F2937]">
                  <p>
                    <span className="font-semibold text-[#6B7280]">Name:</span> {booking.customerName}
                  </p>
                  <p>
                    <span className="font-semibold text-[#6B7280]">Date & Time:</span> {booking.preferredDate} at {booking.preferredTime}
                  </p>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-[#111827]/10 bg-[#FAF7F2] p-5">
                <h2 className="text-lg font-bold text-[#1F2937]">What&apos;s Next?</h2>
                <p className="leading-relaxed text-[#1F2937]">
                  Thank you for booking with <span className="font-semibold text-[#B8864A]">RMS Ladies Boutique</span>! Our team will contact you shortly at <span className="font-semibold">{booking.phoneNumber}</span> to confirm your appointment details and discuss any specific requirements or preferences you may have.
                </p>
                <p className="pt-2 text-sm text-[#6B7280]">
                  Alternatively, you can check your appointment status anytime using your booking code on our Customer Dashboard.
                </p>
              </div>
            </>
          ) : (
            <p className="text-[#6B7280]">{confirmationDescription}</p>
          )}

          <div className="grid gap-3 pt-4 sm:grid-cols-2">
            <Link href="/dashboard" className="w-full">
              <Button className="w-full">Open Customer Dashboard</Button>
            </Link>
            <Link href="/" className="w-full">
              <Button variant="secondary" className="w-full">Return to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

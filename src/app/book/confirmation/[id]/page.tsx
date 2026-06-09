import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";
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
    <main className="min-h-screen bg-[#FAF7F2] pt-28 pb-20">
      <div className="section-container max-w-3xl">
        <Card>
          <CardContent className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#111827] text-[#D4AF37]">
                <CheckCircle className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <p className="section-label">Confirmation</p>
                <h1 className="text-section-heading text-[#111827]">{confirmationTitle}</h1>
                <p className="text-body text-[#6B7280]">{successMessage}</p>
              </div>
            </div>

            {booking ? (
              <>
                <div className="rounded-2xl border border-[#B8864A]/20 bg-[#FAF7F2] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#B8864A]">Appointment Submitted</p>
                  <div className="mt-4 rounded-2xl bg-[#111827] p-8 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Your 6-digit booking code</p>
                    <p className="mt-4 font-mono text-5xl font-bold tracking-[0.28em] text-[#D4AF37]">{booking.customerCode}</p>
                    <p className="mt-4 text-small text-white/70">Your team will contact you shortly with confirmation details.</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                  <h2 className="text-card-heading text-[#111827]">Appointment Details</h2>
                  <div className="luxury-divider my-4" />
                  <div className="space-y-3 text-[#1F2937]">
                    <p>
                      <span className="font-semibold text-[#6B7280]">Name:</span> {booking.customerName}
                    </p>
                    <p>
                      <span className="font-semibold text-[#6B7280]">Date & Time:</span> {booking.preferredDate} at {booking.preferredTime}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAF7F2] p-6">
                  <h2 className="text-card-heading text-[#111827]">What&apos;s Next?</h2>
                  <p className="mt-4 text-body text-[#6B7280]">
                    Thank you for booking with <span className="font-semibold text-[#B8864A]">RMS Ladies Boutique</span>! Our team will contact you shortly at <span className="font-semibold text-[#1F2937]">{booking.phoneNumber}</span> to confirm your appointment details and discuss any specific requirements or preferences you may have.
                  </p>
                  <p className="mt-4 text-small text-[#6B7280]">
                    Alternatively, you can check your appointment status anytime using your booking code on our Customer Dashboard.
                  </p>
                </div>
              </>
            ) : (
              <p className="text-body text-[#6B7280]">{confirmationDescription}</p>
            )}

            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              <Link href="/dashboard" className="w-full">
                <Button className="w-full">Open Customer Dashboard</Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="secondary" className="w-full">Return to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

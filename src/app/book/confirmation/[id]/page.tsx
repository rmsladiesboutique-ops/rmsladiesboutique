import Link from "next/link";
import type { Metadata } from "next";
import { mockAppointments } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSettings } from "@/lib/services";

export const metadata: Metadata = {
  title: "Booking Confirmation | Atelier Noir",
  description: "View your appointment confirmation and customer tracking code.",
};

export default async function ConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = mockAppointments.find((b) => b.id === id);
  const settings = await getSettings();
  const homepage = settings?.homepageContent;
  const confirmationTitle = homepage?.confirmationTitle ?? "Booking Confirmed";
  const confirmationDescription = homepage?.confirmationDescription ?? "Your appointment was submitted successfully.";

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <Card>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold text-amber-300">{confirmationTitle}</h1>
            <p className="text-lg text-zinc-300">{confirmationDescription}</p>
          </div>

          {booking ? (
            <>
              <div className="space-y-3 rounded-lg border border-amber-300/20 bg-amber-300/5 p-4">
                <h2 className="text-lg font-semibold text-zinc-100">Appointment Details</h2>
                <div className="space-y-2">
                  <p className="text-zinc-300">
                    <span className="text-zinc-400">Name:</span> {booking.customerName}
                  </p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-400">Date & Time:</span> {booking.preferredDate} at {booking.preferredTime}
                  </p>
                </div>
              </div>

              <div className="space-y-3 rounded-lg border border-emerald-300/20 bg-emerald-300/5 p-4">
                <h2 className="text-lg font-semibold text-zinc-100">Your Unique Booking Code</h2>
                <p className="text-center text-5xl font-bold tracking-widest text-amber-300 font-mono">
                  {booking.customerCode}
                </p>
                <p className="text-center text-sm text-zinc-400">Keep this code safe - you'll need it to track your appointment</p>
              </div>

              <div className="space-y-3 rounded-lg border border-blue-300/20 bg-blue-300/5 p-4">
                <h2 className="text-lg font-semibold text-zinc-100">What's Next?</h2>
                <p className="text-zinc-300 leading-relaxed">
                  Thank you for booking with <span className="font-semibold text-amber-300">RMS Ladies Boutique</span>! Our team will contact you shortly at <span className="font-semibold text-zinc-200">{booking.phoneNumber}</span> to confirm your appointment details and discuss any specific requirements or preferences you may have.
                </p>
                <p className="text-sm text-zinc-400 pt-2">
                  Alternatively, you can check your appointment status anytime using your booking code on our Customer Dashboard.
                </p>
              </div>
            </>
          ) : (
            <p className="text-zinc-300">{confirmationDescription}</p>
          )}

          <div className="pt-4 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full">Open Customer Dashboard</Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">Return to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

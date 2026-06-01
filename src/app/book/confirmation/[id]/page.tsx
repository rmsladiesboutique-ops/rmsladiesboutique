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
        <CardContent className="space-y-3">
          <h1 className="text-3xl font-semibold text-amber-300">{confirmationTitle}</h1>
          {booking ? (
            <>
              <p className="text-zinc-300">Name: {booking.customerName}</p>
              <p className="text-zinc-300">Date & time: {booking.preferredDate} at {booking.preferredTime}</p>
              <p className="text-zinc-100">Your 6-digit code: <span className="font-semibold text-amber-300">{booking.customerCode}</span></p>
            </>
          ) : (
            <p className="text-zinc-300">{confirmationDescription}</p>
          )}
          <div className="pt-4">
            <Link href="/dashboard"><Button>Open Customer Dashboard</Button></Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

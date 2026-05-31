import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackingPanel } from "@/components/shared/tracking-panel";
import { findAppointmentByCode } from "@/lib/services";

export const metadata: Metadata = {
  title: "Status Tracking | Atelier Noir",
  description: "Visual timeline of your tailoring journey from appointment to pickup.",
};

export default async function TrackingPage({ params }: { params: Promise<{ customerCode: string }> }) {
  const { customerCode } = await params;
  const record = await findAppointmentByCode(customerCode);
  if (!record) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <h1 className="text-4xl font-semibold">Status Tracking</h1>
      <p className="mt-3 text-zinc-400">Customer code: {record.customerCode}</p>
      <TrackingPanel initial={record} />
    </main>
  );
}

import type { Metadata } from "next";
import { CustomerLookup } from "@/components/shared/customer-lookup";

export const metadata: Metadata = {
  title: "Customer Dashboard | Atelier Noir",
  description: "Track tailoring appointments and progress using phone number and customer code.",
};

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <h1 className="text-4xl font-semibold">Customer Dashboard</h1>
      <p className="mt-3 text-zinc-400">Use your phone number and 6-digit code to view order status, notes, timeline, QR code, and invoice.</p>
      <div className="mt-8">
        <CustomerLookup />
      </div>
    </main>
  );
}

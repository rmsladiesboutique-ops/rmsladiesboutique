import type { Metadata } from "next";
import { CustomerLookup } from "@/components/shared/customer-lookup";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Customer Dashboard | Atelier Noir",
  description: "Track tailoring appointments and progress using phone number and customer code.",
};

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 md:px-8">
      <section className="glass-panel rounded-[2.5rem] border border-amber-200/20 p-6 md:p-8 lg:p-10">
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-foreground/55">Customer Portal</p>
              <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Customer Dashboard</h1>
            </div>
            <Badge className="px-4 py-2">Secure tracking</Badge>
          </div>
          <p className="max-w-2xl text-base leading-8 text-foreground/72">
            Enter your phone number and 6-digit code to view current order status, styling notes, timeline updates, and your garment’s progress.
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-black/5 p-6 shadow-[0_30px_90px_-58px_rgba(37,25,15,0.5)]">
          <CustomerLookup />
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { CustomerLookup } from "@/components/shared/customer-lookup";
import { Badge } from "@/components/ui/badge";
import { getSettings } from "@/lib/services";

export const metadata: Metadata = {
  title: "Customer Dashboard | RMS LADIES BOUTIQUE",
  description: "Track tailoring appointments and progress using phone number and customer code.",
};

export default async function DashboardPage() {
  const settings = await getSettings();
  const homepage = settings?.homepageContent;
  const pageTitle = homepage?.dashboardTitle ?? "Customer Dashboard";
  const pageDescription = homepage?.dashboardSubtitle ?? "Enter your phone number and 6-digit code to view current order status, styling notes, timeline updates, and your garment’s progress.";
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 md:px-8">
      <section className="glass-panel rounded-[2.5rem] border border-amber-200/20 p-6 md:p-8 lg:p-10">
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label">Customer Portal</p>
              <h1 className="mt-2 text-4xl font-bold text-[#1F2937] md:text-5xl">{pageTitle}</h1>
            </div>
            <Badge className="px-4 py-2">Secure tracking</Badge>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[#6B7280]">
            {pageDescription}
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-[#111827]/8 bg-white p-6 shadow-sm">
          <CustomerLookup />
        </div>
      </section>
    </main>
  );
}

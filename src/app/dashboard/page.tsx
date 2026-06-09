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
  const pageDescription = homepage?.dashboardSubtitle ?? "Enter your phone number and 6-digit code to view current order status, styling notes, timeline updates, and your garment's progress.";

  return (
    <main className="min-h-screen bg-[#FAF7F2] pt-28 pb-20">
      <div className="section-container max-w-5xl">
        <section className="glass-panel rounded-[2rem] p-8 md:p-10 lg:p-12">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-label">Customer Portal</p>
                <h1 className="text-section-heading mt-3 text-[#111827]">{pageTitle}</h1>
                <div className="gold-line mt-5" />
              </div>
              <Badge className="fashion-chip px-5 py-2">Secure tracking</Badge>
            </div>
            <p className="max-w-2xl text-body text-[#6B7280]">{pageDescription}</p>
          </div>

          <div className="mt-10 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <CustomerLookup />
          </div>
        </section>
      </div>
    </main>
  );
}

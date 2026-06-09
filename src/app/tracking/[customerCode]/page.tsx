import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackingPanel } from "@/components/shared/tracking-panel";
import { findAppointmentByCode, getSettings } from "@/lib/services";

export const metadata: Metadata = {
  title: "Status Tracking | RMS LADIES BOUTIQUE",
  description: "Visual timeline of your tailoring journey from appointment to pickup.",
};

export default async function TrackingPage({ params }: { params: Promise<{ customerCode: string }> }) {
  const { customerCode } = await params;
  const record = await findAppointmentByCode(customerCode);
  if (!record) notFound();
  const settings = await getSettings();
  const homepage = settings?.homepageContent;
  const pageTitle = homepage?.trackingPageTitle ?? "Status Tracking";
  const pageSubtitle = homepage?.trackingPageSubtitle ?? "Track your bespoke order from appointment through production and pickup with a clear, hand-finished status timeline.";

  return (
    <main className="min-h-screen bg-[#FAF7F2] pt-28 pb-20">
      <div className="section-container max-w-4xl">
        <div className="glass-panel rounded-[2rem] p-8 md:p-10 lg:p-12">
          <div className="grid gap-8">
            <div className="space-y-4">
              <p className="section-label">Live Journey</p>
              <h1 className="text-section-heading text-[#111827]">{pageTitle}</h1>
              <div className="gold-line" />
              <p className="max-w-2xl text-body text-[#6B7280]">{pageSubtitle}</p>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#B8864A]">Customer code</p>
                  <p className="mt-2 text-2xl font-bold text-[#1F2937]">{record.customerCode}</p>
                </div>
                <p className="rounded-full border border-[#B8864A]/20 bg-[#FAF7F2] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1F2937]">
                  {record.status}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAF7F2] p-6">
              <TrackingPanel initial={record} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/dashboard"
                className="rounded-2xl bg-[#111827] px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#1F2937]"
              >
                Visit Customer Dashboard
              </Link>
              <Link
                href="/status"
                className="rounded-2xl border border-[#B8864A]/30 bg-white px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#1F2937] transition hover:border-[#B8864A]/50 hover:bg-[#FAF7F2]"
              >
                Lookup another status code
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

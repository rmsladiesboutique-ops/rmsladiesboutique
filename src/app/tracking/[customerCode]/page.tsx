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
    <main className="mx-auto max-w-4xl px-4 py-14 md:px-8">
      <div className="glass-panel rounded-[2.5rem] border border-amber-200/20 p-6 md:p-8 lg:p-10">
        <div className="grid gap-8">
          <div className="space-y-4">
            <p className="section-label">Live Journey</p>
            <h1 className="text-4xl font-bold text-[#1F2937] md:text-5xl">{pageTitle}</h1>
            <p className="max-w-2xl text-base leading-8 text-[#6B7280]">
              {pageSubtitle}
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#111827]/8 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#B8864A]">Customer code</p>
                <p className="mt-2 text-2xl font-bold text-[#1F2937]">{record.customerCode}</p>
              </div>
              <p className="rounded-full border border-[#111827]/10 bg-[#FAF7F2] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#1F2937]">{record.status}</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#111827]/8 bg-[#FAF7F2] p-6">
            <TrackingPanel initial={record} />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/dashboard" className="rounded-[1.75rem] border border-[#111827]/10 bg-[#111827] px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#1F2937]">
              Visit Customer Dashboard
            </Link>
            <Link href="/status" className="rounded-[1.75rem] border border-[#B8864A]/40 bg-[#FAF7F2] px-5 py-4 text-center text-sm font-semibold text-[#1F2937] transition hover:bg-white">
              Lookup another status code
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

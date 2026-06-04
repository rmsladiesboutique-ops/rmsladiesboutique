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
            <p className="text-sm uppercase tracking-[0.28em] text-foreground/55">Live Journey</p>
            <h1 className="text-4xl font-semibold md:text-5xl">{pageTitle}</h1>
            <p className="max-w-2xl text-base leading-8 text-foreground/72">
              {pageSubtitle}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/5 p-6 shadow-[0_28px_90px_-48px_rgba(37,25,15,0.5)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-amber-700/90">Customer code</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{record.customerCode}</p>
              </div>
              <p className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.22em] text-foreground/70">{record.status}</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-[0_26px_85px_-52px_rgba(209,155,84,0.3)]">
            <TrackingPanel initial={record} />
          </div>
        </div>
      </div>
    </main>
  );
}

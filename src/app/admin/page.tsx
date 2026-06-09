export const dynamic = "force-dynamic";

import Link from "next/link";
import type { Metadata } from "next";
import { format } from "date-fns";
import { ArrowRight, CalendarCheck2, ClipboardList, PackageOpen, TrendingUp } from "lucide-react";
import { getAppointments } from "@/lib/services";
import { STATUS_STAGES } from "@/types/domain";

export const metadata: Metadata = {
  title: "Admin Dashboard | RMS LADIES BOUTIQUE",
  description: "Manage appointments, statuses, designs, and availability.",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const appointments = await getAppointments();
  const total = appointments.length;

  const isCompletedOrder = (appointment: (typeof appointments)[number]) => {
    const completionPercent = appointment.completionPercent ?? 0;
    const statusIndex = appointment.statusIndex ?? 0;

    return completionPercent >= 100 || statusIndex >= STATUS_STAGES.length || /completed|delivered|ready for pickup/i.test(appointment.status ?? "");
  };

  const pending = appointments.filter((appointment) => !isCompletedOrder(appointment)).length;
  const completed = appointments.filter((appointment) => isCompletedOrder(appointment)).length;
  const today = format(new Date(), "yyyy-MM-dd");
  const todayBookings = appointments.filter((a) => a.preferredDate === today).length;

  const stats = [
    { label: "Total Appointments", value: total, icon: ClipboardList, color: "text-[#B8864A]" },
    { label: "Pending Orders", value: pending, icon: TrendingUp, color: "text-amber-600" },
    { label: "Completed Orders", value: completed, icon: PackageOpen, color: "text-emerald-600" },
    { label: "Bookings Today", value: todayBookings, icon: CalendarCheck2, color: "text-[#111827]" },
  ];

  const quickLinks = [
    { href: "/admin/appointments", label: "Appointments", desc: "Manage bookings & status" },
    { href: "/admin/designs", label: "Designs", desc: "Catalog & uploads" },
    { href: "/admin/availability", label: "Availability", desc: "Slots & holiday mode" },
    { href: "/admin/measurements", label: "Measurements", desc: "Field configuration" },
  ];

  return (
    <div className="admin-page">
      <div className="admin-panel">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <p className="section-label">Control Center</p>
            <h1 className="text-section-heading text-[#111827]">Admin Dashboard</h1>
            <div className="gold-line" />
            <p className="max-w-xl text-body text-[#6B7280]">
              Monitor bookings, update status stages, manage availability, and keep production aligned from one workspace.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAF7F2] px-5 py-4 text-sm text-[#6B7280]">
            <span className="font-semibold text-[#111827]">{format(new Date(), "EEEE, MMMM d")}</span>
            <span className="mx-2 text-[#E5E7EB]">|</span>
            {total} total appointments
          </div>
        </div>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="admin-stat-card">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">{item.label}</p>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <p className={`mt-4 text-4xl font-bold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="text-card-heading text-[#111827]">Quick Actions</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-[#FAF7F2] p-5 transition-all hover:border-[#B8864A]/30 hover:shadow-[0_12px_40px_-16px_rgba(17,24,39,0.12)]"
              >
                <div>
                  <p className="font-semibold text-[#111827]">{link.label}</p>
                  <p className="mt-1 text-small text-[#6B7280]">{link.desc}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#B8864A] transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

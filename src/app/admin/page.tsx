import Link from "next/link";
import type { Metadata } from "next";
import { format } from "date-fns";
import { ArrowRight, CalendarCheck2, ClipboardList, PackageOpen, TrendingUp } from "lucide-react";
import { getAppointments } from "@/lib/services";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { STATUS_STAGES } from "@/types/domain";

export const metadata: Metadata = {
  title: "Admin Dashboard | Atelier Noir",
  description: "Manage appointments, statuses, designs, and availability.",
};

export default async function AdminPage() {
  const appointments = await getAppointments();
  const total = appointments.length;
  const pending = appointments.filter((a) => a.statusIndex < STATUS_STAGES.length).length;
  const completed = appointments.filter((a) => a.statusIndex >= STATUS_STAGES.length).length;
  const today = format(new Date(), "yyyy-MM-dd");
  const todayBookings = appointments.filter((a) => a.preferredDate === today).length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <section className="glass-panel overflow-hidden rounded-[2.5rem] border border-amber-200/20 p-6 md:p-8 lg:p-10">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-4">
            <Badge className="px-4 py-2">Control Center</Badge>
            <h1 className="text-4xl font-semibold md:text-5xl">Admin Dashboard</h1>
            <p className="max-w-2xl text-base leading-8 text-foreground/72">
              Monitor bookings, update status stages, manage availability, and keep production aligned from one polished workspace.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["/admin/appointments", "Appointments"],
              ["/admin/designs", "Designs"],
              ["/admin/availability", "Availability"],
            ].map(([href, label]) => (
              <Link
                key={label}
                href={href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/80 px-4 py-2 text-sm font-semibold text-foreground shadow-sm shadow-amber-200/20 transition hover:-translate-y-0.5 hover:bg-amber-50"
              >
                {label} <ArrowRight className="h-4 w-4 text-amber-700" />
              </Link>
            ))}
          </div>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            { label: "Total Appointments", value: total, icon: ClipboardList },
            { label: "Pending Orders", value: pending, icon: TrendingUp },
            { label: "Completed Orders", value: completed, icon: PackageOpen },
            { label: "Bookings Today", value: todayBookings, icon: CalendarCheck2 },
          ].map((item) => (
            <Card key={item.label} className="rounded-[1.75rem] border border-white/10 bg-black/5 shadow-[0_26px_70px_-52px_rgba(37,25,15,0.55)]">
              <CardContent>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm uppercase tracking-[0.24em] text-foreground/55">{item.label}</p>
                  <item.icon className="h-5 w-5 text-amber-700" />
                </div>
                <p className="mt-5 text-3xl font-semibold text-amber-600">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </section>

      </section>
    </main>
  );
}

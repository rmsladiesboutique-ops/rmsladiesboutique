import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CalendarCheck2, ClipboardList, PackageOpen, TrendingUp } from "lucide-react";
import { getAppointments } from "@/lib/services";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AdminAnalytics } from "@/components/shared/admin-analytics";

export const metadata: Metadata = {
  title: "Admin Dashboard | Atelier Noir",
  description: "Manage appointments, statuses, designs, and availability.",
};

export default async function AdminPage() {
  const appointments = await getAppointments();
  const total = appointments.length;
  const pending = appointments.filter((a) => a.statusIndex < 6).length;
  const completed = appointments.filter((a) => a.statusIndex === 6).length;
  const today = new Date().toISOString().slice(0, 10);
  const todayBookings = appointments.filter((a) => a.preferredDate === today).length;

  const chartData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => ({
    day,
    bookings: Math.max(1, Math.round((appointments.length / 7) * (i + 1) * 0.5)),
  }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <section className="glass-panel overflow-hidden rounded-[2rem] p-6 md:p-8 lg:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge>Control Center</Badge>
            <h1 className="text-4xl font-semibold md:text-5xl">Admin Dashboard</h1>
            <p className="max-w-2xl text-sm text-foreground/65 md:text-base">
              Monitor bookings, update status stages, manage availability, and keep production aligned from one polished workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/appointments" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-foreground shadow-sm dark:border-white/10 dark:bg-white/5">Appointments <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/admin/designs" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-foreground shadow-sm dark:border-white/10 dark:bg-white/5">Designs <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/admin/availability" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-foreground shadow-sm dark:border-white/10 dark:bg-white/5">Availability <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          {[{ label: "Total Appointments", value: total, icon: ClipboardList }, { label: "Pending Orders", value: pending, icon: TrendingUp }, { label: "Completed Orders", value: completed, icon: PackageOpen }, { label: "Bookings Today", value: todayBookings, icon: CalendarCheck2 }].map((item) => (
          <Card key={item.label}><CardContent><div className="flex items-center justify-between"><p className="text-sm text-foreground/55">{item.label}</p><item.icon className="h-4 w-4 text-amber-700 dark:text-amber-200" /></div><p className="mt-4 text-3xl font-semibold text-amber-600 dark:text-amber-300">{item.value}</p></CardContent></Card>
        ))}
        </section>

        <section className="mt-8">
          <Card>
            <CardContent>
              <h2 className="text-xl font-medium">Weekly Booking Analytics</h2>
              <AdminAnalytics data={chartData} />
            </CardContent>
          </Card>
        </section>
      </section>
    </main>
  );
}

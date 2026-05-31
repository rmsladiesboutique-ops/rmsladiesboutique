import Link from "next/link";
import type { Metadata } from "next";
import { getAppointments } from "@/lib/services";
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
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-semibold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/admin/appointments" className="text-sm text-amber-300 underline">Appointments</Link>
          <Link href="/admin/designs" className="text-sm text-amber-300 underline">Designs</Link>
          <Link href="/admin/availability" className="text-sm text-amber-300 underline">Availability</Link>
        </div>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        {[{ label: "Total Appointments", value: total }, { label: "Pending Orders", value: pending }, { label: "Completed Orders", value: completed }, { label: "Bookings Today", value: todayBookings }].map((item) => (
          <Card key={item.label}><CardContent><p className="text-sm text-zinc-400">{item.label}</p><p className="mt-2 text-3xl font-semibold text-amber-300">{item.value}</p></CardContent></Card>
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
    </main>
  );
}

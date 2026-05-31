import { NextResponse } from "next/server";
import { getAppointments } from "@/lib/services";
import { sendAppointmentReminder } from "@/lib/notifications";

export async function POST() {
  const appointments = await getAppointments();
  const pending = appointments.filter((a) => a.statusIndex < 6);

  await Promise.all(pending.map((a) => sendAppointmentReminder(a)));

  return NextResponse.json({ sent: pending.length });
}

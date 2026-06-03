import { NextResponse } from "next/server";
import { getAppointments } from "@/lib/services";
import { sendAppointmentReminder } from "@/lib/notifications";
import { STATUS_STAGES } from "@/types/domain";

export async function POST() {
  const appointments = await getAppointments();
  const pending = appointments.filter((a) => a.statusIndex < STATUS_STAGES.length);

  await Promise.all(pending.map((a) => sendAppointmentReminder(a)));

  return NextResponse.json({ sent: pending.length });
}

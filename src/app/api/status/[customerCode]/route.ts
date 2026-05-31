import { NextResponse } from "next/server";
import { mockAppointments } from "@/lib/mock-data";
import { findAppointmentByCode } from "@/lib/services";

export async function GET(_: Request, context: { params: Promise<{ customerCode: string }> }) {
  const { customerCode } = await context.params;
  const item = mockAppointments.find((a) => a.customerCode === customerCode) ?? null;

  if (item) return NextResponse.json(item);

  const fallback = await findAppointmentByCode(customerCode);
  if (!fallback) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(fallback);
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { findAppointment } from "@/lib/services";

const schema = z.object({
  phoneNumber: z.string().min(8),
  customerCode: z.string().length(6),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const appointment = await findAppointment(parsed.data.phoneNumber, parsed.data.customerCode);
  if (!appointment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(appointment);
}

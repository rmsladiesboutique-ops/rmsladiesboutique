import { NextResponse } from "next/server";
import { z } from "zod";
import { updateAppointmentStatus } from "@/lib/services";

const schema = z.object({
  id: z.string(),
  statusIndex: z.number().min(1).max(6),
  adminNotes: z.string().optional(),
});

export async function PATCH(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await updateAppointmentStatus(parsed.data.id, parsed.data.statusIndex, parsed.data.adminNotes);
  return NextResponse.json({ ok: true });
}

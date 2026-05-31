import { NextResponse } from "next/server";
import { z } from "zod";
import { updateAppointmentStatus } from "@/lib/services";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";

const schema = z.object({
  id: z.string(),
  status: z.string().min(1),
  statusIndex: z.number().min(1).max(6).optional(),
  adminNotes: z.string().optional(),
});

export async function PATCH(request: Request) {
  const sessionToken = request.headers.get("cookie")?.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!(await verifyAdminSessionToken(sessionToken))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await updateAppointmentStatus(parsed.data.id, parsed.data.status, parsed.data.adminNotes, parsed.data.statusIndex);
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { deleteAvailabilityRule, getAvailability, updateAvailability } from "@/lib/services";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";

async function requireAdmin(request: Request) {
  const sessionToken = request.headers.get("cookie")?.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!(await verifyAdminSessionToken(sessionToken))) {
    return null;
  }
  return true;
}

export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await getAvailability();
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const rules = Array.isArray(body.rules) ? body.rules : [];
  const holidayMode = Boolean(body.holidayMode);

  const data = await updateAvailability({ holidayMode, rules });
  if (!data) {
    return NextResponse.json({ error: "Unable to update availability" }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  let id = url.searchParams.get("id");

  if (!id) {
    try {
      const body = await request.json();
      id = body?.id;
    } catch {
      id = null;
    }
  }

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const deleted = await deleteAvailabilityRule(id);
  if (!deleted) {
    return NextResponse.json({ error: "Unable to delete availability rule" }, { status: 500 });
  }

  const availability = await getAvailability();
  return NextResponse.json({ ok: true, availability });
}

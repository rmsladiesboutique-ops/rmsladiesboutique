import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { cleanupUnuploadedDesigns } from "@/lib/services";

export async function POST(request: Request) {
  const sessionToken = request.headers.get("cookie")?.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!(await verifyAdminSessionToken(sessionToken))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deletedCount = await cleanupUnuploadedDesigns();
  return NextResponse.json({ ok: true, deletedCount });
}

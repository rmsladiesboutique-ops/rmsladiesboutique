import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/services";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const sessionToken = request.headers.get("cookie")?.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!(await verifyAdminSessionToken(sessionToken))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await getAvailability();
  return NextResponse.json(data);
}

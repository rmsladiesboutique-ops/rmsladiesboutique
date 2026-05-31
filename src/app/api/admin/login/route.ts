import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createAdminSessionToken, getAdminCookieOptions, verifyAdminCredentials } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { id?: string; password?: string } | null;
  const id = body?.id?.trim() ?? "";
  const password = body?.password ?? "";

  if (!(await verifyAdminCredentials(id, password))) {
    return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, await createAdminSessionToken(id), getAdminCookieOptions());

  return response;
}

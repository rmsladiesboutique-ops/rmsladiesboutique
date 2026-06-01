import { NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { getSettings, updateSettings } from "@/lib/services";

export async function GET(request: Request) {
  const sessionToken = request.headers.get("cookie")?.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!(await verifyAdminSessionToken(sessionToken))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await getSettings();
  return NextResponse.json(settings ?? {});
}

const patchSchema = z.object({
  siteTitle: z.string().optional(),
  phoneNumber: z.string().optional(),
  whatsappTemplate: z.string().optional(),
  logoUrl: z.string().optional(),
  homepageContent: z.any().optional(),
  statusStages: z.array(z.string()).optional(),
});

export async function PATCH(request: Request) {
  const sessionToken = request.headers.get("cookie")?.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!(await verifyAdminSessionToken(sessionToken))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const updated = await updateSettings(parsed.data);
  return NextResponse.json({ ok: true, updated });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { getMeasurementFields, upsertMeasurementField, deleteMeasurementField } from "@/lib/services";
import type { MeasurementField } from "@/types/domain";

export async function GET() {
  return NextResponse.json(await getMeasurementFields());
}

const schema = z.object({ id: z.string().optional(), key: z.string().optional(), label: z.string(), type: z.string(), required: z.boolean().optional(), options: z.array(z.string()).optional(), order: z.number().optional() });

export async function POST(request: Request) {
  const sessionToken = request.headers.get("cookie")?.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!(await verifyAdminSessionToken(sessionToken))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  const bodyData = parsed.data;
  const payload: Partial<MeasurementField> & { key?: string } = {
    key: bodyData.key,
    label: bodyData.label,
    type: bodyData.type as "text" | "number" | "select" | "textarea",
    required: bodyData.required ?? false,
    options: bodyData.options ?? [],
    order: bodyData.order ?? 100,
  };
  const res = await upsertMeasurementField(payload);
  return NextResponse.json(res);
}

export async function DELETE(request: Request) {
  const sessionToken = request.headers.get("cookie")?.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!(await verifyAdminSessionToken(sessionToken))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await deleteMeasurementField(id);
  return NextResponse.json({ ok: true });
}

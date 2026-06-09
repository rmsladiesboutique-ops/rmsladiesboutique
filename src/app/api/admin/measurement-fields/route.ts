import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/require-admin";
import { getMeasurementFields, upsertMeasurementField, deleteMeasurementField } from "@/lib/services";
import type { MeasurementField } from "@/types/domain";

export async function GET(request: Request) {
  const auth = await requireAdminSession(request);
  if (!auth.authorized) {
    return auth.response;
  }
  return NextResponse.json(await getMeasurementFields());
}

const schema = z.object({ id: z.string().optional(), key: z.string().optional(), label: z.string(), type: z.string(), required: z.boolean().optional(), options: z.array(z.string()).optional(), order: z.number().optional() });

export async function POST(request: Request) {
  const auth = await requireAdminSession(request);
  if (!auth.authorized) return auth.response;
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
  const auth = await requireAdminSession(request);
  if (!auth.authorized) return auth.response;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await deleteMeasurementField(id);
  return NextResponse.json({ ok: true });
}

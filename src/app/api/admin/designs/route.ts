import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";

const schema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  imageUrl: z.string().url(),
  available: z.boolean(),
  isFeatured: z.boolean().optional(),
});

export async function GET(request: Request) {
  const sessionToken = request.headers.get("cookie")?.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!(await verifyAdminSessionToken(sessionToken))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceRoleClient();
  if (!supabase) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase.from("designs").select("*").order("created_at", { ascending: false });
  if (error || !data) {
    return NextResponse.json([]);
  }

  return NextResponse.json(
    data.map((design) => ({
      id: design.id,
      title: design.title,
      category: design.category,
      description: design.description,
      price: design.price,
      imageUrl: design.image_url,
      available: design.available,
      isFeatured: design.is_featured ?? false,
    })),
  );
}

export async function POST(request: Request) {
  const sessionToken = request.headers.get("cookie")?.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!(await verifyAdminSessionToken(sessionToken))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase client unavailable" }, { status: 500 });
  }

  const { data, error } = await supabase.from("designs").insert({
    title: parsed.data.title,
    category: parsed.data.category,
    description: parsed.data.description,
    price: parsed.data.price,
    image_url: parsed.data.imageUrl,
    available: parsed.data.available,
    is_featured: parsed.data.isFeatured ?? false,
  }).select().single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Unable to store design" }, { status: 500 });
  }

  return NextResponse.json({ design: {
    id: data.id,
    title: data.title,
    category: data.category,
    description: data.description,
    price: data.price,
    imageUrl: data.image_url,
    available: data.available,
    isFeatured: data.is_featured ?? false,
  }});
}

export async function PATCH(request: Request) {
  const sessionToken = request.headers.get("cookie")?.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!(await verifyAdminSessionToken(sessionToken))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const id = body.id as string | undefined;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  if (supabase) {
    await supabase
      .from("designs")
      .update({
        title: body.title,
        category: body.category,
        description: body.description,
        price: body.price,
        image_url: body.imageUrl,
        available: body.available,
        is_featured: body.isFeatured,
      })
      .eq("id", id);
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const sessionToken = request.headers.get("cookie")?.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))?.[1];
  if (!(await verifyAdminSessionToken(sessionToken))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  if (supabase) {
    await supabase.from("designs").delete().eq("id", id);
  }

  return NextResponse.json({ ok: true });
}

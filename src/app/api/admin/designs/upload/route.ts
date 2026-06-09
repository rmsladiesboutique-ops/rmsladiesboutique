import { NextResponse } from "next/server";
import { createServiceRoleClient, getSupabaseAdminConfigError } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/require-admin";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function sanitizeFilename(name: string) {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/\.+/g, ".");
  const ext = base.slice(base.lastIndexOf(".")).toLowerCase();
  const stem = base.slice(0, base.lastIndexOf(".")).slice(0, 80) || "upload";
  return `${stem}${ALLOWED_EXTENSIONS.has(ext) ? ext : ".jpg"}`;
}

export async function POST(request: Request) {
  const auth = await requireAdminSession(request);
  if (!auth.authorized) {
    return auth.response;
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File exceeds 5 MB limit" }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Only JPEG, PNG, WebP, and GIF images are allowed" }, { status: 400 });
  }

  const safeName = sanitizeFilename(file.name);
  const ext = safeName.slice(safeName.lastIndexOf(".")).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json({ error: "Invalid file extension" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: getSupabaseAdminConfigError() ?? "Supabase client unavailable" }, { status: 500 });
  }

  const path = `designs/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from("design-catalog").upload(path, file, {
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from("design-catalog").getPublicUrl(path);
  return NextResponse.json({ publicUrl: data.publicUrl });
}

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export function getSupabaseAdminConfigError() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

  const missing: string[] = [];
  if (!url) missing.push("SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceKey) missing.push("SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY");

  return missing.length > 0
    ? `Supabase client unavailable: missing ${missing.join(" and ")} in the deployment environment.`
    : null;
}

export function createServiceRoleClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceKey && process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
      "[supabase/admin] Using NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY for server writes. Set SUPABASE_SERVICE_ROLE_KEY in Vercel for production.",
    );
  }

  if (!url || !serviceKey) {
    const message = getSupabaseAdminConfigError();
    console.error(message ?? "Supabase admin client not initialized.");
    return null;
  }

  return createClient<Database>(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

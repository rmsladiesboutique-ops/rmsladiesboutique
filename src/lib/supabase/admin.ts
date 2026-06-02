import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export function createServiceRoleClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  let serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Fallbacks: sometimes environment keys are named differently in local setups.
  if (!serviceKey) {
    serviceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  }

  if (!url || !serviceKey) {
    console.error(
      "Supabase admin client not initialized: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY for fallback) in your environment",
    );
    return null;
  }

  return createClient<Database>(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

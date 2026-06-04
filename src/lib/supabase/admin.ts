import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export function createServiceRoleClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  let serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Fallback to the public service role env name only. Never use an anon key for admin operations.
  if (!serviceKey) {
    serviceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
  }

  if (!url || !serviceKey) {
    console.error(
      "Supabase admin client not initialized: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) in your environment",
    );
    return null;
  }

  return createClient<Database>(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export function createServiceRoleClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceKey && process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
      "[supabase/admin] Using NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY for server writes. Set SUPABASE_SERVICE_ROLE_KEY in Vercel for production.",
    );
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

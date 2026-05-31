import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();

  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      redirect("/admin/login");
    }
  }

  return <>{children}</>;
}

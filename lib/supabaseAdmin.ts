import { createClient } from "@supabase/supabase-js";

// cliente admin: NO se usa en el cliente, solo en el servidor
export function createSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!; // ⚠️ nunca exponer

  if (!url) throw new Error("Falta NEXT_PUBLIC_SUPABASE_URL");
  if (!key) throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY");

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

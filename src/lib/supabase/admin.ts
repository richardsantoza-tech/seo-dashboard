import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client with service role key.
 * Bypasses RLS — use ONLY in API route handlers for pipeline writes.
 * NEVER import this in client components.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase admin credentials not set");
  return createClient(url, key);
}

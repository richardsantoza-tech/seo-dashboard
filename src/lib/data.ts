import { getSupabaseBrowserClient } from "./supabase/client";
import type { Audit, Recommendation } from "./types";

/**
 * Fetches a single audit by ID.
 */
export async function getAudit(id: string): Promise<Audit> {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data as Audit;
}

/**
 * Fetches all recommendations for an audit, ordered by priority then created_at.
 */
export async function getRecommendations(
  auditId: string
): Promise<Recommendation[]> {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("audit_id", auditId)
    .order("priority", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as Recommendation[];
}

/**
 * Fetches a single recommendation by ID.
 */
export async function getRecommendation(id: string): Promise<Recommendation> {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data as Recommendation;
}

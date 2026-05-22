import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  // Auth check: verify the user is logged in
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const rawUrl: string = body.url;
  if (!rawUrl) {
    return Response.json({ error: "URL is required" }, { status: 400 });
  }

  let domain: string;
  try {
    domain = new URL(
      rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`
    ).hostname.replace(/^www\./, "");
  } catch {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  // Use admin client for DB writes (bypasses RLS)
  const admin = getSupabaseAdmin();

  const { data: existingSite } = await admin
    .from("sites")
    .select("id")
    .eq("user_id", user.id)
    .eq("domain", domain)
    .single();

  let siteId: string;
  if (existingSite) {
    siteId = existingSite.id;
  } else {
    const { data: newSite, error: siteError } = await admin
      .from("sites")
      .insert({ user_id: user.id, domain })
      .select("id")
      .single();
    if (siteError || !newSite) {
      return Response.json(
        { error: siteError?.message ?? "Failed to create site" },
        { status: 500 }
      );
    }
    siteId = newSite.id;
  }

  const { data: audit, error: auditError } = await admin
    .from("audits")
    .insert({
      site_id: siteId,
      status: "pending",
      type: "full",
    })
    .select("id")
    .single();

  if (auditError || !audit) {
    return Response.json(
      { error: auditError?.message ?? "Failed to create audit" },
      { status: 500 }
    );
  }

  return Response.json({ auditId: audit.id });
}

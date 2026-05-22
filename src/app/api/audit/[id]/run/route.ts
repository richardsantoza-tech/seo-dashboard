import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  fetchTechnicalData,
  fetchSeoData,
  fetchGeoData,
} from "@/lib/dataforseo";
import { interpretAuditData } from "@/lib/llm/interpret";

export async function POST(
  _req: Request,
  ctx: RouteContext<"/api/audit/[id]/run">
) {
  const { id } = await ctx.params;

  // Auth check: verify the user is logged in
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Use admin client for pipeline reads/writes (bypasses RLS)
  const admin = getSupabaseAdmin();

  const { data: audit } = await admin
    .from("audits")
    .select("id, status, site_id")
    .eq("id", id)
    .single();

  if (!audit) {
    return Response.json({ error: "Audit not found" }, { status: 404 });
  }

  if (audit.status !== "pending") {
    return Response.json({ error: "Audit already started" }, { status: 409 });
  }

  const { data: site } = await admin
    .from("sites")
    .select("domain")
    .eq("id", audit.site_id)
    .single();

  if (!site) {
    return Response.json({ error: "Site not found" }, { status: 404 });
  }

  await admin.from("audits").update({ status: "running" }).eq("id", id);

  try {
    const url = `https://${site.domain}`;
    const [technical, seo, geo] = await Promise.all([
      fetchTechnicalData(url),
      fetchSeoData(site.domain),
      fetchGeoData(site.domain),
    ]);

    await admin.from("audit_results").insert([
      { audit_id: id, category: "technical", raw_data: technical },
      { audit_id: id, category: "seo", raw_data: seo },
      { audit_id: id, category: "geo", raw_data: geo },
    ]);

    const interpretation = await interpretAuditData({
      technical,
      seo,
      geo,
      url,
    });

    if (interpretation.recommendations.length > 0) {
      await admin.from("recommendations").insert(
        interpretation.recommendations.map((rec) => ({
          audit_id: id,
          category: rec.category,
          title: rec.title,
          description: rec.description,
          plain_english_text: rec.plain_english_text,
          technical_text: rec.technical_text,
          priority: rec.priority,
        }))
      );
    }

    await admin
      .from("audits")
      .update({
        status: "completed",
        score: interpretation.score,
        completed_at: new Date().toISOString(),
      })
      .eq("id", id);

    return Response.json({ status: "completed" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await admin
      .from("audits")
      .update({ status: "failed", error_message: message })
      .eq("id", id);

    return Response.json({ error: message }, { status: 500 });
  }
}

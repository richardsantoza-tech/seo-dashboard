import { dataforseoPost } from "./client";

export interface SeoData {
  rankedKeywords: unknown;
  domainOverview: unknown;
  backlinksSummary: unknown;
}

export async function fetchSeoData(domain: string): Promise<SeoData> {
  const [keywords, overview, backlinks] = await Promise.allSettled([
    dataforseoPost<{ tasks: { result: unknown[] }[] }>(
      "/v3/dataforseo_labs/google/ranked_keywords/live",
      [{ target: domain, language_code: "en", location_code: 2840, limit: 20 }]
    ).then((r) => r.tasks?.[0]?.result?.[0] ?? null),

    dataforseoPost<{ tasks: { result: unknown[] }[] }>(
      "/v3/dataforseo_labs/google/domain_rank_overview/live",
      [{ target: domain, language_code: "en", location_code: 2840 }]
    ).then((r) => r.tasks?.[0]?.result?.[0] ?? null),

    dataforseoPost<{ tasks: { result: unknown[] }[] }>(
      "/v3/backlinks/summary/live",
      [{ target: domain }]
    ).then((r) => r.tasks?.[0]?.result?.[0] ?? null),
  ]);

  return {
    rankedKeywords:
      keywords.status === "fulfilled" ? keywords.value : null,
    domainOverview:
      overview.status === "fulfilled" ? overview.value : null,
    backlinksSummary:
      backlinks.status === "fulfilled" ? backlinks.value : null,
  };
}

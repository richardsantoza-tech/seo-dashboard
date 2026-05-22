import { dataforseoPost } from "./client";

export interface LighthouseResult {
  categories: Record<string, { score: number }>;
  audits: Record<
    string,
    {
      id: string;
      title: string;
      score: number | null;
      numericValue?: number;
      displayValue?: string;
    }
  >;
}

interface LighthouseResponse {
  tasks: {
    status_code: number;
    result: LighthouseResult[];
  }[];
}

export async function fetchTechnicalData(
  url: string
): Promise<LighthouseResult> {
  const res = await dataforseoPost<LighthouseResponse>(
    "/v3/on_page/lighthouse/live/json",
    [{ url, for_mobile: true, categories: ["performance", "seo", "accessibility"] }]
  );

  const task = res.tasks?.[0];
  if (task?.status_code !== 20000) {
    throw new Error(`Lighthouse task failed: ${task?.status_code}`);
  }

  const result = task?.result?.[0];
  if (!result?.categories || !result?.audits) {
    throw new Error("No Lighthouse data returned");
  }
  return result;
}

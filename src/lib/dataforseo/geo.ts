import { dataforseoPost } from "./client";

export interface GeoData {
  mentions: GeoMention[];
}

export interface GeoMention {
  platform: string;
  model_name: string;
  question: string;
  answer: string | null;
}

interface GeoResponse {
  tasks: {
    status_code: number;
    result: {
      items: {
        platform: string;
        model_name: string;
        question: string;
        answer: string | null;
      }[];
    }[];
  }[];
}

export async function fetchGeoData(domain: string): Promise<GeoData> {
  const res = await dataforseoPost<GeoResponse>(
    "/v3/ai_optimization/llm_mentions/search/live",
    [{ target: [{ domain }], location_code: 2840, language_code: "en" }]
  );

  const items = res.tasks?.[0]?.result?.[0]?.items ?? [];
  return {
    mentions: items.map((item) => ({
      platform: item.platform,
      model_name: item.model_name,
      question: item.question,
      answer: item.answer,
    })),
  };
}

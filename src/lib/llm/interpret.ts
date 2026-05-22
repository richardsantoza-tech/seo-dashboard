import { chatCompletion } from "./client";
import {
  INTERPRETATION_SYSTEM_PROMPT,
  buildInterpretationPrompt,
} from "./prompts";

interface LLMRecommendation {
  category: string;
  title: string;
  description: string;
  plain_english_text: string;
  technical_text: string;
  priority: number;
}

interface InterpretationResult {
  score: number;
  recommendations: LLMRecommendation[];
}

export async function interpretAuditData(rawData: {
  technical: unknown;
  seo: unknown;
  geo: unknown;
  url: string;
}): Promise<InterpretationResult> {
  const userMessage = buildInterpretationPrompt(rawData);

  for (let attempt = 0; attempt < 2; attempt++) {
    const raw = await chatCompletion([
      { role: "system", content: INTERPRETATION_SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ]);

    try {
      const cleaned = raw.replace(/^```json?\s*/, "").replace(/```\s*$/, "");
      const parsed = JSON.parse(cleaned) as InterpretationResult;

      if (
        typeof parsed.score !== "number" ||
        !Array.isArray(parsed.recommendations)
      ) {
        throw new Error("Invalid shape");
      }

      parsed.score = Math.max(0, Math.min(100, Math.round(parsed.score)));

      return parsed;
    } catch {
      if (attempt === 1) throw new Error("LLM returned invalid JSON after retry");
    }
  }

  throw new Error("Unreachable");
}

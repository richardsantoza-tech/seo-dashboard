const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "anthropic/claude-sonnet-4";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletionResponse {
  choices: { message: { content: string } }[];
}

export async function chatCompletion(
  messages: Message[],
  model: string = DEFAULT_MODEL
): Promise<string> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY not set");

  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      "X-Title": "SiteClarity",
    },
    body: JSON.stringify({ model, messages, temperature: 0.3 }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter ${model} failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as ChatCompletionResponse;
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from LLM");
  return content;
}

const BASE_URL =
  process.env.DATAFORSEO_SANDBOX === "true"
    ? "https://sandbox.dataforseo.com"
    : "https://api.dataforseo.com";

function getAuthHeader(): string {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) throw new Error("DataForSEO credentials not set");
  return "Basic " + Buffer.from(`${login}:${password}`).toString("base64");
}

export async function dataforseoPost<T>(
  path: string,
  body: unknown[]
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DataForSEO ${path} failed (${res.status}): ${text}`);
  }

  return res.json() as Promise<T>;
}

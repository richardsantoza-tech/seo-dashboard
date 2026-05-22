export const SCORE_MESSAGES = [
  { min: 0, max: 40, message: "Your website has serious problems holding you back" },
  { min: 41, max: 65, message: "Your website needs attention before it can grow" },
  { min: 66, max: 85, message: "Your website is doing okay but leaving opportunity behind" },
  { min: 86, max: 100, message: "Your website is in great shape" },
];

export function getScoreMessage(score: number): string {
  const match = SCORE_MESSAGES.find((s) => score >= s.min && score <= s.max);
  return match?.message ?? SCORE_MESSAGES[0].message;
}

export const COLORS = {
  primary: "#0F6E56",
  criticalBg: "#FCEBEB",
  improveBg: "#FAEEDA",
  goodBg: "#E1F5EE",
} as const;

export const SCAN_STEPS = [
  "Checking your website speed…",
  "Looking at how search engines see you…",
  "Checking if AI assistants know about you…",
  "Putting your report together…",
];

export const VALUE_PROPS = [
  {
    headline: "Know exactly what's broken",
    description:
      "Get a clear picture of what's holding your website back — no technical jargon, just plain English.",
  },
  {
    headline: "Understand why it matters",
    description:
      "Every issue comes with a real-world explanation of how it's costing you customers and revenue.",
  },
  {
    headline: "Know what to fix first",
    description:
      "Issues are ranked by business impact so you always know where to start, whether you fix it yourself or hand it off.",
  },
];

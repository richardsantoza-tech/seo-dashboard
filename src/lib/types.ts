export interface Site {
  id: string;
  user_id: string;
  domain: string;
  created_at: string;
}

export type AuditStatus = "pending" | "running" | "completed" | "failed";

export interface Audit {
  id: string;
  site_id: string;
  status: AuditStatus;
  type: string;
  score: number | null;
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface AuditResult {
  id: string;
  audit_id: string;
  category: string; // "technical" | "seo" | "geo"
  raw_data: Record<string, unknown>;
  summary: Record<string, unknown> | null;
  created_at: string;
}

export interface Recommendation {
  id: string;
  audit_id: string;
  category: string; // "technical" | "content" | "geo"
  title: string;
  description: string;
  plain_english_text: string;
  technical_text: string | null;
  priority: number; // 1=critical, 2=important, 3=nice-to-have
  created_at: string;
}

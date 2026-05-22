export type ScanStatus = "pending" | "running" | "complete" | "error";

export interface IssueCriticalOrImprove {
  title: string;
  description: string;
  fix_simple: string;
  fix_technical: string;
}

export interface IssueGood {
  title: string;
  description: string;
}

export interface Scan {
  id: string;
  user_id: string;
  url: string;
  status: ScanStatus;
  score: number;
  issues_critical: IssueCriticalOrImprove[];
  issues_improve: IssueCriticalOrImprove[];
  issues_good: IssueGood[];
  created_at: string;
  updated_at: string;
}

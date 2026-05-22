"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAudit, getRecommendations } from "@/lib/data";
import type { Audit, Recommendation } from "@/lib/types";
import ScoreRing from "@/components/dashboard/ScoreRing";
import ScoreMessage from "@/components/dashboard/ScoreMessage";
import IssueSection from "@/components/dashboard/IssueSection";

export default function DashboardPage() {
  const { id } = useParams<{ id: string }>();
  const [audit, setAudit] = useState<Audit | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    Promise.all([getAudit(id), getRecommendations(id)]).then(
      ([a, recs]) => {
        setAudit(a);
        setRecommendations(recs);
      }
    );
  }, [id]);

  if (!audit) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const critical = recommendations.filter((r) => r.priority === 1);
  const improve = recommendations.filter((r) => r.priority === 2);
  const good = recommendations.filter((r) => r.priority === 3);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex flex-col items-center text-center">
        <ScoreRing score={audit.score ?? 0} />
        <ScoreMessage score={audit.score ?? 0} />
      </div>

      <div className="mt-12 flex flex-col gap-8">
        {critical.length > 0 && (
          <IssueSection
            variant="critical"
            auditId={audit.id}
            recommendations={critical}
          />
        )}
        {improve.length > 0 && (
          <IssueSection
            variant="improve"
            auditId={audit.id}
            recommendations={improve}
          />
        )}
        {good.length > 0 && (
          <IssueSection
            variant="good"
            auditId={audit.id}
            recommendations={good}
          />
        )}
      </div>
    </div>
  );
}

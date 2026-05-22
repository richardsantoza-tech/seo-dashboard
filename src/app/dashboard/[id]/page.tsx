"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getScan } from "@/lib/data";
import type { Scan } from "@/lib/types";
import ScoreRing from "@/components/dashboard/ScoreRing";
import ScoreMessage from "@/components/dashboard/ScoreMessage";
import IssueSection from "@/components/dashboard/IssueSection";

export default function DashboardPage() {
  const { id } = useParams<{ id: string }>();
  const [scan, setScan] = useState<Scan | null>(null);

  useEffect(() => {
    getScan(id).then(setScan);
  }, [id]);

  if (!scan) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex flex-col items-center text-center">
        <p className="mb-2 text-sm text-gray-500">Results for {scan.url}</p>
        <ScoreRing score={scan.score} />
        <ScoreMessage score={scan.score} />
      </div>

      <div className="mt-12 flex flex-col gap-8">
        {scan.issues_critical.length > 0 && (
          <IssueSection
            variant="critical"
            scanId={scan.id}
            issues={scan.issues_critical}
          />
        )}
        {scan.issues_improve.length > 0 && (
          <IssueSection
            variant="improve"
            scanId={scan.id}
            issues={scan.issues_improve}
          />
        )}
        {scan.issues_good.length > 0 && (
          <IssueSection
            variant="good"
            scanId={scan.id}
            issues={scan.issues_good}
          />
        )}
      </div>
    </div>
  );
}

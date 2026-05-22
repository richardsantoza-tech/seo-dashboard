"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getScan } from "@/lib/data";
import type { Scan, IssueCriticalOrImprove, IssueGood } from "@/lib/types";
import IssueDetail from "@/components/issue/IssueDetail";

export default function IssueDetailPage() {
  const { scanId, issueIndex } = useParams<{
    scanId: string;
    issueIndex: string;
  }>();
  const [scan, setScan] = useState<Scan | null>(null);

  useEffect(() => {
    getScan(scanId).then(setScan);
  }, [scanId]);

  if (!scan) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const [section, indexStr] = issueIndex.split("-");
  const idx = parseInt(indexStr, 10);

  let issue: IssueCriticalOrImprove | IssueGood | undefined;
  if (section === "critical") issue = scan.issues_critical[idx];
  else if (section === "improve") issue = scan.issues_improve[idx];
  else if (section === "good") issue = scan.issues_good[idx];

  if (!issue) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <p className="text-gray-500">Issue not found.</p>
        <Link href={`/dashboard/${scanId}`} className="mt-4 text-primary hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const isFixable = section === "critical" || section === "improve";

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Link
        href={`/dashboard/${scanId}`}
        className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to dashboard
      </Link>

      {isFixable ? (
        <IssueDetail issue={issue as IssueCriticalOrImprove} />
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{issue.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            {issue.description}
          </p>
          <div className="mt-8 rounded-xl bg-good-bg p-6">
            <p className="font-medium text-emerald-700">
              No action needed — this is working well.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

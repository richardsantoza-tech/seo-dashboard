import Link from "next/link";
import type { IssueCriticalOrImprove, IssueGood } from "@/lib/types";

type Variant = "critical" | "improve" | "good";

interface IssueSectionProps {
  variant: Variant;
  scanId: string;
  issues: (IssueCriticalOrImprove | IssueGood)[];
}

const CONFIG: Record<Variant, { bg: string; label: string; dot: string }> = {
  critical: { bg: "bg-critical-bg", label: "Needs immediate attention", dot: "bg-red-500" },
  improve: { bg: "bg-improve-bg", label: "Room for improvement", dot: "bg-amber-500" },
  good: { bg: "bg-good-bg", label: "Looking good", dot: "bg-emerald-500" },
};

export default function IssueSection({ variant, scanId, issues }: IssueSectionProps) {
  const { bg, label, dot } = CONFIG[variant];
  const display = issues.slice(0, 3);

  return (
    <section className={`rounded-xl p-6 ${bg}`}>
      <div className="mb-4 flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
          {label}
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {display.map((issue, i) => (
          <Link
            key={issue.title}
            href={`/issue/${scanId}/${variant}-${i}`}
            className="rounded-lg bg-white/70 p-4 transition-colors hover:bg-white"
          >
            <h3 className="font-medium text-gray-900">{issue.title}</h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {issue.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

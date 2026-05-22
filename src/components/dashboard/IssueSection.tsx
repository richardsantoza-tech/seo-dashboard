import Link from "next/link";
import type { Recommendation } from "@/lib/types";

type Variant = "critical" | "improve" | "good";

interface IssueSectionProps {
  variant: Variant;
  auditId: string;
  recommendations: Recommendation[];
}

const CONFIG: Record<Variant, { bg: string; label: string; dot: string }> = {
  critical: { bg: "bg-critical-bg", label: "Needs immediate attention", dot: "bg-red-500" },
  improve: { bg: "bg-improve-bg", label: "Room for improvement", dot: "bg-amber-500" },
  good: { bg: "bg-good-bg", label: "Looking good", dot: "bg-emerald-500" },
};

export default function IssueSection({ variant, auditId, recommendations }: IssueSectionProps) {
  const { bg, label, dot } = CONFIG[variant];
  const display = recommendations.slice(0, 3);

  return (
    <section className={`rounded-xl p-6 ${bg}`}>
      <div className="mb-4 flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
          {label}
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {display.map((rec) => (
          <Link
            key={rec.id}
            href={`/issue/${auditId}/${rec.id}`}
            className="rounded-lg bg-white/70 p-4 transition-colors hover:bg-white"
          >
            <h3 className="font-medium text-gray-900">{rec.title}</h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {rec.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

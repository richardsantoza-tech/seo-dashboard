"use client";

import { SCAN_STEPS } from "@/lib/constants";

interface ProgressStepsProps {
  currentStep: number;
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="flex flex-col gap-6">
      {SCAN_STEPS.map((label, i) => {
        const completed = i < currentStep;
        const active = i === currentStep;

        return (
          <div key={label} className="flex items-center gap-4">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-all duration-500 ${
                completed
                  ? "bg-primary text-white"
                  : active
                    ? "border-2 border-primary text-primary"
                    : "border-2 border-gray-200 text-gray-400"
              }`}
            >
              {completed ? (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-base transition-colors duration-500 ${
                completed
                  ? "text-gray-900 font-medium"
                  : active
                    ? "text-gray-900"
                    : "text-gray-400"
              }`}
            >
              {label}
            </span>
            {active && (
              <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            )}
          </div>
        );
      })}
    </div>
  );
}

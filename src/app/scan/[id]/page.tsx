"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ProgressSteps from "@/components/scanning/ProgressSteps";
import { useScanPolling } from "@/hooks/useScanPolling";

export default function ScanPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { currentStep, done, failed, errorMessage, timedOut } = useScanPolling(id);

  // Fire-and-forget: kick off the pipeline
  useEffect(() => {
    fetch(`/api/audit/${id}/run`, { method: "POST" }).catch(() => {
      // Errors are detected via polling (audit status → failed)
    });
  }, [id]);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => router.push(`/dashboard/${id}`), 600);
      return () => clearTimeout(timer);
    }
  }, [done, id, router]);

  if (failed) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <p className="text-lg font-medium text-gray-800">
            Something went wrong with your scan.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {errorMessage ?? "Please try again in a few minutes."}
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (timedOut) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <p className="text-lg font-medium text-gray-800">
            This is taking longer than expected.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            We&apos;ll email you when it&apos;s ready.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Scanning your website
        </h1>
        <p className="mb-10 text-sm text-gray-500">
          This usually takes about 60 seconds. We&apos;re checking everything that matters.
        </p>
        <ProgressSteps currentStep={currentStep} />
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ProgressSteps from "@/components/scanning/ProgressSteps";
import { useScanPolling } from "@/hooks/useScanPolling";

export default function ScanPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { currentStep, done } = useScanPolling();

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => router.push(`/dashboard/${id}`), 600);
      return () => clearTimeout(timer);
    }
  }, [done, id, router]);

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

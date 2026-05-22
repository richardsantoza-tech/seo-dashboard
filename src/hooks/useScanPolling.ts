"use client";

import { useEffect, useRef, useState } from "react";
import { SCAN_STEPS } from "@/lib/constants";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { AuditStatus } from "@/lib/types";

const POLL_INTERVAL_MS = 3000;
const TIMEOUT_MS = 3 * 60 * 1000;

export function useScanPolling(auditId: string) {
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const startTime = useRef(0);

  useEffect(() => {
    startTime.current = Date.now();
  }, []);

  // Animate through steps while polling
  useEffect(() => {
    if (done || timedOut || failed) return;
    if (currentStep >= SCAN_STEPS.length - 1) return;
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), 8000);
    return () => clearTimeout(timer);
  }, [currentStep, done, timedOut, failed]);

  // Poll audits.status every 3 seconds
  useEffect(() => {
    if (!auditId || done || timedOut || failed) return;

    const supabase = getSupabaseBrowserClient();

    const interval = setInterval(async () => {
      if (Date.now() - startTime.current >= TIMEOUT_MS) {
        clearInterval(interval);
        setTimedOut(true);
        return;
      }

      const { data } = await supabase
        .from("audits")
        .select("status, error_message")
        .eq("id", auditId)
        .single();

      if (!data) return;

      const status = data.status as AuditStatus;

      if (status === "completed") {
        clearInterval(interval);
        setCurrentStep(SCAN_STEPS.length);
        setDone(true);
      } else if (status === "failed") {
        clearInterval(interval);
        setFailed(true);
        setErrorMessage(data.error_message ?? "Something went wrong");
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [auditId, done, timedOut, failed]);

  return {
    currentStep,
    done,
    failed,
    errorMessage,
    timedOut,
    totalSteps: SCAN_STEPS.length,
  };
}

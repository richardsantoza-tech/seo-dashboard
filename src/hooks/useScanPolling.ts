"use client";

import { useEffect, useState } from "react";
import { SCAN_STEPS } from "@/lib/constants";

export function useScanPolling() {
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentStep >= SCAN_STEPS.length) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStep((s) => s + 1);
    }, 1500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return { currentStep, done, totalSteps: SCAN_STEPS.length };
}

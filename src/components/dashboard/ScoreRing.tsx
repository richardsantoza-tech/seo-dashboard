"use client";

import { useEffect, useState } from "react";

interface ScoreRingProps {
  score: number;
}

export default function ScoreRing({ score }: ScoreRingProps) {
  const [animated, setAnimated] = useState(0);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const color =
    score <= 40
      ? "#DC2626"
      : score <= 65
        ? "#D97706"
        : score <= 85
          ? "#0F6E56"
          : "#059669";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="200" height="200" className="-rotate-90">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="12"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-5xl font-bold text-gray-900">{animated}</span>
        <span className="text-sm text-gray-500">out of 100</span>
      </div>
    </div>
  );
}

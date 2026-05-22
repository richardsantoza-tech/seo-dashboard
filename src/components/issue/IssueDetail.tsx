"use client";

import { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import type { Recommendation } from "@/lib/types";

interface IssueDetailProps {
  recommendation: Recommendation;
}

export default function IssueDetail({ recommendation }: IssueDetailProps) {
  const [copied, setCopied] = useState(false);

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        {recommendation.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-gray-600">
        {recommendation.description}
      </p>

      <TabGroup className="mt-8">
        <TabList className="flex gap-1 rounded-lg bg-gray-100 p-1">
          <Tab className="flex-1 rounded-md px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors focus:outline-none data-[selected]:bg-white data-[selected]:text-gray-900 data-[selected]:shadow-sm">
            Do it yourself
          </Tab>
          <Tab className="flex-1 rounded-md px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors focus:outline-none data-[selected]:bg-white data-[selected]:text-gray-900 data-[selected]:shadow-sm">
            Send to your developer
          </Tab>
        </TabList>
        <TabPanels className="mt-4">
          <TabPanel className="rounded-xl border border-gray-100 bg-white p-6">
            <div className="prose prose-sm max-w-none text-gray-700">
              {recommendation.plain_english_text.split("\n").map((line, i) => (
                <p key={i} className="mb-2">
                  {line}
                </p>
              ))}
            </div>
          </TabPanel>
          <TabPanel className="rounded-xl border border-gray-100 bg-white p-6">
            <div className="mb-4 flex justify-end">
              <button
                onClick={() =>
                  copyToClipboard(recommendation.technical_text ?? "")
                }
                className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200"
              >
                {copied ? "Copied!" : "Copy to clipboard"}
              </button>
            </div>
            <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
              {recommendation.technical_text}
            </pre>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}

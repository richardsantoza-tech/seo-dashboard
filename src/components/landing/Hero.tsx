"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createScan } from "@/lib/data";
import UrlInput from "@/components/ui/UrlInput";

export default function Hero() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(url: string) {
    setLoading(true);
    const scanId = await createScan(url);
    router.push(`/scan/${scanId}`);
  }

  return (
    <section className="flex flex-col items-center px-6 pt-24 pb-16 text-center">
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Your website is losing customers.
        <br />
        <span className="text-primary">Find out why in 60 seconds.</span>
      </h1>
      <p className="mt-6 max-w-lg text-lg text-gray-600">
        Get a plain-English diagnosis of what&apos;s holding your website back —
        no technical jargon, no confusing reports.
      </p>
      <div className="mt-10 w-full flex justify-center">
        <UrlInput onSubmit={handleSubmit} loading={loading} />
      </div>
    </section>
  );
}

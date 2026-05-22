"use client";

import { useState } from "react";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  loading?: boolean;
}

export default function UrlInput({ onSubmit, loading }: UrlInputProps) {
  const [url, setUrl] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (trimmed) onSubmit(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl gap-3">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://yourwebsite.com"
        required
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? "Starting…" : "Scan my site"}
      </button>
    </form>
  );
}

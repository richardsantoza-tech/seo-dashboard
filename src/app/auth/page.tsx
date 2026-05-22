"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { login, signup } from "./actions";
import Button from "@/components/ui/Button";

function AuthForm() {
  const searchParams = useSearchParams();
  const defaultMode = searchParams.get("mode") === "login" ? "login" : "signup";
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  const [mode, setMode] = useState<"login" | "signup">(defaultMode);

  const inputClass =
    "rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {mode === "signup"
            ? "Start diagnosing your website in seconds."
            : "Log in to see your latest scan results."}
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        <form
          action={mode === "signup" ? signup : login}
          className="mt-8 flex flex-col gap-4"
        >
          {mode === "signup" && (
            <input
              type="text"
              name="full_name"
              placeholder="Full name"
              className={inputClass}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className={inputClass}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            minLength={6}
            className={inputClass}
          />
          <Button type="submit">
            {mode === "signup" ? "Create account" : "Log in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          {mode === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            className="font-medium text-primary hover:underline"
          >
            {mode === "signup" ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthForm />
    </Suspense>
  );
}

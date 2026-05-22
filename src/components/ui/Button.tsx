"use client";

import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "rounded-lg px-6 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

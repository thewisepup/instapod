"use client";

import { api } from "~/trpc/react";
import { AlertCircle } from "lucide-react";

export default function CreditBalance() {
  const {
    data: balance,
    isLoading,
    isError,
  } = api.credits.getBalance.useQuery();

  const LOW_CREDITS_THRESHOLD = 2;

  if (isLoading) {
    return (
      <div
        className="h-[30px] w-[64px] animate-pulse rounded-full border border-amber-200 bg-amber-50/60"
        aria-hidden
      />
    );
  }
  if (isError) return null;

  return (
    <div
      className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800 shadow-sm"
      aria-label="Current credit balance"
      title="Current credit balance"
    >
      <span aria-hidden>🪙</span>
      <span>{balance}</span>
      {typeof balance === "number" && balance <= LOW_CREDITS_THRESHOLD ? (
        <span
          className="flex items-center gap-1 text-red-600"
          title="Low credits"
          aria-label="Low credits"
        >
          <AlertCircle className="h-4 w-4" aria-hidden />
        </span>
      ) : null}
    </div>
  );
}

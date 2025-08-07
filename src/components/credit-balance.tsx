"use client";

import { api } from "~/trpc/react";

export default function CreditBalance() {
  const {
    data: balance,
    isLoading,
    isError,
  } = api.credits.getBalance.useQuery();

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
    </div>
  );
}

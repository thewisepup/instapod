"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

type CreditPacksModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message?: {
    text: string;
    tone?: "default" | "info" | "warning" | "error" | "success";
  };
};

const PACKS = [
  { id: "small", label: "Small", credits: 10, priceLabel: "$—.—" },
  { id: "medium", label: "Medium", credits: 30, priceLabel: "$—.—" },
  { id: "large", label: "Large", credits: 60, priceLabel: "$—.—" },
] as const;

export default function CreditPacksModal({
  open,
  onOpenChange,
  message,
}: CreditPacksModalProps) {
  const tone = message?.tone ?? "default";
  const toneClasses =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-800"
      : tone === "warning"
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : tone === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : tone === "info"
            ? "border-blue-200 bg-blue-50 text-blue-800"
            : "border-slate-200 bg-slate-50 text-slate-800";
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Buy credits"
      description="Choose a credit pack to top up your balance."
    >
      {message?.text ? (
        <div
          className={`mb-4 flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${toneClasses}`}
          role={tone === "error" ? "alert" : undefined}
        >
          <AlertCircle className="h-4 w-4" aria-hidden />
          <span>{message.text}</span>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {PACKS.map((pack) => (
          <div
            key={pack.id}
            className="bg-card text-card-foreground flex flex-col justify-between gap-3 rounded-lg border p-4 shadow-sm"
          >
            <div className="space-y-1">
              <div className="text-base font-semibold">{pack.label}</div>
              <div className="text-2xl font-bold">{pack.credits} credits</div>
              <div className="text-muted-foreground text-sm">
                {pack.priceLabel}
              </div>
            </div>
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                // TODO: integrate Stripe checkout link here
              }}
            >
              Buy now
            </Button>
          </div>
        ))}
      </div>
    </Modal>
  );
}

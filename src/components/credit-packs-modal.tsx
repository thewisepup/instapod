"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

type CreditPacksModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PACKS = [
  { id: "small", label: "Small", credits: 10, priceLabel: "$—.—" },
  { id: "medium", label: "Medium", credits: 30, priceLabel: "$—.—" },
  { id: "large", label: "Large", credits: 60, priceLabel: "$—.—" },
] as const;

export default function CreditPacksModal({
  open,
  onOpenChange,
}: CreditPacksModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Buy credits"
      description="Choose a credit pack to top up your balance."
    >
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

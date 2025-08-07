"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

type ConfirmModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creditsCost: number;
  onConfirm: () => void;
  isConfirming?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  title?: string;
};

export default function ConfirmModal({
  open,
  onOpenChange,
  creditsCost,
  onConfirm,
  isConfirming = false,
  confirmLabel = "Yes, continue",
  cancelLabel = "Cancel",
  title = "Confirm generation",
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={`This will cost ${creditsCost} credits. Are you sure?`}
    >
      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isConfirming}
        >
          {cancelLabel}
        </Button>
        <Button type="button" onClick={onConfirm} disabled={isConfirming}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

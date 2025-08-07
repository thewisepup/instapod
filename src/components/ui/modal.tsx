"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "~/lib/utils";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  className,
  children,
  footer,
}: ModalProps) {
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Modal dialog"}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          "bg-background relative z-50 w-full max-w-lg rounded-xl border p-5 shadow-xl",
          "text-foreground",
          className,
        )}
      >
        {(title ?? description) && (
          <div className="mb-3 space-y-1">
            {title ? (
              <h2 className="text-lg leading-none font-semibold">{title}</h2>
            ) : null}
            {description ? (
              <p className="text-muted-foreground text-sm">{description}</p>
            ) : null}
          </div>
        )}

        <div className="mb-4">{children}</div>

        {footer ? <div className="mt-2">{footer}</div> : null}

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close modal"
          className="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-md focus-visible:ring-2 focus-visible:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>,
    document.body,
  );
}

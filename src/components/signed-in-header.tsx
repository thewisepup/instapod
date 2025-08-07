"use client";

import * as React from "react";
import { UserButton } from "@clerk/nextjs";
import AppLogo from "./app-logo";
import CreditBalance from "./credit-balance";
import { Button } from "@/components/ui/button";
import CreditPacksModal from "@/components/credit-packs-modal";

export default function SignedInHeader() {
  const [isBuyCreditsOpen, setIsBuyCreditsOpen] = React.useState(false);

  return (
    <div className="relative w-full">
      <div className="flex flex-1 items-center gap-4">
        <AppLogo />
        <span className="text-2xl font-medium sm:text-4xl">InstaPod</span>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-3">
        <CreditBalance />
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsBuyCreditsOpen(true)}
        >
          Buy Credits
        </Button>
        <div className="scale-200">
          <UserButton />
        </div>
      </div>

      <CreditPacksModal
        open={isBuyCreditsOpen}
        onOpenChange={setIsBuyCreditsOpen}
      />
    </div>
  );
}

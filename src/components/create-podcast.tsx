"use client";

import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "@/trpc/react";
import CreditPacksModal from "@/components/credit-packs-modal";
import ConfirmModal from "@/components/confirm-modal";

interface CreatePodcastProps {
  onPodcastGenerated: () => void;
}

export default function CreatePodcast({
  onPodcastGenerated,
}: CreatePodcastProps) {
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>("");
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [creditModalMessage, setCreditModalMessage] = useState<{
    text: string;
    tone?: "default" | "info" | "warning" | "error" | "success";
  }>();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const creditsCost = 1; // make this configurable later

  const { data: balance } = api.credits.getBalance.useQuery();

  const { mutate: createPodcast } = api.podcast.createPodcast.useMutation({
    onSuccess: () => {
      setIsGenerating(false);
      setError("");
      onPodcastGenerated();
    },
    onError: (error) => {
      //TODO: This is a terrible way to do error handling, adding this just for demo purposes.
      if (error.message.includes("Insufficient credits")) {
        const text =
          "Insufficient funds, please purchase more credits to continue.";
        setError(text);
        setCreditModalMessage({ text, tone: "error" });
        setIsCreditModalOpen(true);
      } else {
        setError("An error occurred while generating the podcast");
      }
      setIsGenerating(false);
    },
  });

  const handleRequestGenerate = async () => {
    // Frontend validation: if balance is less than the cost, prompt to buy credits
    if (typeof balance === "number" && balance < creditsCost) {
      setCreditModalMessage({
        text: "Insufficient funds, please purchase more credits to continue.",
        tone: "error",
      });
      setIsCreditModalOpen(true);
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirmGenerate = () => {
    setIsConfirmOpen(false);
    setIsGenerating(true);
    createPodcast({ userDescription: prompt });
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Textarea
          placeholder="Describe what you want in details with example 
          (e.g., 'Tell me about the latest developments with the Trump 
          tariffs and how it will my clothing business. 
          I want to understand how it will affect costs, supply chain, 
          and pricing for my customers.')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[200px]"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={handleRequestGenerate}
        disabled={isGenerating || !prompt.trim()}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Podcast...
          </>
        ) : (
          "Generate Podcast"
        )}
      </Button>

      <CreditPacksModal
        open={isCreditModalOpen}
        onOpenChange={setIsCreditModalOpen}
        message={creditModalMessage}
      />

      <ConfirmModal
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        creditsCost={creditsCost}
        onConfirm={handleConfirmGenerate}
        isConfirming={isGenerating}
        title="Confirm podcast generation"
        confirmLabel={`Yes, spend ${creditsCost} credit${creditsCost === 1 ? "" : "s"}`}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "@/trpc/react";

interface CreatePodcastProps {
  onPodcastGenerated: () => void;
}

export default function CreatePodcast({
  onPodcastGenerated,
}: CreatePodcastProps) {
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>("");

  const { mutate: createPodcast } = api.podcast.createPodcast.useMutation({
    onSuccess: () => {
      setIsGenerating(false);
      setError("");
      onPodcastGenerated();
    },
    onError: (error) => {
      //TODO: This is a terrible way to do error handling, adding this just for demo purposes.
      if (error.message.includes("Insufficient credits")) {
        setError(
          "You don't have enough credits to generate a podcast. Please purchase more credits to continue.",
        );
      } else {
        setError("An error occurred while generating the podcast");
      }
      setIsGenerating(false);
    },
  });

  const handleGeneratePodcast = async () => {
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
        onClick={handleGeneratePodcast}
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
    </div>
  );
}

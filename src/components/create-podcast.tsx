"use client";

import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import type { Podcast } from "~/lib/types";
import { Button } from "./ui/button";

interface CreatePodcastProps {
  onPodcastGenerated: (podcast: Podcast) => void;
}

export default function CreatePodcast({
  onPodcastGenerated,
}: CreatePodcastProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePodcast = async () => {
    setIsGenerating(true);

    // Simulate podcast generation
    setTimeout(() => {
      const newPodcast: Podcast = {
        id: Date.now().toString(),
        title: prompt.length > 30 ? `${prompt.substring(0, 30)}...` : prompt,
        description: prompt,
        createdAt: new Date().toISOString(),
        duration: "10:00", // Placeholder duration
        audioUrl: "/placeholder-audio.mp3", // Placeholder URL
      };

      setIsGenerating(false);
      setPrompt("");
      onPodcastGenerated(newPodcast);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Textarea
          placeholder="Describe what you want in details with example (e.g., 'Tell me about the latest developments in quantum computing')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[200px]"
        />
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

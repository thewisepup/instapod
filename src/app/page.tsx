"use client";

import { useState } from "react";
import CreatePodcast from "~/components/create-podcast";
import ListenPodcast from "~/components/listen-podcast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Podcast } from "~/lib/types";

export default function Home() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [activeTab, setActiveTab] = useState("create");

  const handlePodcastGenerated = (podcast: Podcast) => {
    setPodcasts((prev) => [podcast, ...prev]);
    setActiveTab("listen");
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
            <span className="text-primary-foreground font-bold">P</span>
          </div>
          <span className="text-lg font-medium">PodGen</span>
        </div>
        <h1 className="text-center text-2xl font-bold">AI Podcast</h1>
        <button className="hover:bg-accent rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-settings"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-2">
          <TabsTrigger value="create">Create Podcast</TabsTrigger>
          <TabsTrigger value="listen">Listen To Podcast</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreatePodcast onPodcastGenerated={handlePodcastGenerated} />
        </TabsContent>
        <TabsContent value="listen">
          <ListenPodcast podcasts={podcasts} />
        </TabsContent>
      </Tabs>
    </main>
  );
}

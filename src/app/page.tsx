"use client";

import CreatePodcast from "@/components/create-podcast";
import { useState } from "react";
import ListenPodcast from "@/components/listen-podcast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/nextjs";
import LandingPage from "~/components/landing-page";
import type { Podcast } from "~/lib/types";

export default function Home() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [activeTab, setActiveTab] = useState("create");
  const { isSignedIn, isLoaded } = useUser();

  const handlePodcastGenerated = (podcast: Podcast) => {
    setPodcasts((prev) => [podcast, ...prev]);
    setActiveTab("listen");
  };

  if (!isLoaded) {
    //TODO Implement app wide loader
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <LandingPage />;
  }

  return (
    <main className="container mx-auto px-4 py-12">
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
      {/* {data && (
        <div className="mt-8 rounded-lg bg-gray-100 p-4">
          <p className="text-lg">{data.greeting}</p>
        </div>
      )}
      {userPodcasts && (
        <div className="mt-8 rounded-lg bg-gray-100 p-4">
          <div className="space-y-4">
            {userPodcasts.map((podcast) => (
              <div key={podcast.id} className="flex justify-between">
                <p className="text-lg">{podcast.title}</p>
                <p className="text-gray-600">
                  {podcast.created_at
                    ? new Date(podcast.created_at).toLocaleDateString()
                    : "No date available"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </main>
  );
}

import { api } from "@/trpc/react";
import PodcastCard from "@components/podcast-card";

export default function ListenPodcast() {
  const { data: podcasts, isLoading } = api.podcast.getPodcasts.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {podcasts?.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
}

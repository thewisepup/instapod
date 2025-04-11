import type { Podcast } from "@/lib/types";
import PodcastCard from "@components/podcast-card";

interface ListenPodcastProps {
  podcasts: Podcast[];
}

export default function ListenPodcast({ podcasts }: ListenPodcastProps) {
  return (
    <div className="space-y-4">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
}

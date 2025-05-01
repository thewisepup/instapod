import type { Podcast } from "@/lib/types";
import { useAudioPlayer } from "@/components/audio-player";

interface PodcastCardProps {
  podcast: Podcast;
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
  const { clickPodcastCard } = useAudioPlayer();

  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md"
      onClick={() => clickPodcastCard(podcast)}
    >
      <button
        className="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
        onClick={() => {
          // Implement play functionality
          console.log("Playing podcast:", podcast.title);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-lg font-medium">{podcast.title}</h3>
        <p className="max-w-full truncate text-sm text-gray-600">
          {podcast.userDescription}
        </p>
      </div>
    </div>
  );
}

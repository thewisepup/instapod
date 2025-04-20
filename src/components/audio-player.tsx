"use client";
import { createClient } from "@lib/supabase-client";
import type { Podcast } from "@lib/types";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioPlayerContextType {
  currentPodcast: Podcast | null;
  isPlaying: boolean;
  playPodcast: (podcast: Podcast) => void;
  pausePodcast: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export function AudioPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioUrl]);

  const clickPodcastCard = async (podcast: Podcast) => {
    setCurrentPodcast(podcast);
    setIsPlaying(true);

    try {
      const { data, error } = await supabase.storage
        .from("podcasts")
        .createSignedUrl(podcast.id, 3600);

      if (error) throw error;
      if (data?.signedUrl) {
        setAudioUrl(data.signedUrl);
      }
    } catch (error) {
      console.error("Error getting audio URL:", error);
    }
  };

  const pausePodcast = () => {
    setIsPlaying(false);
  };

  const playPodcast = () => {
    setIsPlaying(true);
  };

  return (
    <AudioPlayerContext.Provider
      value={{ currentPodcast, isPlaying, clickPodcastCard, pausePodcast }}
    >
      {children}
      {currentPodcast && (
        <div className="fixed right-0 bottom-0 left-0 border-t bg-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* <img
                // src={currentPodcast.coverImage}
                alt={currentPodcast.title}
                className="h-12 w-12 rounded"
              /> */}
              <div>
                <h3 className="font-medium">{currentPodcast.title}</h3>
                <p className="text-sm text-gray-500">
                  {currentPodcast.userDescription}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={isPlaying ? pausePodcast : playPodcast}
                className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          </div>
        </div>
      )}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          onError={(e) => {
            console.error("Audio playback error:", e);
            setIsPlaying(false);
          }}
        />
      )}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider",
    );
  }
  return context;
}

"use client";
import { createClient } from "@lib/supabase-client";
import type { Podcast } from "@lib/types";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioPlayerContextType {
  currentPodcast: Podcast | null;
  isPlaying: boolean;
  clickPodcastCard: (podcast: Podcast) => void;
  pausePodcast: () => void;
  playPodcast: () => void;
  currentTime: number;
  duration: number;
  seekTo: (time: number) => void;
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

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

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentPodcast,
        isPlaying,
        clickPodcastCard,
        pausePodcast,
        playPodcast,
        currentTime,
        duration,
        seekTo,
      }}
    >
      {children}
      {currentPodcast && (
        <div className="fixed right-0 bottom-0 left-0 border-t bg-white p-4">
          <div className="container mx-auto">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-medium">{currentPodcast.title}</h3>
                  <p className="text-sm text-gray-500">
                    {currentPodcast.userDescription}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {formatTime(currentTime)}
                </span>
                <button
                  onClick={isPlaying ? pausePodcast : playPodcast}
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <span className="text-sm text-gray-500">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => seekTo(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            />
          </div>
        </div>
      )}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={() =>
            setCurrentTime(audioRef.current?.currentTime || 0)
          }
          onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
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

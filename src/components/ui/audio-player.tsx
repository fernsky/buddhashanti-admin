import { useEffect, useState, useRef } from "react";
import { Howl } from "howler";
import { cn } from "@/lib/utils";
import { Slider } from "./slider";

export const CustomAudioPlayer = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    const initializeAudio = () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }

      soundRef.current = new Howl({
        src: [src],
        html5: true, // Force HTML5 Audio to handle streaming
        format: ["mp3", "m4a", "mpeg", "opus", "ogg", "wav", "aac"],
        preload: true,
        pool: 1,
        onload: () => {
          setDuration(soundRef.current?.duration() ?? 0);
          setError(null);
        },
        onloaderror: (id, error) => {
          console.error("Loading error:", error);
          setError("Failed to load audio");
          // Fallback to native audio element if Howler fails
          fallbackToNativeAudio();
        },
        onplayerror: (id, error) => {
          console.error("Playback error:", error);
          setError("Playback error");
          // Try to recover playback
          if (soundRef.current) {
            soundRef.current.once("unlock", () => {
              soundRef.current?.play();
            });
          }
        },
        onplay: () => setPlaying(true),
        onpause: () => setPlaying(false),
        onstop: () => setPlaying(false),
      });
    };

    const fallbackToNativeAudio = () => {
      // Create a native HTML5 audio element as fallback
      soundRef.current?.unload();
      const audio = new Audio(src);
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
        setError(null);
      });
      audio.addEventListener("timeupdate", () => {
        setSeek(audio.currentTime);
      });
      audio.addEventListener("play", () => setPlaying(true));
      audio.addEventListener("pause", () => setPlaying(false));
      audio.addEventListener("error", (e) => {
        console.error("Native audio error:", e);
        setError("Audio format not supported");
      });

      // Create a Howl-like wrapper for the native audio element
      soundRef.current = {
        play: () => audio.play(),
        pause: () => audio.pause(),
        seek: (time?: number) => {
          if (typeof time === "number") {
            audio.currentTime = time;
            return time;
          }
          return audio.currentTime;
        },
        volume: (vol?: number) => {
          if (typeof vol === "number") {
            audio.volume = vol;
            return vol;
          }
          return audio.volume;
        },
        duration: () => audio.duration,
        unload: () => {
          audio.pause();
          audio.src = "";
          audio.remove();
        },
      } as unknown as Howl;
    };

    initializeAudio();
    return () => {
      soundRef.current?.unload();
    };
  }, [src]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (soundRef.current && playing) {
        setSeek(soundRef.current.seek());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playing]);

  const togglePlayPause = () => {
    if (!soundRef.current) return;

    if (playing) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const handleSeek = (value: number) => {
    if (!soundRef.current) return;
    soundRef.current.seek(value);
    setSeek(value);
  };

  const handleVolume = (value: number) => {
    if (!soundRef.current) return;
    soundRef.current.volume(value);
    setVolume(value);
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={cn("w-full rounded-lg border bg-card p-4", className)}>
      {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlayPause}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          {playing ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>

        <div className="flex flex-1 flex-col gap-2">
          <Slider
            value={[seek]}
            max={duration}
            step={0.1}
            onValueChange={([value]) => handleSeek(value)}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(seek)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex w-24 items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <Slider
            value={[volume]}
            max={1}
            step={0.1}
            onValueChange={([value]) => handleVolume(value)}
          />
        </div>
      </div>
    </div>
  );
};

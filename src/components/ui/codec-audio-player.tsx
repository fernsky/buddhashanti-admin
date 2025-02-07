"use client";

import { useEffect, useRef, useState } from "react";
import "mediaelement";
import "mediaelement/build/mediaelementplayer.min.css";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    MediaElementPlayer: any;
  }
}

export const CodecAudioPlayer = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const initPlayer = async () => {
      try {
        if (playerRef.current) {
          playerRef.current.remove();
        }

        // Initialize MediaElement player with AAC codec support
        playerRef.current = new window.MediaElementPlayer(audioRef.current, {
          pluginPath: "/path/to/mediaelement/",
          shimScriptAccess: "always",
          audioWidth: "100%",
          features: ["playpause", "progress", "current", "duration", "volume"],
          success: function (
            mediaElement: any,
            originalNode: any,
            instance: any,
          ) {
            // Force AAC codec support
            mediaElement.addEventListener("error", (e: any) => {
              console.error("MediaElement error:", e);
              // Try alternative playback method if initial fails
              if (!mediaElement.canPlayType('audio/mp4; codecs="mp4a.40.2"')) {
                const audio = new Audio();
                audio.src = src;
                audio.play().catch((e) => {
                  console.error("Fallback playback failed:", e);
                  setError("Audio format not supported");
                });
              }
            });
          },
          error: function (e: any) {
            console.error("Player initialization error:", e);
            setError("Failed to initialize player");
          },
        });
      } catch (e) {
        console.error("Player setup error:", e);
        setError("Failed to setup player");
      }
    };

    initPlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.remove();
      }
    };
  }, [src]);

  return (
    <div className={cn("w-full rounded-lg border bg-card p-4", className)}>
      {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
      <div className="mejs-player">
        <audio
          ref={audioRef}
          preload="auto"
          controls
          style={{ width: "100%", height: "40px" }}
        >
          <source src={src} type="audio/mp4" />
          <source src={src} type="audio/x-m4a" />
          <source src={src} type="audio/aac" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

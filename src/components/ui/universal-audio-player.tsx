"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Import Plyr styles
import "plyr/dist/plyr.css";

export const UniversalAudioPlayer = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only initialize on client-side
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted || !audioRef.current || !containerRef.current) return;

    let player: any = null;
    let hls: any = null;

    const initPlayer = async () => {
      try {
        // Dynamically import Plyr and hls.js
        const [{ default: Plyr }, { default: Hls }] = await Promise.all([
          import("plyr"),
          import("hls.js"),
        ]);

        // Create a new wrapper div for Plyr
        const wrapper = document.createElement("div");
        wrapper.className = "plyr__video-wrapper";

        // Properly insert the wrapper
        if (audioRef?.current?.parentNode) {
          audioRef.current.parentNode.insertBefore(wrapper, audioRef.current);
          wrapper.appendChild(audioRef.current);
        }

        // Initialize Plyr
        player = new Plyr(audioRef.current!, {
          controls: [
            "play",
            "progress",
            "current-time",
            "duration",
            "mute",
            "volume",
          ],
        });

        // Setup HLS if needed
        if (Hls.isSupported() && src.includes(".m3u8")) {
          hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(audioRef.current);
        } else {
          if (audioRef.current) {
            audioRef.current.src = src;
          }
        }
      } catch (e) {
        console.error("Player initialization error:", e);
        setError("Failed to initialize player");
      }
    };

    initPlayer();

    // Cleanup
    return () => {
      if (player) {
        player.destroy();
      }
      if (hls) {
        hls.destroy();
      }
    };
  }, [mounted, src]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className={cn("w-full rounded-lg border bg-card p-4", className)}
    >
      {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
      <div className="plyr__audio-wrapper">
        <audio ref={audioRef} preload="metadata" controls>
          <source src={src} />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

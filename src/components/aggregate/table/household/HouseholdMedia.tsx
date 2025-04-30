import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MediaItem = {
  url: string;
  type: "image" | "audio" | "video";
  label: string;
};

export function HouseholdMedia({ media }: { media: MediaItem[] }) {
  if (!media || media.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No media available for this household
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {media.map((item, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            {item.type === "image" && item.url ? (
              <img
                src={item.url}
                alt={item.label}
                className="w-full rounded-md object-contain max-h-[300px]"
              />
            ) : item.type === "audio" && item.url ? (
              <audio controls className="w-full">
                <source src={item.url} />
                Your browser does not support the audio element.
              </audio>
            ) : item.type === "video" && item.url ? (
              <video controls className="w-full">
                <source src={item.url} />
                Your browser does not support the video element.
              </video>
            ) : (
              <div className="flex items-center justify-center h-32 bg-muted/20 rounded">
                <p className="text-sm text-muted-foreground">
                  Media unavailable
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

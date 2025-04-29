import React, { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface InfiniteLoaderProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  loadMoreText?: string;
  endOfResultsText?: string;
}

export function InfiniteLoader({
  hasMore,
  isLoading,
  onLoadMore,
  loadMoreText = "Loading more...",
  endOfResultsText = "End of results",
}: InfiniteLoaderProps) {
  const observerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "100px" },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, isLoading, onLoadMore]);

  return (
    <div
      ref={observerRef}
      className="flex items-center justify-center p-4 text-sm text-muted-foreground"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{loadMoreText}</span>
        </div>
      ) : hasMore ? (
        <div className="h-8" /> // Invisible spacer to trigger intersection
      ) : (
        <span>{endOfResultsText}</span>
      )}
    </div>
  );
}

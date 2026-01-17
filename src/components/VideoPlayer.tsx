"use client";

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  return (
    <div className="aspect-video rounded-2xl overflow-hidden soft-shadow bg-white">
      <video
        src={src}
        poster={poster}
        controls
        preload="metadata"
        playsInline
        className="w-full h-full"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

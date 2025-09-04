"use client";

import React, { useState, useRef, useEffect } from 'react';

export interface HeroVideo {
  id: string;
  title: string;
  src: string;
  poster: string;
  active: boolean;
}

interface VideoEmbeddedProps {
  videos?: HeroVideo[];
  currentVideoId?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  onVideoChange?: (videoId: string) => void;
}

const VideoEmbedded: React.FC<VideoEmbeddedProps> = ({
  videos = [],
  currentVideoId,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  playsInline = true,
  onVideoChange
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Get the active video or the first video
  const activeVideo = currentVideoId 
    ? videos.find(v => v.id === currentVideoId)
    : videos.find(v => v.active) || videos[0];

  useEffect(() => {
    if (videoRef.current) {
      setIsLoading(true);
      setHasError(false);
      
      // Reset video when source changes
      videoRef.current.load();
    }
  }, [activeVideo?.src]);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error(`Failed to load video: ${activeVideo?.src}`);
  };

  const handleVideoSelect = (videoId: string) => {
    if (onVideoChange) {
      onVideoChange(videoId);
    }
  };

  if (!activeVideo) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 ${className}`}>
        <div className="text-center text-gray-400">
          <p>No video available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline={playsInline}
        poster={activeVideo.poster}
        onLoadedData={handleLoadedData}
        onError={handleError}
      >
        <source src={activeVideo.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <p className="text-white/70 text-sm">Loading video...</p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white/70">
            <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-lg font-medium mb-2">Failed to load video</p>
            <p className="text-sm text-gray-400">Please try refreshing the page</p>
          </div>
        </div>
      )}

      {/* Video Selector (when multiple videos available) */}
      {videos.length > 1 && onVideoChange && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => handleVideoSelect(video.id)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  video.id === activeVideo.id 
                    ? 'bg-white' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                title={video.title}
              />
            ))}
          </div>
        </div>
      )}

      {/* Video Info */}
      {activeVideo.title && videos.length > 1 && (
        <div className="absolute top-6 right-6 z-10">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="text-white text-sm font-medium">{activeVideo.title}</p>
          </div>
        </div>
      )}

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  );
};

// Alternative component for embedded videos (YouTube, Vimeo, etc.)
interface EmbedVideoProps {
  src: string;
  title?: string;
  className?: string;
}

export const EmbedVideo: React.FC<EmbedVideoProps> = ({
  src,
  title = "Video player",
  className = ""
}) => {
  return (
    <div className={`relative w-full ${className}`} style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute inset-0 w-full h-full rounded-lg"
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

export default VideoEmbedded;
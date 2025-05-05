import React, { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const fetchVideos = async () => {
  try {
    const response = await fetch("https://api.pexels.com/videos/popular?page=1&per_page=5", {
      headers: {
        Authorization: process.env.REACT_APP_PEXELS_API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.videos.map((video) => ({ id: video.id, url: video.video_files[0]?.link || "" }));
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

const NewsReel = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos().then(setVideos);
  }, []);

  return (
    <div className="flex flex-col overflow-y-auto h-screen snap-y snap-mandatory">
      {videos.map((video) => video.url && <VideoCard key={video.id} videoUrl={video.url} />)}
    </div>
  );
};

const VideoCard = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play().catch(() => setHasError(true));
      setIsPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [inView]);

  const toggleMute = () => setMuted((prev) => !prev);
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => setHasError(true));
      }
      setIsPlaying(!isPlaying);
    }
  };
  const handleError = () => setHasError(true);

  return (
    <div ref={ref} className="relative w-full h-screen flex items-center justify-center snap-center">
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-lg font-semibold">
          Error loading video
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={videoUrl}
        loop
        muted={muted}
        playsInline
        controls={false}
        preload="auto"
        onError={handleError}
      />

      {/* Controls */}
      <div className="absolute bottom-6 left-6 flex gap-4">
        <button
          onClick={togglePlayPause}
          className="bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={toggleMute}
          className="bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition"
        >
          {muted ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
};

export default NewsReel;

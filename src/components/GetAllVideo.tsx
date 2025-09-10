import React, { useEffect, useState } from "react";
import { getAllVideo } from "@/apiServices/videoService";

type VideoType = {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  thumbnail: string;
  duration: number;
};

const VideoList = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const data = await getAllVideo();
        const videos=data?.data.docs
        console.log(videos)
        console.log('data', data)
        setVideos(videos);
      } catch (error) {
        console.error("❌ Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Loading videos...
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        No videos uploaded yet.
      </div>
    );
  }

  // Helper to format duration (mm:ss)
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {videos?.map((video) => (
        <div
          key={video._id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
        >
          {/* Thumbnail / Video */}
          <div className="relative w-full h-48 bg-black cursor-pointer">
            {playingVideoId === video._id ? (
              <video
                src={video.videoFile}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onClick={() => setPlayingVideoId(video._id)}
                />
                {/* Duration */}
                <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                  {formatDuration(video.duration)}
                </span>
              </>
            )}
          </div>

          {/* Video Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold">{video.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {video.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;

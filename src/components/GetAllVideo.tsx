import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllVideo } from "@/apiServices/videoService";

type VideoType = {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  thumbnail: string;
  duration: number;
};

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const data = await getAllVideo();
        setVideos(data?.data.docs || []);
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
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
        Loading videos...
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
        No videos uploaded yet.
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">

      {videos.map((video) => (
        <div
          key={video._id}
          className="cursor-pointer group"
        >
          {/* Thumbnail container */}
          <Link to={`/video/${video._id}`}>
            <div className="relative w-full h-48 bg-gray-200 rounded-xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-200">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
              />

              {/* Duration badge */}
              <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-[11px] px-1.5 py-0.5 rounded">
                {formatDuration(video.duration)}
              </span>
            </div>
          </Link>

          {/* VIDEO DETAILS */}
          <div className="flex mt-3 gap-3">

            {/* Placeholder channel avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>

            <div className="flex-1">
              <h3 className="text-md font-semibold text-gray-900 group-hover:text-black line-clamp-2">
                {video.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {video.description}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Channel Name • {Math.floor(Math.random() * 900) + 100}K views
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;

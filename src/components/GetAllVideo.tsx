import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { getAllVideo } from "@/apiServices/videoService";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setVideos, startVideoLoading } from "@/store/videoSlice";

const VideoList: React.FC = () => {
  const { videos, loading } = useAppSelector((state) => state.videos);
  const dispatch = useAppDispatch();
  console.log("videos", videos);
  useEffect(() => {
    dispatch(startVideoLoading());
    const fetchVideos = async () => {
      try {
        const data = await getAllVideo();
        // console.log("data", data.data.docs);

        if (data) {
          dispatch(setVideos(data.data.docs));
        }
      } catch (error) {
        console.error("❌ Failed to fetch videos:", error);
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

  console.log("videos from data", videos);
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* VIDEO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="cursor-pointer group">
            <Link to={`/video/${video._id}`}>
              <div className="relative w-full h-48 bg-gray-200 rounded-xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-200">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                />

                <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-[11px] px-1.5 py-0.5 rounded">
                  {formatDuration(video.duration)}
                </span>
              </div>
            </Link>

            <div className="flex mt-3 gap-3">
              <Avatar>
                <AvatarImage src={video.owner?.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

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
      POSTS SECTION BELOW VIDEOS
    </div>
  );
};

export default VideoList;

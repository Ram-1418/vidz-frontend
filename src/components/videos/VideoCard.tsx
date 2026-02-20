import { VideoWithOwner } from "@/types/video.types";
import React from "react";
import { useNavigate } from "react-router-dom";

type VideoCardProps = {
  video: VideoWithOwner;
};

const VideoCard = ({ video }: VideoCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      key={video._id}
      onClick={() => navigate(`/watch/${video._id}`)}
      className="cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Duration Badge */}
        <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-0.5 rounded">
          12:45
        </span>
      </div>

      {/* Video Info */}
      <div className="flex mt-3 gap-3">
        {/* Channel Avatar */}
        <div className="w-9 h-9 bg-gray-300 rounded-full"></div>

        {/* Title & Meta */}
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-gray-900 line-clamp-2">
            {video.title}
          </h2>

          <p className="text-xs text-gray-600 mt-1">My Channel</p>

          <p className="text-xs text-gray-500">12K views • 2 days ago</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

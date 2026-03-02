import { VideoWithOwner } from "@/types/video.types";
import { useNavigate } from "react-router-dom";

type VideoCardProps = {
  video: VideoWithOwner;
};

const VideoCard = ({ video }: VideoCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/watch/${video._id}`)}
      className="cursor-pointer group w-full"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Duration Badge */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
          12:45
        </span>
      </div>

      {/* Info Section */}
      <div className="flex mt-3 gap-3">
        {/* Channel Avatar */}
        <img
          src={video.owner?.avatar}
          alt={video.owner?.username}
          className="w-9 h-9 rounded-full object-cover"
        />

        {/* Title + Meta */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
            {video.title}
          </h3>

          <p className="text-xs text-gray-600 mt-1 hover:text-gray-900">
            {video.owner?.username}
          </p>

          <p className="text-xs text-gray-500">
            {video.views} views • 2 days ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

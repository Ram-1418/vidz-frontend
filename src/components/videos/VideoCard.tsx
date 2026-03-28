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

        {/* Duration */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] px-2 py-[2px] rounded">
          12:45
        </span>
      </div>

      {/* Info */}
      <div className="flex gap-3 mt-3">
        {/* Avatar */}
        <img
          src={video.owner?.avatar}
          alt={video.owner?.username}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
        />

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2 leading-snug">
            {video.title}
          </h3>

          <p className="text-xs md:text-sm text-gray-600 mt-1 hover:text-gray-900 truncate">
            {video.owner?.username}
          </p>

          <p className="text-xs md:text-sm text-gray-500">
            {video.views} views
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
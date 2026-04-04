import { VideoWithOwner } from "@/types/video.types";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVideo } from "@/apiServices/videoService";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
type VideoCardProps = {
  video: VideoWithOwner;
};

const VideoCard = ({ video }: VideoCardProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false)

  const deleteMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    }
  })

  const handleDelte = (videoId: string) => {
    deleteMutation.mutate(videoId)
  }

  return (
    <div
      // onClick={() => navigate(`/watch/${video._id}`)}
      // className="cursor-pointer group w-full"
    >
      {/* Thumbnail */}
      <div 
       onClick={() => navigate(`/watch/${video._id}`)}
      className="relative  aspect-video rounded-xl overflow-hidden bg-black cursor-pointer group w-full">
        
        
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

      <div className="flex ">
        <div className="relative">
          <MoreHorizontal
            onClick={() => setOpen(!open)}
            e
            className="w-5 h-5 cursor-pointer"
          />

          {open && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Edit
              </button>
              <button 
              onClick={()=>handleDelte(video._id)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
       
    </div>
  );
};

export default VideoCard;
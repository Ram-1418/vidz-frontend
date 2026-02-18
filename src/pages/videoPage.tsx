import { useQuery } from "@tanstack/react-query";
import { getAllVideo } from "@/apiServices/videoService";
import { Video } from "@/types/video.types";
import { useNavigate } from "react-router-dom";

const VideoPage = () => {
  const navigate = useNavigate();

  const {
    data: videos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: getAllVideo,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl font-semibold animate-pulse text-gray-600">
          Loading videos...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-red-500 text-lg font-semibold">
          Something went wrong 😢
        </p>
      </div>
    );

  return (
    <div className="px-6 pt-6">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {videos?.map((video: Video) => (
          <div
            key={video._id}
            onClick={() => navigate(`/watch/${video._id}`)}
            className="cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={video.thumbnail?.replace("http://", "https://")}
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
        ))}
      </div>
    </div>
  );
};

export default VideoPage;

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
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Latest Videos</h1>

      {videos?.length === 0 && (
        <p className="text-gray-500 text-center">No videos available</p>
      )}

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videos?.map((video: Video) => (
          <div
            key={video._id}
            onClick={() => navigate(`/watch/${video._id}`)}
            className="group cursor-pointer"
          >
          c
            {/* Thumbnail */}
                   
            <div className="relative overflow-hidden rounded-xl shadow-md">
              <img
      
             src={video.thumbnail}
                alt={video.title}
                className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay effect */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300" />
            </div>

            {/* Title */}
            <h2 className="mt-3 text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
              {video.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;

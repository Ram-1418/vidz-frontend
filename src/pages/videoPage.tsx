import { useQuery } from "@tanstack/react-query";
import { getAllVideo } from "@/apiServices/videoService";
import { VideoWithOwner } from "@/types/video.types";
import VideoCard from "@/components/videos/VideoCard";

const VideoPage = () => {
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
        {videos?.map((video: VideoWithOwner) => (
          <VideoCard video={video} key={video._id} />
        ))}
      </div>
    </div>
  );
};

export default VideoPage;

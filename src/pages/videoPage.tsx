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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-3 gap-6">
      {videos?.map((video: Video) => (
        <div
          key={video._id}
          className="cursor-pointer"
          onClick={() => navigate(`/watch/${video._id}`)}
        >
          {/* Thumbnail */}
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full rounded-lg object-cover"
          />

          {/* Title */}
          <h2 className="text-lg font-semibold mt-2">{video.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default VideoPage;

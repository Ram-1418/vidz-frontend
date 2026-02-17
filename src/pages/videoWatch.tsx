import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getVideoById } from "@/apiServices/videoService";

const VideoWatch = () => {
  const { id } = useParams();

  const { data: video, isLoading, error } = useQuery({
    queryKey: ["video", id],
    queryFn: () => getVideoById(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Video not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <video
        controls
        src={video?.videoFile}
        className="w-full rounded-lg"
      />

      <h1 className="text-2xl font-bold mt-4">{video?.title}</h1>
      <p className="text-gray-600 mt-2">{video?.description}</p>
    </div>
  );
};

export default VideoWatch;

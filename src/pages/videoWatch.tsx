import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getVideoById } from "@/apiServices/videoService";
import { toggleVideoLike } from "@/apiServices/likeService";
import { toggleSubscription } from "@/apiServices/subscritionServic";
import { useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";
import VideoComments from "@/components/videos/VideoComments";
import { Link } from "react-router-dom";

const VideoWatch = () => {
  const { id } = useParams();
  const [isLiked, setisLiked] = useState(false);
  const [likeCount, setlikeCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const {
    data: video,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["video", id],
    queryFn: () => getVideoById(id!),
    enabled: !!id,
  });
  useEffect(() => {
    if (video) {
      setisLiked(video.isLiked);
      setlikeCount(video.likes);
      setIsSubscribed(video.owner.isSubscribed);
    }
  }, [video]);
  const handleLike = async () => {
    try {
      setloading(true);

      const result = await toggleVideoLike(id!);
      console.log("result", result.isLiked);
      setisLiked(result.isLiked);
      setlikeCount(result.likeCount);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  const ownerId = video?.owner?._id;
  const handleSubscribe = async () => {
    try {
      if (!ownerId) return;

      const response = await toggleSubscription(ownerId);

      if (response?.data) {
        setIsSubscribed(response.data.isSubscribed);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Video not found</p>;

  return (
    <div className="px-6 pt-6 flex gap-6">
      {/* LEFT SIDE - Main Video */}
      <div className="flex-1 max-w-4xl">
        {/* Video Player */}
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
          <video controls className="w-full h-full">
            <source src={video?.videoFile} height={200} type="video/mp4" />
          </video>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold mt-4">{video?.title}</h1>

        {/* Views + Buttons */}
        <div className="flex justify-between items-center mt-3 flex-wrap gap-3">
          <p className="text-sm text-gray-600">{video.views}</p>

          <div className="flex gap-3">
            <button
              onClick={handleLike}
              disabled={loading}
              className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm${
                isLiked ? "bg-blue-100 text-blue-600" : "bg-gray-100"
              }`}
            >
              <ThumbsUp />
              {likeCount}
              {isLiked ? "Liked" : "Like"}
            </button>
          </div>
        </div>

        {/* Channel Section */}
        <div className="flex justify-between items-center mt-6 border-t pt-6">
          {/* LEFT SIDE - OWNER INFO */}
          <div className="flex items-center gap-4 group">
            {/* Avatar */}
            <div className="relative">
              <Link
                to={`/profile/${video.owner.username}`}
                className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition"
              >
                <img
                  src={video.owner.avatar}
                  className="w-10 h-10 rounded-full"
                />
                <p className="font-semibold">{video.owner.username}</p>
              </Link>
            </div>

            {/* Name & Subscribers */}
            <div>
              <p className="font-semibold text-lg flex items-center gap-1">
                {video.owner.username}
                <span className="text-blue-500 text-sm">✔</span>
              </p>
              <p className="text-sm text-gray-500">10K subscribers</p>
            </div>
          </div>

          {/* RIGHT SIDE - SUBSCRIBE BUTTON */}
          <button
            onClick={handleSubscribe}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isSubscribed
                ? "bg-gray-200 text-black hover:bg-gray-300"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>

        {/* Description */}
        <div className="bg-gray-100 p-4 rounded-lg mt-4 text-sm">
          {video?.description}
        </div>
        <div>
          <VideoComments />
        </div>
      </div>

      {/* RIGHT SIDE - Suggested Videos (Static for now) */}
      {/* <div className="w-80 hidden lg:block">
        <p className="font-semibold mb-4">Up next</p>

        <div className="space-y-4">
          <div className="flex gap-3 cursor-pointer">
            <div className="w-32 h-20 bg-gray-300 rounded"></div>
            <div>
              <p className="text-sm font-semibold line-clamp-2">
                Suggested Video Title
              </p>
              <p className="text-xs text-gray-500">Channel Name</p>
              <p className="text-xs text-gray-500">5K views</p>
            </div>
          </div>

          <div className="flex gap-3 cursor-pointer">
            <div className="w-32 h-20 bg-gray-300 rounded"></div>
            <div>
              <p className="text-sm font-semibold line-clamp-2">
                Another Suggested Video
              </p>
              <p className="text-xs text-gray-500">Channel Name</p>
              <p className="text-xs text-gray-500">2K views</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default VideoWatch;

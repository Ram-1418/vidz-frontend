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
    <div className="border border-red-700 flex justify-center">
      <div className="w-full max-w-6xl flex gap-8">
        {/* LEFT SIDE */}
        <div className="flex-1 max-w-4xl">
          {/* Video Player */}
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
            <video controls className="w-full h-full rounded-xl">
              <source src={video?.videoFile} type="video/mp4" />
            </video>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mt-4 leading-snug">
            {video?.title}
          </h1>

          {/* Views + Action Buttons */}
          <div className="flex justify-between items-center mt-4 flex-wrap gap-4">
            {/* Views */}
            {/* <div className="text-sm text-gray-600">
              {video?.views} views • 1 day ago
            </div> */}

            {/* Action Buttons (YT Style) */}
          </div>

          {/* Channel Section (Subscribe beside profile) */}
          <div className="flex items-center justify-between mt-6 border-t pt-6">
            {/* LEFT: Avatar + Name + Subscribe */}
            <div className="flex items-center gap-4">
              <Link
                to={`/profile/${video.owner.username}`}
                className="flex items-center gap-3"
              >
                <img
                  src={video.owner.avatar}
                  className="w-12 h-12 rounded-full"
                />

                <div>
                  <p className="font-semibold text-lg">
                    {video.owner.username}
                  </p>
                  <p className="text-sm text-gray-500">10K subscribers</p>
                </div>
              </Link>

              {/* Subscribe Button beside profile */}
              <button
                onClick={handleSubscribe}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  isSubscribed
                    ? "bg-gray-200 text-black hover:bg-gray-300"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>

              <div className="flex items-center gap-3">
                {/* Like */}
                <button
                  onClick={handleLike}
                  disabled={loading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                    isLiked ? "bg-gray-300" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <ThumbsUp size={18} />
                  {likeCount}
                </button>

                {/* Share */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied!");
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 transition"
                >
                  🔗 Share
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-100 p-4 rounded-xl mt-4 text-sm leading-relaxed">
            {video?.description}
          </div>

          {/* Comments */}
          <div className="mt-6">
            <VideoComments video={video} />
          </div>
        </div>

        {/* RIGHT SIDE - Suggested Videos */}
        <div className="w-80 hidden lg:block">
          <p className="font-semibold mb-4">Up next</p>

          <div className="space-y-4">
            <div className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition">
              <div className="w-40 h-24 bg-gray-300 rounded-lg"></div>
              <div>
                <p className="text-sm font-semibold line-clamp-2">
                  Suggested Video Title
                </p>
                <p className="text-xs text-gray-500">Channel Name</p>
                <p className="text-xs text-gray-500">5K views</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoWatch;

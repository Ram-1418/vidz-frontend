import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getVideoById } from "@/apiServices/videoService";
import { toggleVideoLike } from "@/apiServices/likeService";
import { toggleSubscription } from "@/apiServices/subscritionServic";
import { useEffect, useState } from "react";
import { ThumbsUp, Share2 } from "lucide-react";
import VideoComments from "@/components/videos/VideoComments";
import { addToWatchHistory } from "@/apiServices/userAuth";

const VideoWatch = () => {
  const { id } = useParams();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { data: video, isLoading, error } = useQuery({
    queryKey: ["video", id],
    queryFn: () => getVideoById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (video) {
      setIsLiked(video.isLiked);
      setLikeCount(video.likes);
      setIsSubscribed(video.owner.isSubscribed);
      addToWatchHistory(video._id)
    }
  }, [video]);

  useEffect(()=>{
    if (!video?._id) return;

    const timer=setTimeout(()=>{
      addToWatchHistory(video._id);
    },5000);

    return ()=>clearTimeout(timer);
  },[video])

  const handleLike = async () => {
    try {
      setLoading(true);
      const result = await toggleVideoLike(id!);
      setIsLiked(result.isLiked);
      setLikeCount(result.likeCount);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!video?.owner?._id) return;
    const res = await toggleSubscription(video.owner._id);
    if (res?.data) setIsSubscribed(res.data.isSubscribed);
  };

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6">Video not found</p>;

  return (
    <div className="flex justify-center px-4 lg:px-8">
      <div className="w-full max-w-[1400px] flex flex-col lg:flex-row gap-6 mt-4">

        {/* LEFT SIDE */}
        <div className="flex-1 max-w-[900px]">

          {/* Video */}
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
            <video controls className="w-full h-full">
              <source src={video?.videoFile} type="video/mp4" />
            </video>
          </div>

          {/* Title */}
          <h1 className="text-lg md:text-xl font-semibold mt-4 leading-snug">
            {video?.title}
          </h1>

          {/* Channel + Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">

            {/* Channel Info */}
            <div className="flex items-center gap-4">
              <Link to={`/profile/${video.owner.username}`}>
                <img
                  src={video.owner.avatar}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                />
              </Link>

              <div>
                <p className="font-semibold">{video.owner.username}</p>
                <p className="text-xs text-gray-500">10K subscribers</p>
              </div>

              {/* Subscribe */}
              <button
                onClick={handleSubscribe}
                className={`ml-2 px-4 py-2 rounded-full text-sm font-semibold transition ${isSubscribed
                    ? "bg-gray-200 hover:bg-gray-300"
                    : "bg-red-600 text-white hover:bg-red-700"
                  }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">

              {/* Like */}
              <button
                onClick={handleLike}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${isLiked
                    ? "bg-gray-300"
                    : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                <ThumbsUp size={18} />
                {likeCount}
              </button>

              {/* Share */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-gray-100 hover:bg-gray-200"
              >
                <Share2 size={18} />
                Share
              </button>
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

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-[350px] hidden lg:block">
          <p className="font-semibold mb-4">Up next</p>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
              >
                <div className="w-40 h-24 bg-gray-300 rounded-lg"></div>
                <div>
                  <p className="text-sm font-semibold line-clamp-2">
                    Suggested Video Title
                  </p>
                  <p className="text-xs text-gray-500">Channel Name</p>
                  <p className="text-xs text-gray-500">5K views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VideoWatch;
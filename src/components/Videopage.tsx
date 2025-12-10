import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllVideo } from "@/apiServices/videoService";
import AddComment from "./Addcomment";
import Comments from "./Comments";
import { toggleSubscription } from "@/apiServices/subscritionServic";
import { toggleVideoLike } from "@/apiServices/likeService";

type VideoType = {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  thumbnail: string;
  duration: number;
  likes?: number;
  isLikedByUser?: boolean;
  isSubscribedToOwner?: boolean;
  owner: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
  };
};

const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<VideoType | null>(null);
  const [loading, setLoading] = useState(true);

  // Frontend UI states
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Fetch video
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const res = await getAllVideo();
        const foundVideo = res?.data.docs.find((v: VideoType) => v._id === id);

        if (foundVideo) {
          setVideo(foundVideo);

          // Initialize UI states
          setIsSubscribed(foundVideo.isSubscribedToOwner || false);
          setIsLiked(foundVideo.isLikedByUser || false);
          setLikeCount(foundVideo.likes || 0);
        }
      } catch (error) {
        console.error("❌ Failed to fetch video:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  // Subscribe Handler
  const handleSubscribr = async (channelID: string) => {
    try {
      const response = await toggleSubscription(channelID);
      setIsSubscribed(!isSubscribed); // toggle UI instantly
      console.log("Subscription toggled:", response);
    } catch (error) {
      console.log("Subscription Error:", error);
    }
  };

  // Like Handler
  const handleLike = async (videoId: string) => {
    try {
      const res = await toggleVideoLike(videoId);

      if (isLiked) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }

      setIsLiked(!isLiked);

      console.log("Like toggled:", res);
    } catch (error) {
      console.log("Like Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-700">
        Loading video...
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-700">
        Video not found.
      </div>
    );
  }

  return (
    <div className="flex justify-center px-6 py-4 gap-10 bg-white">

      {/* LEFT CONTENT */}
      <div className="max-w-[900px] w-full">

        {/* VIDEO PLAYER */}
        <div className="w-full bg-black rounded-xl shadow-lg overflow-hidden">
          <video
            src={video.videoFile}
            controls
            autoPlay
            className="w-full h-[520px] object-contain"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold mt-4 text-black">
          {video.title}
        </h1>

        {/* ACTION BAR */}
        <div className="flex justify-between items-start mt-4">

          {/* CHANNEL INFO */}
          <div className="flex gap-3 items-start">
            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
              <img src={video.owner.avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
            </div>

            <div>
              <p className="font-semibold text-black text-base">
                {video.owner.username}
              </p>
              <p className="text-xs text-gray-500">1.2M subscribers</p>
            </div>

            {/* SUBSCRIBE BUTTON */}
            <button
              onClick={() => handleSubscribr(video.owner._id)}
              className={`ml-4 px-5 py-2 rounded-full text-sm font-semibold transition
                ${isSubscribed ? "bg-gray-300 text-black" : "bg-black text-white"}
              `}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          {/* LIKE BUTTON */}
          <div className="flex items-center gap-3">

            <div className="flex items-center bg-gray-100 rounded-full border shadow-sm overflow-hidden">
              <button
                className={`px-4 py-2 transition text-sm ${
                  isLiked ? "bg-blue-200" : "hover:bg-gray-200"
                }`}
                onClick={() => handleLike(video._id)}
              >
                👍 {isLiked ? "Liked" : "Like"} {likeCount}
              </button>

              <div className="w-[1px] bg-gray-300 h-6"></div>

              
            </div>

            <button className="px-4 py-2 bg-gray-100 rounded-full border hover:bg-gray-200 text-sm shadow-sm">
              Share
            </button>

            <button className="p-2 bg-gray-100 rounded-full border shadow-sm hover:bg-gray-200">
              ⋮
            </button>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-5 bg-gray-100 rounded-xl p-4 shadow-sm text-sm text-gray-800">
          <p>{video.description || "No description available."}</p>
        </div>

        {/* COMMENTS */}
        <div className="mt-8">
          <AddComment />
          <Comments />
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-[340px] flex flex-col gap-4">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="flex gap-3 group cursor-pointer">
            <div className="w-40 h-24 bg-gray-300 rounded-lg group-hover:opacity-80 transition"></div>

            <div className="flex flex-col">
              <p className="font-semibold text-sm text-black group-hover:underline">
                Recommended Video Title {n}
              </p>
              <p className="text-xs text-gray-600">Channel Name</p>
              <p className="text-xs text-gray-500">1M views • 2 years ago</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default VideoPage;

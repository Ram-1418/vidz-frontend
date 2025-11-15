import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllVideo } from "@/apiServices/videoService";
import AddComment from "./Addcomment";
import Comments from "./Comments";

type VideoType = {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  thumbnail: string;
  duration: number;
  channelName?: string;
};

const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<VideoType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const data = await getAllVideo();
        const foundVideo = data?.data.docs.find((v: VideoType) => v._id === id);
        setVideo(foundVideo || null);
      } catch (error) {
        console.error("❌ Failed to fetch video:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  // LOADING UI
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Loading video...
      </div>
    );
  }

  // VIDEO NOT FOUND
  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Video not found.
      </div>
    );
  }

  // MAIN YOUTUBE-STYLE UI
  return (
    <div className="max-w-5xl mx-auto p-4 border border-red-700 " >

      {/* VIDEO PLAYER */}
      <div className="w-full bg-black rounded-lg overflow-hidden">
        <video
          src={video.videoFile}
          controls
          autoPlay
          className="w-full h-[500px] object-contain"
        />
      </div>

      {/* VIDEO TITLE */}
      <h1 className="text-xl font-semibold mt-4 text-gray-900">
        {video.title}
      </h1>

      {/* ACTION BAR */}
      <div className="flex items-center justify-between mt-3">

        {/* LEFT — CHANNEL INFO */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
            {video.channelName?.charAt(0) || "C"}
          </div>

          <div>
            <p className="font-semibold text-gray-900 text-sm">
              {video.channelName || "Channel Name"}
            </p>
            <p className="text-xs text-gray-500">1.2M subscribers</p>
          </div>

          <button className="ml-3 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
            Subscribe
          </button>
        </div>

        {/* RIGHT — LIKE/SHARE */}
        <div className="flex items-center gap-2">

          {/* LIKE / DISLIKE */}
          <div className="flex items-center bg-gray-100 rounded-full 
                          overflow-hidden border border-gray-300">
            
            <button className="px-4 py-2 hover:bg-gray-200 transition text-sm font-medium flex items-center gap-1">
              👍 <span>Like</span>
            </button>

            <div className="w-[1px] bg-gray-300 h-6"></div>

            <button className="px-4 py-2 hover:bg-gray-200 transition text-sm font-medium">
              👎 <span>Unlike</span>
            </button>
          </div>

          {/* SHARE */}
          <button className="px-4 py-2 bg-gray-100 rounded-full text-sm 
                             hover:bg-gray-200 transition border border-gray-300">
            Share
          </button>

          {/* MORE */}
          <button className="p-2 bg-gray-100 rounded-full border border-gray-300 hover:bg-gray-200 transition">
            ⋮
          </button>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-b border-gray-300 my-5"></div>

      {/* COMMENTS */}
      <AddComment />
      <Comments />
    </div>
  );
};

export default VideoPage;

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
    <div className="max-w-6xl mx-auto p-4">

      {/* VIDEO PLAYER */}
      <div className="w-full bg-black rounded-xl shadow-xl overflow-hidden">
        <video
          src={video.videoFile}
          controls
          autoPlay
          className="w-full h-[520px] object-contain"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-2xl font-bold mt-4 text-gray-900 leading-tight">
        {video.title}
      </h1>

      {/* ACTION BAR */}
      <div className="flex items-start justify-between mt-4 flex-wrap gap-4">

        {/* LEFT - CHANNEL */}
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 font-semibold text-lg shadow">
            {video.channelName?.charAt(0) || "C"}
          </div>

          <div>
            <p className="font-semibold text-gray-900 text-base">
              {video.channelName || "Channel Name"}
            </p>
            <p className="text-xs text-gray-500">1.2M subscribers</p>
          </div>

          <button className="ml-3 px-5 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900 transition shadow-md">
            Subscribe
          </button>
        </div>

        {/* RIGHT - ACTION BUTTONS */}
        <div className="flex items-center gap-3">

          {/* LIKE/UNLIKE */}
          <div className="flex items-center bg-gray-100 rounded-full overflow-hidden border border-gray-300 shadow-sm">

            <button className="px-4 py-2 hover:bg-gray-200 transition text-sm font-medium flex items-center gap-1">
              👍 Like
            </button>

            <div className="w-[1px] bg-gray-300 h-6"></div>

            <button className="px-4 py-2 hover:bg-gray-200 transition text-sm font-medium">
              👎 Unlike
            </button>
          </div>

          {/* SHARE */}
          <button className="px-4 py-2 bg-gray-100 rounded-full border border-gray-300 hover:bg-gray-200 transition text-sm shadow-sm">
            Share
          </button>

          {/* MORE */}
          <button className="p-2 bg-gray-100 rounded-full border border-gray-300 hover:bg-gray-200 transition shadow-sm">
            ⋮
          </button>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-b border-gray-300 my-6"></div>

      {/* COMMENTS */}
      <AddComment />
      <Comments />
    </div>
  );
};

export default VideoPage;

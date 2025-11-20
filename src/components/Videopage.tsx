import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllVideo } from "@/apiServices/videoService";
import AddComment from "./Addcomment";
import Comments from "./Comments";
import {toggleSubscription}from "@/apiServices/subscritionServic"


type VideoType = {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  thumbnail: string;
  duration: number;
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
  const [subscribe, setsubscribe] = useState('')

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

  useEffect(()=>{
    console.log("VIDEO LOADED:", video);
  },[video])

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


  async function handleSubscribr(channelID: string) {
    try {
      const data=await toggleSubscription(channelID)
      console.log('data', data)
      
    } catch (error) {
      console.log('error', error)
      
    }
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
        <h1 className="text-2xl font-bold mt-4 text-black leading-snug">
          {video.title}
        </h1>

        {/* ACTION BAR */}
        <div className="flex justify-between items-start mt-4">

          {/* CHANNEL INFO */}
          <div className="flex gap-3 items-start">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold text-lg text-gray-800">
              {video.channelName?.charAt(0) || "C"}
            </div>

            <div>
              <p className="font-semibold text-black text-base">
                {video.channelName || "Channel Name"}
              </p>
              <p className="text-xs text-gray-500">1.2M subscribers</p>
            </div>

            <button 
            onClick={()=>handleSubscribr(video.owner._id)}
            className="ml-4 px-5 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-900 transition">
              Subscribe
            </button>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">

            <div className="flex items-center bg-gray-100 rounded-full border shadow-sm overflow-hidden">
              <button className="px-4 py-2 hover:bg-gray-200 transition text-sm">
                👍 Like
              </button>
              <div className="w-[1px] bg-gray-300 h-6"></div>
              <button className="px-4 py-2 hover:bg-gray-200 transition text-sm">
                👎 Dislike
              </button>
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

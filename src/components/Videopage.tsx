import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllVideo } from "@/apiServices/videoService";
import AddComment from "./Addcomment";


// Types
type VideoType = {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  thumbnail: string;
  duration: number;
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
      <div className="flex justify-center items-center min-h-screen text-lg">
        Loading video...
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Video not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Video Player */}
      <div className="w-full bg-black rounded-lg overflow-hidden">
        <video
          src={video.videoFile}
          controls
          autoPlay
          className="w-full h-[500px] object-contain"
        />
      </div>

      {/* Video Title */}
      <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
     <AddComment videoId={video._id} />

    </div>
  );
};

export default VideoPage;

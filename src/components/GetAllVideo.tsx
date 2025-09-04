import React, { useEffect, useState } from "react";
import { getAllVideo } from "@/apiServices/videoService";


type VideoType = {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  duration: number;
  publicId: string;
};

const GetAllVideo = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log('response')
        const response = await getAllVideo();
        const videosData = response.data.docs
        setVideos(videosData)

      } catch (error) {
        console.log("errro fertching video", error)

      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos?.map((video) => (
          <div
            key={video._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Video Preview */}
            <video
              className="w-full h-48 object-cover bg-black"
              controls
            >
              <source src={video.videoFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>


            {/* Video Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {video.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {video.description}
              </p>
            </div>

            {/* Footer with actions (optional) */}
            <div className="px-4 pb-4 flex justify-between text-sm text-gray-500">
              <button className="text-blue-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default GetAllVideo

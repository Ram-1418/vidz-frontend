import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllVideo } from "@/apiServices/videoService"; 

// Types
type VideoType = {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  thumbnail: string;
  duration: number;
};


type CommentType = {
  id: string;
  user: string;
  text: string;
};

const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [video, setVideo] = useState<VideoType | null>(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const data = await getAllVideo();
        const foundVideo = data?.data.docs.find((v: VideoType) => v._id === id);
        setVideo(foundVideo || null);

     
        setLikes(Math.floor(Math.random() * 100)); 
        setDislikes(Math.floor(Math.random() * 10));

        
        setComments([
          { id: "1", user: "John", text: "Awesome video! 🎉" },
          { id: "2", user: "Alice", text: "Very helpful, thanks!" },
        ]);
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

  // Handle comment submit
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: CommentType = {
      id: Date.now().toString(),
      user: "You",
      text: newComment,
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

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

      {/* Like / Dislike buttons */}
      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={() => setLikes(likes + 1)}
          className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300"
        >
          👍 {likes}
        </button>
        <button
          onClick={() => setDislikes(dislikes + 1)}
          className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300"
        >
          👎 {dislikes}
        </button>
      </div>

      {/* Description */}
      <div className="mt-4 bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-700">
          {showFullDescription
            ? video.description
            : video.description.slice(0, 150) + (video.description.length > 150 ? "..." : "")}
        </p>
        {video.description.length > 150 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-blue-600 text-sm mt-2"
          >
            {showFullDescription ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Comments ({comments.length})</h2>

        {/* Add Comment */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Post
          </button>
        </div>

        {/* Comment List */}
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="bg-white p-3 rounded-lg shadow-sm border">
              <p className="text-sm font-semibold">{c.user}</p>
              <p className="text-gray-700">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;

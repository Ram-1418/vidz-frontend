import React, { useState } from "react";
import { addComment } from "../apiServices/commentService";
import { DeleteComment } from "./Deletcomment";
import { toggleVideoLike } from "@/apiServices/likeService";

interface CommentType {
  _id: string;
  content: string;
  createdAt: string;
  owner: string;
  video: string;
}

interface AddCommentProps {
  videoId: string;
}

const AddComment: React.FC<AddCommentProps> = ({ videoId }) => {
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      const data = await toggleVideoLike(videoId);
      console.log("Like toggled:", data);
  setLiked(data.data.isLiked);
    } catch (error) {
      console.error("Error during like:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);
    setStatus("");

    try {
      const response = await addComment(videoId, comment);
      const addedComment = response.data?.comment;

      setStatus("Comment added!");
      setComments((prev) => [addedComment, ...prev]);
      setComment("");
    } catch (error) {
      setStatus("Error adding comment.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !comment.trim();

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {/* Like / Dislike */}
      <div className="flex items-center gap-3 mt-4">
        <button
          type="button"
          onClick={handleLike}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold shadow-md transition duration-200
            ${
              liked
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-black hover:bg-gray-700 text-white"
            }`}
        >
          👍 {liked ? "Liked" : "Like"}
        </button>

        <button
          type="button"
          className="bg-black text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-200 shadow-md hover:shadow-lg"
        >
          👎 Dislike
        </button>
      </div>

      {/* Comment input */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />

      {/* Submit button */}
      <button
        type="submit"
        disabled={isDisabled}
        className={`px-5 py-2 rounded-md text-white transition duration-200 ${
          isDisabled
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>

      {/* Status message */}
      {status && (
        <div
          className={`text-sm font-medium ${
            status.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {status}
        </div>
      )}

      {/* Comments list */}
      <ul className="space-y-2">
        {comments.map((comment) => (
          <li
            key={comment._id}
            className="p-3 border border-gray-200 rounded-md bg-gray-50"
          >
            {comment.content} <DeleteComment commentId={comment._id} />
            <p className="text-xs text-gray-500">
              Posted on {new Date(comment.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default AddComment;

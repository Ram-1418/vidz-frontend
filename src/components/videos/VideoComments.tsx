import {
  addComment,
  getVideoComments,
  deleteComment as deleteCommentApi,
} from "@/apiServices/commentService";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toggleCommentLike } from "@/apiServices/likeService";
import { useParams } from "react-router-dom";
import { Comment } from "@/types/comments.typs";
import { useState } from "react";
import { ThumbsUp, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

interface VideoCommentsProps {
  video: any;
}

interface AddCommentProps {
  id?: string;
  video: any;
}

const VideoComments = ({ video }: VideoCommentsProps) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // ✅ Fetch Comments
  const {
    data: commentsData,
    isLoading,
    error,
  } = useQuery<{
    comments: Comment[];
    totalPages: number;
    page: number;
  }>({
    queryKey: ["comments", id],
    queryFn: () => getVideoComments(id!, 1),
    enabled: !!id,
  });

  const comments = commentsData?.comments || [];

  const deleteMutation = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", id],
      });
    },
  });

  const toggleLikeMutation = useMutation({
    mutationFn: toggleCommentLike,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", id],
      });
    },
  });

  return (
    <div className="mt-6 ml-6 max-w-2xl">
      <h2 className="font-semibold text-lg mb-6">{comments.length} Comments</h2>

      <AddCommentData id={id} video={video} />

      {isLoading && <p>Loading comments...</p>}
      {error && <p>Failed to load comments</p>}

      {comments.map((comment) => (
        <div key={comment._id} className="flex gap-3 py-4 border-b">
          {/* Avatar */}
          <img
            src={comment.owner.avatar}
            alt={comment.owner.username}
            className="w-10 h-10 rounded-full"
          />

          {/* Comment Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">{comment.owner.username}</span>
              <span className="text-gray-500 text-xs">Just now</span>
            </div>

            <p className="text-sm mt-1 text-gray-800">{comment.content}</p>

            {/* Actions Row */}
            <div className="flex items-center gap-6 mt-2 text-gray-600 text-sm">
              {/* Like Button */}
              <button
                onClick={() => toggleLikeMutation.mutate(comment._id)}
                className="flex items-center gap-1 hover:text-black"
              >
                <ThumbsUp size={16} />
                <span>{comment.likesCount || 0}</span>
              </button>

              {/* Reply Button */}
              <button className="hover:text-black">Reply</button>

              {/* 🔥 Edit Button (UI only) */}
              <button
                onClick={() => alert("Edit functionality coming soon 😎")}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <Pencil size={16} />
                Edit
              </button>

              {/* Delete Button */}
              <button
                onClick={() => deleteMutation.mutate(comment._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// 🔥 ADD COMMENT COMPONENT
const AddCommentData = ({ id, video }: AddCommentProps) => {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleComment = async () => {
    if (!newComment.trim() || !id) return;

    try {
      setLoading(true);

      await addComment(id, newComment);

      queryClient.invalidateQueries({
        queryKey: ["comments", id],
      });

      setNewComment("");
    } catch (error) {
      console.log("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-3 mb-6">
      <div>
        {video?.owner && (
          <Link
            to={`/profile/${video.owner.username}`}
            className="flex items-center gap-3"
          >
            <img
              src={video.owner.avatar}
              alt={video.owner.username}
              className="w-10 h-10 rounded-full"
            />
          </Link>
        )}
      </div>

      <div className="flex-1">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
        />

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => setNewComment("")}
            className="px-4 py-1 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleComment}
            disabled={loading}
            className="bg-black text-white px-4 py-1 text-sm rounded-full disabled:opacity-50"
          >
            {loading ? "Posting..." : "Comment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoComments;

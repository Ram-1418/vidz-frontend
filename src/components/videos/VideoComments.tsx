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
import { ThumbsUp } from "lucide-react";

const VideoComments = () => {
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
    <div className="mt-6 ml-6">
      <h2 className="font-semibold mb-4">Comments</h2>

      <AddCommentData id={id} />
      {isLoading && <p>Loading comments...</p>}
      {error && <p>Failed to load comments</p>}
      {comments.map((comment) => (
        <div key={comment._id} className="border-b py-3">
          <div className="flex items-center gap-3">
            <img
              src={comment.owner.avatar}
              alt={comment.owner.username}
              className="w-8 h-8 rounded-full "
            />
            <p className="font-semibold text-sm">{comment.owner.username}</p>
          </div>

          <p className="text-sm text-gray-700 mt-2 font-bold">
            {comment.content}
          </p>

          {/* 🔥 Delete Button */}
          <div className=" flex  justify-between ">
            <button
              onClick={() => deleteMutation.mutate(comment._id)}
              className="rounded-full text-xs mt-2 bg-black text-white p-2 font-bold"
            >
              Delete
            </button>

            <button
              onClick={() => {
                toggleLikeMutation.mutate(comment._id);
              }}
              className=" h-[5px]"
            >
              <ThumbsUp />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// 🔥 ADD COMMENT COMPONENT
const AddCommentData = ({ id }: { id?: string }) => {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleComment = async () => {
    if (!newComment.trim() || !id) return;

    try {
      setLoading(true);

      await addComment(id, newComment);

      // 🔥 Refetch Comments
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
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1  px-3 py-2 rounded-full transform-border bg-white shadow-sm placeholder-gray-400 focus:outline-none  border border-gray-300"
      />

      <button
        onClick={handleComment}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded-full"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default VideoComments;

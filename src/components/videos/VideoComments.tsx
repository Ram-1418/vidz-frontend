import { addComment, getVideoComments } from "@/apiServices/commentService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Comment } from "@/types/comments.typs";
import { useState } from "react";

const VideoComments = () => {
  const { id } = useParams();

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

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-4">Comments</h2>

      {/* Add Comment Component */}
      <AddCommentData id={id} />

      {isLoading && <p>Loading comments...</p>}
      {error && <p>Failed to load comments</p>}

      {comments.map((comment) => (
        <div key={comment._id} className="border-b py-3">
          <div className="flex items-center gap-3">
            <img
              src={comment.owner.avatar}
              alt={comment.owner.username}
              className="w-8 h-8 rounded-full"
            />
            <p className="font-semibold text-sm">{comment.owner.username}</p>
          </div>

          <p className="text-sm text-gray-700 mt-2">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

// 🔥 Add Comment Component
const AddCommentData = ({ id }: { id?: string }) => {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleComment = async () => {
    if (!newComment.trim() || !id) return;

    try {
      setLoading(true);

      const createdComment = await addComment(id, newComment);
      // console.log('', )
      queryClient.invalidateQueries({
        queryKey: ["comments", id],
      });
      if (createdComment) {
        setNewComment("");
      }
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
        className="flex-1 border px-3 py-2 rounded"
      />

      <button
        onClick={handleComment}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default VideoComments;

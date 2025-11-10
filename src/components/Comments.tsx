import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getVideoComments, updateComment, } from "@/apiServices/commentService";
import { toggleCommentLike } from "@/apiServices/likeService";
import EditComment from "./EditComment";


interface Comment {
  id: string;
  content: string;
  author?: string;
  createdAt?: string;
}

const Comments = () => {
  const { id: videoId } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [likeComment, setLikeComment] = useState<string>("");

  useEffect(() => { 
    if (!videoId) return;

    const fetchComments = async () => {
      try {
        const data = await getVideoComments(videoId, 1);
        const formatted = (data.comments || []).map((c: any) => ({
          id: c._id || c.id,
          content: c.content,
          author: c.author,
          createdAt: c.createdAt,
        }));
        setComments(formatted);
      } catch (error: any) {
        console.error("Error fetching comments:", error);
        setError("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  const handleDelete = async (commentId: string) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    setDeleting(commentId);

    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      alert("Failed to delete comment");
      console.error("Deleting error:", error);
    } finally {
      setDeleting(null);
    }
  };

  const handleLike = async (commentId: string) => {
    try {
      await toggleCommentLike(commentId);
      setLikeComment(commentId);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUpdateComment = async (commentId: string, newContent: string) => {
    try {
      const data = await updateComment(commentId, newContent);
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, content: newContent } : c))
      );
      console.log("✅ Comment updated successfully:", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-3">
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id}>
            <EditComment
              comment={comment}
              handleUpdateComment={handleUpdateComment}
              handleDelete={handleDelete}
            />

            <button
              onClick={() => handleLike(comment.id)}
              className="text-blue-500 hover:text-blue-700 text-sm mt-2 ml-2"
            >
              {likeComment === comment.id ? "Liked" : "Like"}
            </button>

            {deleting === comment.id && (
              <p className="text-xs text-gray-400 mt-1">Deleting...</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;

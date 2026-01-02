import React, { useState } from "react";
import { deleteComment } from "../apiServices/commentService";

type DeleteCommentProps = {
  commentId: string;
  onDeleteSuccess?: () => void; // optional callback
};

export const DeleteComment: React.FC<DeleteCommentProps> = ({
  commentId,
  onDeleteSuccess,
}) => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (loading) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmed) return;

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      await deleteComment(commentId);
      setStatus("success");
      setMessage("Comment deleted successfully");

      // Notify parent component
      onDeleteSuccess?.();
    } catch (err) {
      console.error("Delete comment failed:", err);
      setStatus("error");
      setMessage("Failed to delete comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleDelete}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-sm font-medium transition
          ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        aria-busy={loading}
      >
        {loading ? "Deleting..." : "Delete Comment"}
      </button>

      {message && (
        <p
          className={`text-sm ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

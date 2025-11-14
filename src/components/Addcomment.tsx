import React, { useState } from "react";
import { addComment } from "@/apiServices/commentService";
import { useParams } from "react-router-dom";

const AddCommentInput: React.FC = () => {
  const { id: videoId } = useParams();
  const [comment, setComment] = useState("");

  async function handleComment() {
    if (!comment.trim()) return;

    try {
      const response = await addComment(String(videoId), comment);
      console.log(response);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-start gap-3 mb-6">
      
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
        U
      </div>

      <div className="flex-1">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full border-b border-gray-300 bg-transparent text-gray-900 p-1.5 resize-none
                     focus:outline-none focus:border-blue-600 text-sm"
          rows={1}
        />

        {/* Buttons (show only when typing) */}
        {comment.trim() && (
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={() => setComment("")}
              className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-full transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleComment}
              className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-full 
                         hover:bg-blue-700 transition"
            >
              Comment
            </button>
          </div>
        )}
        <h2 className="text-xl font-bold text-black">  87,103 Comments</h2>
      </div>
      
    </div>
  );
};

export default AddCommentInput;

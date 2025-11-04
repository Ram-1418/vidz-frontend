import React, { useState } from "react";
import { addComment } from "@/apiServices/commentService";
import { useParams } from "react-router-dom";



const AddCommentInput: React.FC = () => {
  const { id: videoId } = useParams()
  console.log('videoId', videoId)
  const [comment, setComment] = useState("");
  async function handleComment() {
    if (!comment.trim()) {
      throw new Error("someting went wrong")
    }
    try {
      const response = await addComment(String(videoId), comment)
      console.log(response);
      setComment('')



    } catch (error) {
      console.log(error)

    }

  }



  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      {/* Comment Count */}
      <h2 className="text-sm font-semibold mb-4 text-gray-900">2 Comments</h2>

      {/* Comment Input Section */}
      <div className="flex items-start gap-3">
        {/* Profile Icon */}
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
          U
        </div>

        {/* Input Area */}
        <div className="flex-1">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border-b border-gray-300 bg-transparent text-gray-800 p-2 resize-none focus:outline-none focus:border-b-2 focus:border-blue-600 transition"
            rows={1}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => setComment("")}
              className="px-4 py-1 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleComment}
              disabled={!comment.trim()}
              className={`px-4 py-1 text-sm font-medium rounded-full ${!comment.trim()
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Comment
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCommentInput;

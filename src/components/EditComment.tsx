import React, { useState } from "react";

const EditComment = ({ comment, handleUpdateComment, handleDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.content);

  const handleSave = async () => {
    await handleUpdateComment(comment.id, editedText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-start gap-3 py-3">

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
        {comment.author?.charAt(0) || "U"}
      </div>

      <div className="flex-1">

        {/* Username + Date */}
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm text-gray-900">{comment.author}</p>
          <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toDateString()}
          </p>
        </div>

        {/* Comment or Edit Mode */}
        {!isEditing ? (
          <>
            <p className="mt-1 text-sm text-gray-800 leading-relaxed">
              {comment.content}
            </p>

            {/* Action bar (Like, Dislike, Edit, Delete) */}
            <div className="flex items-center gap-4 mt-2">

              {/* LIKE */}
              <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition text-sm">
                👍 <span className="text-xs text-gray-500">12</span>
              </button>

              {/* DISLIKE */}
              <button className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition text-sm">
                👎
              </button>

              {/* EDIT */}
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 hover:bg-gray-200 transition text-sm font-medium flex items-center gap-1"
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                onClick={() => handleDelete(comment.id)}
                className="px-4 py-2 hover:bg-gray-200 transition text-sm font-medium flex items-center gap-1"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <div className="mt-2">
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full border-b border-gray-300 bg-transparent text-gray-900 p-1.5 resize-none 
                         focus:outline-none focus:border-blue-600 text-sm"
            />

            <div className="flex gap-3 mt-3 justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-full transition text-xs"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-xs"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditComment;

import React, { useState } from "react";

const EditComment = ({ comment, handleUpdateComment, handleDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.content);

  const handleSave = async () => {
    await handleUpdateComment(comment.id, editedText);
    setIsEditing(false);
  };

  return (
    <div className="p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-50">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full border p-2 rounded-md text-sm"
            placeholder="Edit your comment..."
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") setIsEditing(false);
            }}
          />
          <div className="flex space-x-2">
            <button onClick={handleSave} className="text-blue-500 hover:text-blue-700 text-sm">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700 text-sm">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-800">{comment.content}</p>
          {comment.author && (
            <p className="text-sm text-gray-500 mt-1">– {comment.author}</p>
          )}
          <p className="text-xs text-gray-400">
            {new Date(comment.createdAt).toDateString()}
          </p>

          <div className="flex space-x-3 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(comment.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditComment;

import React, { useState } from 'react';
import { addComment } from '../apiServices/commentService';

interface AddCommentProps {
  videoId: string;
}

const AddComment: React.FC<AddCommentProps> = ({ videoId }) => {
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);
    setStatus('');

    try {
      await addComment(videoId, comment);
      setStatus('Comment added!');
      setComment('');
    } catch (error) {
      setStatus('Error adding comment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />
      <button
        type="submit"
        disabled={loading || !comment.trim()}
        className={`px-5 py-2 rounded-md text-white transition duration-200 ${
          loading || !comment.trim()
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>

      {status && (
        <div
          className={`text-sm font-medium ${
            status.includes('Error') ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {status}
        </div>
      )}
    </form>
  );
};

export default AddComment;

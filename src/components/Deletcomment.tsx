import React, { useState } from 'react';
import { deleteComment } from '../apiServices/commentService';

export const DeleteComment = ({ commentId }:{commentId:string}) => {
  const [deleteStatus, setDeleteStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setDeleteStatus('');
    try {
      await deleteComment(commentId);
      setDeleteStatus('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comment:', error);
      setDeleteStatus('Failed to delete comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete Comment'}
      </button>
      {deleteStatus && 
      <p>{deleteStatus}</p>}
    </div>
  );
};

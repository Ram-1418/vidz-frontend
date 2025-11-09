import React, { useEffect, useState } from 'react';
import { deleteComment, getVideoComments } from '@/apiServices/commentService';
import { useParams } from 'react-router-dom';
import { toggleCommentLike } from '../apiServices/likeService'
import {updateComment} from '../apiServices/commentService'
import { string } from 'zod';

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
  const [likecomment, setlikecomment] = useState('')
  const [updatecomment, setupdatecomment] = useState('')





  useEffect(() => {
    if (!videoId) return;

    const fetchComments = async () => {
      try {
        const data = await getVideoComments(videoId, 1);
        const formatted = (data.comments || []).map((c: any) => ({
          id: c.id || c._id, // ensure consistent id
          content: c.content,
          author: c.author,
          createdAt: c.createdAt,
        }));
        setComments(formatted);
      } catch (error: any) {
        console.error('Error fetching comments:', error);
        setError('Failed to load comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  const handleDelete = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    setDeleting(commentId);

    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      console.log("Deleting comment ID:", commentId);

    } catch (error) {
      alert('Failed to delete comment');
      console.error('Deleting error:', error);
    } finally {
      setDeleting(null);
    }
  };


  const handleLike = async (commentId: string) => {
    try {
      const data = await toggleCommentLike(commentId)
      console.log(data)
    } catch (error) {
      console.log('error', error)

    }
  }

  const handleUpdateComment=async(commentId:string,comment:string)=>{
    try {
      const data= await updateComment(commentId,comment)
      console.log('data', data)
      console.log("✅ Comment updated successfully:", data);

    } catch (error) {
      console.log('error', error)
      
    }
  }

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-3">
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-50"
          >
            <p className="text-gray-800">{comment.content}</p>
            {comment.author && (
              <p className="text-sm text-gray-500 mt-1">– {comment.author}</p>
            )}
            <p>{new Date(comment.createdAt).toDateString()}</p>

            <button
              onClick={() => handleDelete(comment.id)}
              disabled={deleting === comment.id}
              className="text-red-500 hover:text-red-700 text-sm mt-2"
            >
              {deleting === comment.id ? "Deleting..." : "Delete"}
            </button>

            <button
              onClick={() => {
                handleLike(comment.id);
                setlikecomment(comment.id);
              }}
              className="text-blue-500 hover:text-blue-700 text-sm mt-2 ml-2"
            >
              {likecomment === comment.id ? "Liked" : "Like"}
            </button>

            <button

            className='p-4 bg-white text-black '
            onClick={()=>handleUpdateComment(comment.id,comment.content)}
            >
             Update Comment              
            </button>
          </div>
        ))
      )}
    </div>

  )
}
export default Comments;

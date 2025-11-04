
import { apiBaseUrl } from "@/lib/constsants";
import handleError from "@/lib/hadleError";
import axios from "axios";

export const getVideoComments = async (videoId:string,page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/comments/${videoId}?page=${page}&limit=${limit}`,
      {withCredentials:true}
    );
    return response.data?.data;
  } catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
};

export const addComment = async (videoId: string, comment: string) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/comments/${videoId}`,
      { comment },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
};

export const updateComment = async (commentId: string, comment: string) => {
  try {
    const respone = await axios.post(`${apiBaseUrl}/c/${commentId}`, {
      content: comment,
    });
    return respone.data;
  } catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await axios.delete(
      `${apiBaseUrl}/comments/c/${commentId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error("Error deleting comment:", message || error);
    throw new Error(message || "Failed to delete comment");
  }
};

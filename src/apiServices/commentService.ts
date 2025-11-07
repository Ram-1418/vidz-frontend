
import { apiBaseUrl } from "@/lib/constsants";
import handleError from "@/lib/hadleError";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
})
export const getVideoComments = async (videoId: string, page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(
      `/comments/${videoId}?page=${page}&limit=${limit}`,
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
    const respone = await axios.patch(`${apiBaseUrl}/comments/c/${commentId}`,
      { comment },
      { withCredentials: true }
    );
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

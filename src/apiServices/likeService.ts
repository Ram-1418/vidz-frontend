import handleError from "@/lib/hadleError";
import { apiClient } from "@/lib/apiClient";

export const toggleVideoLike = async (videoId: string) => {
  try {
    const response = await apiClient.post(`/likes/toggle/v/${videoId}`, {});
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
};

export const toggleCommentLike = async (commentId: string) => {
  try {
    const response = await apiClient.post(`/likes/toggle/c/${commentId}`, {});

    return response.data;
  } catch (error: any) {
    console.log(
      "toggleCommentLike error:",
      error.response?.data || error.message,
    );
    return null;
  }
};

export const toggleTweetLike = async (tweetId: string) => {
  try {
    const respone = await apiClient.post(`/t/${tweetId}`, {});
    return respone.data;
  } catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
};

export const getLikedVideos = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(
      `/videos?page=${page}&limit=${limit}`,
      {},
    );
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
};

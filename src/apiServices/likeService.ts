import handleError from "@/lib/hadleError";
import { apiClient } from "@/lib/apiClient";

export const toggleVideoLike = async (videoId: string) => {
  try {
    const response = await apiClient.post(`/likes/toggle/v/${videoId}`, {});
    return response.data.data;
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
    const response = await apiClient.post(
      `/likes/toggle/t/${tweetId}` 
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

export const getLikedVideos = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get("/likes/videos", {
      params: { page, limit },
    });

    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Failed to fetch liked videos";

    console.error("Error fetching liked videos:", message);
    throw new Error(message);
  }
};

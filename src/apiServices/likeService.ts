import { handleError } from "@/lib/hadleError";
import { apiClient } from "@/lib/apiClient";

export const toggleVideoLike = async (videoId: string) => {
  try {
    const response = await apiClient.post(`/likes/toggle/v/${videoId}`, {});
    return response.data.data;
  }catch (error:unknown) {
throw new Error(handleError(error));
}
};

export const toggleCommentLike = async (commentId: string) => {
  try {
    const response = await apiClient.post(`/likes/toggle/c/${commentId}`, {});

    return response.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
};

export const toggleTweetLike = async (tweetId: string) => {
  try {
    const response = await apiClient.post(
      `/likes/toggle/t/${tweetId}` 
    );
    return response.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
};

export const getLikedVideos = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get("/likes/videos", {
      params: { page, limit },
    });

    return response.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
};

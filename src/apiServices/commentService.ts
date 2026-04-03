import { apiClient } from "@/lib/apiClient";
import { handleError } from "@/lib/hadleError";

export const getVideoComments = async (
  videoId: string,
  page = 1,
  limit = 100,
) => {
  try {
    const response = await apiClient.get(
      `/comments/${videoId}?page=${page}&limit=${limit}`,
    );
    return response.data?.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
};

export const addComment = async (videoId: string, comment: string) => {
  try {
    const response = await apiClient.post(`/comments/${videoId}`, { comment });
    return response.data.data;
  }catch (error:unknown) {
throw new Error(handleError(error));
}
};

export const updateComment = async (commentId: string, comment: string) => {
  try {
    const respone = await apiClient.patch(`/comments/c/${commentId}`, {
      comment,
    });
    return respone.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await apiClient.delete(`/comments/c/${commentId}`);
    return response.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
};

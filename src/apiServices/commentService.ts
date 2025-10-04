import axios, { AxiosError } from "axios";
import { apiBaseUrl } from "@/lib/constsants";

import hadleError from "@/lib/hadleError";






export const getVideoComments = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/videos?page=${page}&limit=${limit}`,
      {}
    );
    return response.data;
  } catch (error) {
    const message=hadleError(error)
  console.error("Error adding comment:", message|| error);
    throw new Error(message || "Failed to add comment");
  }
};

export const addComment = async (videoId:string, comment:string) => {
  try {
    const respone = await axios.post(`${apiBaseUrl}/${videoId}`,
        {content:comment}
    );
    return respone.data;
  } catch (error) {
     const message=hadleError(error)
  console.error("Error adding comment:", message|| error);
    throw new Error(message || "Failed to add comment");
  }
};
export const updateComment = async (commentId:string, comment:string) => {
  try {
    const respone = await axios.post(`${apiBaseUrl}/c/commentId${commentId}`,
        {content:comment}
    );
    return respone.data;
  } catch (error) {
     const message=hadleError(error)
  console.error("Error adding comment:", message|| error);
    throw new Error(message || "Failed to add comment");
  }
};

export const deleteComment = async (commentId:string) => {
  try {
    const respone = await axios.delete(`${apiBaseUrl}/c/commentId${commentId}`);
    return respone.data;
  } catch (error) {
      const message=hadleError(error)
  console.error("Error adding comment:", message|| error);
    throw new Error(message || "Failed to add comment");
  }
};

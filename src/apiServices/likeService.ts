import axios from "axios";
import { apiBaseUrl } from "@/lib/constsants";

import handleError from "@/lib/hadleError";

export const toggleVideoLike = async (videoId:string) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/likes/toggle/v/${videoId}`,
       {},
    { withCredentials: true }
      
      );
    return response.data;
  } catch (error) {
    const message=handleError(error)
  console.error("Error adding comment:", message|| error);
    throw new Error(message || "Failed to add comment");
  }
};

export const toggleCommentLike = async (commentId:string) => {
  try {
    const response = await axios.post(`
      ${apiBaseUrl}/likes/toggle/c/${commentId}`, 
      {},
      {withCredentials:true}
    
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const toggleTweetLike = async (tweetId:string) => {
  try {
    const respone = await axios.post(`${apiBaseUrl}/t/${tweetId}`, {});
    return respone.data;
  } catch (error) {
     const message=handleError(error)
  console.error("Error adding comment:", message|| error);
    throw new Error(message || "Failed to add comment");
  }
};

export const getLikedVideos = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/videos?page=${page}&limit=${limit}`,
      {}
    );
    return response.data;
  } catch (error) {
     const message=handleError(error)
  console.error("Error adding comment:", message|| error);
    throw new Error(message || "Failed to add comment");
  }
};

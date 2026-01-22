import { apiClient } from "@/lib/apiClient";
export const createTweet = async (content: string) => {
  try {
    const response = await apiClient.post(`/tweets/`, { content });
    return response.data;
  } catch (error: any) {
    console.error("Error creating tweet");
  }
};

export const deleteTweet = async (tweetId: string) => {
  try {
    const response = await apiClient.delete(`/tweets/${tweetId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error during the deleting the tweet");
  }
};

export const getUserTweet = async (userId: string) => {
  try {
    const response = await apiClient.get(`/tweets/user/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error("error fecting user tweets", error.respone?.data || error);
  }
};

export const updateTweet = async (tweetId: string, content: string) => {
  try {
    const response = await apiClient.patch(`/tweets/${tweetId}`, { content });
    return response.data;
  } catch (error: any) {
    console.error("Error updating the tweet", error.response?.data || error);
    throw error;
  }
};

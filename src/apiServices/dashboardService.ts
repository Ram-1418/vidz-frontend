import { apiClient } from "@/lib/apiClient";

export const getChannelStats = async () => {
  try {
    const res = await apiClient.get("/dashboard/stats");

    return res.data;
  } catch (error: any) {
    console.error("Error fetching channel stats:", error);
    throw error.response?.data || error;
  }
};

export const getChannelVideos = async (page = 1, limit = 10) => {
  try {
    const res = await apiClient.get(
      `/dashboard/videos?page=${page}&limit=${limit}`,
    );
    return res.data;
  } catch (error: any) {
    console.error("Error fetching channel videos:", error);
    throw error.response?.data || error;
  }
};

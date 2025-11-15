
import { apiBaseUrl } from "@/lib/constsants";
import axios from "axios";

export const getChannelStats = async () => {
  try {
    const res = await axios.get(`
        ${apiBaseUrl}/dashboard/stats
        `);

    return res.data;
  } catch (error: any) {
    console.error("Error fetching channel stats:", error);
    throw error.response?.data || error;
  }
};

export const getChannelVideos = async (page = 1, limit = 10) => {
  try {
    const res = await axios.get(`/dashboard/videos?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error: any) {
    console.error("Error fetching channel videos:", error);
    throw error.response?.data || error;
  }
};

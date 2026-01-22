import { apiClient } from "@/lib/apiClient";

async function toggleSubscription(channelID: string) {
  try {
    const response = await apiClient.post(`/subscriptions/c/${channelID}`, {});

    console.log("Subscription:", response.data);
    return response.data;
  } catch (error) {
    console.error("Subscription error:", error);
  }
}

async function getSubscribedChannels(subscriberId: string) {
  try {
    const response = await apiClient.get(`/subscriptions/c/${subscriberId}`);
    return response.data.success;
  } catch (error) {
    console.error("error", error);
  }
}

async function getUserChannelSubscribers(channelID: string) {
  try {
    const response = await apiClient.post(`/subscriptions/c/S{channelID}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export { getUserChannelSubscribers, getSubscribedChannels, toggleSubscription };

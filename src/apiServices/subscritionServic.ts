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

async function getSubscribedChannels() {
  try {
    const response = await apiClient.get(`/subscriptions/c`);
    console.log("data.data", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("error", error);
  }
}

async function getUserChannelSubscribers(channelID: string) {
  try {
    const response = await apiClient.post(`/subscriptions/c/${channelID}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export { getUserChannelSubscribers, getSubscribedChannels, toggleSubscription };

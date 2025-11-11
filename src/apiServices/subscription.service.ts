import mongoose from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Toggle subscription (subscribe/unsubscribe)
 */
export async function toggleSubscriptionService(userId: string, channelId: string) {
  if (!userId || !channelId) {
    throw new ApiError(400, "User ID and Channel ID are required");
  }

  // Try to find and delete existing subscription
  const existing = await Subscription.findOneAndDelete({
    subscriber: userId, // <-- corrected key (was 'subscribe')
    channel: channelId,
  });

  if (existing) {
    return { isSubscribed: false, message: "Channel unsubscribed successfully" };
  }

  // Otherwise, create new subscription
  try {
    await Subscription.create({ subscriber: userId, channel: channelId });
    return { isSubscribed: true, message: "Channel subscribed successfully" };
  } catch (error: any) {
    throw new ApiError(500, error?.message || "Failed to toggle subscription");
  }
}

/**
 * Get all subscribers of a channel
 */
export async function getUserChannelSubscribersService(channelId: string, page = 1, limit = 10) {
  if (!mongoose.Types.ObjectId.isValid(channelId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  try {
    const subscribers = await Subscription.find({ channel: channelId })
      .populate("subscriber", "username fullName email avatar coverImage")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return subscribers;
  } catch (error: any) {
    throw new ApiError(500, error?.message || "Failed to fetch channel subscribers");
  }
}

/**
 * Get all channels a user has subscribed to
 */
export async function getSubscribedChannelsService(subscriberId: string) {
  if (!mongoose.Types.ObjectId.isValid(subscriberId)) {
    throw new ApiError(400, "Invalid subscriber id");
  }

  try {
    const channels = await Subscription.find({ subscriber: subscriberId })
      .populate("channel", "username fullName email avatar coverImage")
      .sort({ createdAt: -1 });

    return channels;
  } catch (error: any) {
    throw new ApiError(500, error?.message || "Failed to fetch subscribed channels");
  }
}

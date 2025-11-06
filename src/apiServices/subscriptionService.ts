
import { Subscription } from "../";
import 

export const toggleSubscriptionService = async (userId, channelId) => {

  const existingSubscription = await Subscription.findOneAndDelete({
    subscriber: userId,
    channel: channelId,
  });

  if (existingSubscription) {
    return{
        isSubscribed:false,
        message:"channel unsubscribed sucessfuly"
    }
  }
  try {
    await Subscription.create({
        subscribe:userId,
        channel:channelId
    })
    return{
      isSubscribed:true,
         message: "Channel subscribed successfully",
    }
  } catch (error) {
    throw new ApiError(
             error?.statusCode || 500,
      error?.message || "Something went wrong while toggling subscription"

    )
    
  }
}
// pages/SubscribedChannelsPage.jsx

import { useQuery } from "@tanstack/react-query";
import { getSubscribedChannels } from "@/apiServices/subscritionServic";
import ChannelCard from "@/components/ChannelCard";

function SubscribedChannelsPage() {
    const { data, isLoading } = useQuery({
        queryKey: ["subscribedChannels"],
        queryFn: getSubscribedChannels,
    });

    if (isLoading) {
        return (
            <div className="p-6 text-center text-gray-400 animate-pulse">
                Loading your subscriptions...
            </div>
        );
    }

    const channels = data?.channels || [];

    return (
        <div className="px-6 pt-6">
            {/* 🔥 Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">
                    Subscribed Channels
                </h1>

                <span className="text-sm text-gray-400">
                    {channels.length} channels
                </span>
            </div>

            {/* ❌ Empty State */}
            {channels.length === 0 && (
                <div className="text-center mt-20 text-gray-400">
                    <p className="text-lg">No subscriptions yet 😔</p>
                    <p className="text-sm">Start subscribing to your favorite creators!</p>
                </div>
            )}

            {/* ✅ Grid */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {channels.map((channel: any) => (
                    <ChannelCard key={channel._id} channel={channel} />
                ))}
            </div>
        </div>
    );
}

export default SubscribedChannelsPage;
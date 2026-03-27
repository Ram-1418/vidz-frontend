// pages/SubscribedChannelsPage.jsx

import { useQuery } from "@tanstack/react-query";
import { getSubscribedChannels } from "@/apiServices/subscritionServic";
import ChannelCard from "@/components/ChannelCard";

function SubscribedChannelsPage() {
    const { data, isLoading } = useQuery({
        queryKey: ["subscribedChannels"],
        queryFn: getSubscribedChannels,
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Subscribed Channels</h1>

            <div className="grid grid-cols-3 gap-4">
                {data?.channels?.map((channel) => (
                    <ChannelCard key={channel._id} channel={channel} />
                ))}
            </div>
        </div>
    );
}

export default SubscribedChannelsPage;
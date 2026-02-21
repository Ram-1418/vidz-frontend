import { getSubscribedChannels } from "@/apiServices/subscritionServic";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Subscription = () => {
  const { data: subscribeChannel } = useQuery({
    queryKey: ["subscrtion", userId],
    queryFn: () => getSubscribedChannels(userId),
  });
  return (
    <div>
      {subscribeChannel?.map((item) => {
        <div key={item.Channel._id} className="flex items-center gap-2">
          <img src={item.Channel.avatar} className="w-8 h-8 rounded-full" />
          <p>{item.Channel.username}</p>
        </div>;
      })}
    </div>
  );
};

export default Subscription;

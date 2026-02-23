import { getUserChannelProfile } from "@/apiServices/userAuth";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UserProfile = () => {
  const { username } = useParams();

  const {
    data: channel,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["channelProfile", username], //unique key
    queryFn: () => getUserChannelProfile(username!),
    enabled: !!username,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error:{error as any}.message</div>;

  return (
    <div className="max-w-4xl mx-auto mt-6">
      {/* Cover Image */}
      {channel.coverImage && (
        <img
          src={channel.coverImage}
          alt="cover"
          className="w-full h-40 object-cover rounded-lg"
        />
      )}

      {/* Avatar + Info */}
      <div className="flex items-center gap-4 mt-4">
        <img
          src={channel.avatar}
          alt={channel.username}
          className="w-20 h-20 rounded-full border"
        />

        <div>
          <h2 className="text-2xl font-bold">{channel.username}</h2>
          <p className="text-gray-600">
            {channel.subscribersCount} subscribers
          </p>
          <p className="text-gray-600">
            {channel.channelsSubscribedToCount} subscribed
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

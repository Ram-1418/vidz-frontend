import { useAuth } from "@/context/AuthContext";
import { getSubscribedChannels } from "@/apiServices/subscritionServic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface Props {
  isOpen: boolean;
  userId?: string;
}

const Sidebar = ({ isOpen }: Props) => {
  const { data: subscriptions = [], isLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => getSubscribedChannels(),
  });
  console.log("subscriptions", subscriptions.channels);

  return (
    <div
      className={`fixed top-16 left-0 h-screen overflow-y-auto bg-white border-r transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-3 space-y-2 text-sm">
        {/* Main */}
        <MenuItem icon="" label="Home" isOpen={isOpen} />
        <MenuItem icon="" label="Shorts" isOpen={isOpen} />
        <MenuItem icon="" label="Subscriptions" isOpen={isOpen} />

        <hr className="my-3" />

        {/* 🔥 Subscriptions Section */}
        {isOpen && <p className="font-semibold px-2">Subscriptions</p>}

        {isOpen && isLoading && <p className="px-2">Loading...</p>}

        {isOpen &&
          subscriptions.channels?.map((channel: any) => (
            <Link
              key={channel._id}
              to={`/profile/${channel?.channel?.username}`}
            >
              <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <img
                  src={channel.channel.avatar}
                  alt={channel.username}
                  className="w-6 h-6 rounded-full"
                />
                <span>{channel.channel.username}</span>
              </div>
            </Link>
          ))}

        {isOpen && subscriptions.length > 5 && (
          <p className="text-blue-600 cursor-pointer px-2">Show more</p>
        )}

        <hr className="my-3" />

        {/* You Section */}
        {isOpen && <p className="font-semibold px-2">You</p>}
        <MenuItem icon="" label="History" isOpen={isOpen} />
        <MenuItem icon="" label="Playlists" isOpen={isOpen} />
        <MenuItem icon="" label="Watch later" isOpen={isOpen} />
        <MenuItem icon="" label="Liked videos" isOpen={isOpen} />
        <MenuItem icon="" label="Your videos" isOpen={isOpen} />
        <MenuItem icon="⬇" label="Downloads" isOpen={isOpen} />
      </div>
    </div>
  );
};

interface ItemProps {
  icon: string;
  label: string;
  isOpen: boolean;
}

const MenuItem = ({ icon, label, isOpen }: ItemProps) => {
  return (
    <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
      <span className="text-lg">{icon}</span>
      {isOpen && <span>{label}</span>}
    </div>
  );
};

export default Sidebar;

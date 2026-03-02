import {
  Home,
  PlaySquare,
  Users,
  History,
  ListVideo,
  Clock,
  ThumbsUp,
  Video,
  Download,
} from "lucide-react";
import { getSubscribedChannels } from "@/apiServices/subscritionServic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface Props {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: Props) => {
  const { data: subscriptions, isLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => getSubscribedChannels(),
  });

  const channels = subscriptions?.channels || [];

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r transition-all duration-300 overflow-y-auto ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-3 space-y-2 text-sm">
        {/* Main */}
        <MenuItem icon={<Home size={20} />} label="Home" isOpen={isOpen} />
        <MenuItem
          icon={<PlaySquare size={20} />}
          label="Shorts"
          isOpen={isOpen}
        />
        <MenuItem
          icon={<Users size={20} />}
          label="Subscriptions"
          isOpen={isOpen}
        />

        <hr className="my-3" />

        {/* Subscriptions */}
        {isOpen && (
          <p className="font-semibold text-gray-700 px-2 text-sm">
            Subscriptions
          </p>
        )}

        {isOpen && isLoading && (
          <p className="px-2 text-gray-500">Loading...</p>
        )}

        {isOpen &&
          channels.slice(0, 5).map((channel: any) => (
            <Link
              key={channel._id}
              to={`/profile/${channel?.channel?.username}`}
            >
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
                <img
                  src={channel.channel.avatar}
                  alt={channel.channel.username}
                  className="w-6 h-6 rounded-full"
                />
                <span className="truncate">{channel.channel.username}</span>
              </div>
            </Link>
          ))}

        {isOpen && channels.length > 5 && (
          <p className="text-blue-600 cursor-pointer px-2 text-sm hover:underline">
            Show more
          </p>
        )}

        <hr className="my-3" />

        {/* You Section */}
        {isOpen && (
          <p className="font-semibold text-gray-700 px-2 text-sm">You</p>
        )}

        <MenuItem
          icon={<History size={20} />}
          label="History"
          isOpen={isOpen}
        />
        <MenuItem
          icon={<ListVideo size={20} />}
          label="Playlists"
          isOpen={isOpen}
        />
        <MenuItem
          icon={<Clock size={20} />}
          label="Watch later"
          isOpen={isOpen}
        />
        <MenuItem
          icon={<ThumbsUp size={20} />}
          label="Liked videos"
          isOpen={isOpen}
        />
        <MenuItem
          icon={<Video size={20} />}
          label="Your videos"
          isOpen={isOpen}
        />
        <MenuItem
          icon={<Download size={20} />}
          label="Downloads"
          isOpen={isOpen}
        />
      </div>
    </aside>
  );
};

interface ItemProps {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}

const MenuItem = ({ icon, label, isOpen }: ItemProps) => {
  return (
    <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
      <div className="text-gray-700">{icon}</div>
      {isOpen && <span className="text-gray-800">{label}</span>}
    </div>
  );
};

export default Sidebar;

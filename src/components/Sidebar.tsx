interface Props {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: Props) => {
  return (
    <div
      className={`fixed top-16 left-0 h-screen overflow-y-auto bg-white border-r transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-3 space-y-2 text-sm">
        {/* Main */}
        <MenuItem icon="🏠" label="Home" isOpen={isOpen} />
        <MenuItem icon="🎬" label="Shorts" isOpen={isOpen} />
        <MenuItem icon="📺" label="Subscriptions" isOpen={isOpen} />

        <hr className="my-3" />

        {/* Subscriptions Section */}
        {isOpen && <p className="font-semibold px-2">Subscriptions</p>}
        
        {isOpen && (
          <p className="text-blue-600 cursor-pointer px-2">Show more</p>
        )}

        <hr className="my-3" />

        {/* You Section */}
        {isOpen && <p className="font-semibold px-2">You</p>}
        <MenuItem icon="🕒" label="History" isOpen={isOpen} />
        <MenuItem icon="📂" label="Playlists" isOpen={isOpen} />
        <MenuItem icon="⏳" label="Watch later" isOpen={isOpen} />
        <MenuItem icon="👍" label="Liked videos" isOpen={isOpen} />
        <MenuItem icon="🎥" label="Your videos" isOpen={isOpen} />
        <MenuItem icon="⬇️" label="Downloads" isOpen={isOpen} />
        {isOpen && (
          <p className="text-blue-600 cursor-pointer px-2">Show more</p>
        )}

        <hr className="my-3" />

        {/* Explore */}
        {isOpen && <p className="font-semibold px-2">Explore</p>}
        <MenuItem icon="🛍️" label="Shopping" isOpen={isOpen} />
        <MenuItem icon="🎵" label="Music" isOpen={isOpen} />
        <MenuItem icon="🎬" label="Movies" isOpen={isOpen} />
        {isOpen && (
          <p className="text-blue-600 cursor-pointer px-2">Show more</p>
        )}

        <hr className="my-3" />

        {/* More From YouTube */}
        {isOpen && <p className="font-semibold px-2">More from YouTube</p>}
        <MenuItem icon="⭐" label="YouTube Premium" isOpen={isOpen} />
        <MenuItem icon="⚙️" label="YouTube Studio" isOpen={isOpen} />
        <MenuItem icon="🎵" label="YouTube Music" isOpen={isOpen} />
        <MenuItem icon="👶" label="YouTube Kids" isOpen={isOpen} />
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

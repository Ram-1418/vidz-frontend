import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  User,
  Clock,
  ListVideo,
  Video,
  BookOpen,
  Bookmark,
  Heart,
  Download,
  X,
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const exploreItems = [
    "Trending",
    "Shopping",
    "Music",
    "Movies",
    "Live",
    "Gaming",
    "News",
    "Sports",
    "Courses",
    "Fashion & Beauty",
    "Podcasts",
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-xl
      border-r border-gray-200 shadow-xl z-50
      transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* HEADER */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 border-b bg-white/90">
        <span className="text-xl font-extrabold text-red-600 tracking-wide">
          vidz
        </span>
        <X
          className="w-6 h-6 cursor-pointer md:hidden hover:text-red-500"
          onClick={closeSidebar}
        />
      </div>

      {/* NAV */}
      <nav className="py-4 text-sm overflow-y-auto h-[calc(100%-64px)] scrollbar-thin scrollbar-thumb-gray-300">
        {/* MAIN */}
        <div className="px-2 space-y-1">
          <SidebarItem to="/" icon={<Home />} label="Home" />
          <SidebarItem to="/you" icon={<User />} label="You" />
          <SidebarItem to="/history" icon={<Clock />} label="History" />
          <SidebarItem to="/playlists" icon={<ListVideo />} label="Playlists" />
          <SidebarItem to="/your-videos" icon={<Video />} label="Your videos" />
          <SidebarItem to="/courses" icon={<BookOpen />} label="Your courses" />
          <SidebarItem to="/watch-later" icon={<Bookmark />} label="Watch later" />
          <SidebarItem to="/liked" icon={<Heart />} label="Liked videos" />
          <SidebarItem to="/downloads" icon={<Download />} label="Downloads" />
        </div>

        {/* DIVIDER */}
        <div className="my-4 border-t" />

        {/* EXPLORE */}
        <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Explore
        </div>

        <div className="px-2 space-y-1">
          {exploreItems.map((item) => (
            <button
              key={item}
              className="w-full text-left px-3 py-2 rounded-lg
              text-gray-700 hover:bg-gray-100 hover:translate-x-1
              transition-all duration-200"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

/* -------------------------------- */

const SidebarItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 px-3 py-2 rounded-lg
      transition-all duration-200 group
      ${
        isActive
          ? "bg-red-50 text-red-600 font-semibold"
          : "text-gray-700 hover:bg-gray-100"
      }`
    }
  >
    <span className="p-2 rounded-lg bg-gray-100 group-hover:bg-white shadow-sm">
      {icon}
    </span>
    <span>{label}</span>
  </NavLink>
);

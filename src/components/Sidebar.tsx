import React from "react";
import { Link } from "react-router-dom";
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
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 
      transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* TOP BAR (mobile) */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden border-b border-gray-200">
        <span className="text-lg font-bold text-red-600">vidz-frontend</span>
        <X className="w-6 h-6 cursor-pointer" onClick={closeSidebar} />
      </div>

      {/* LOGO (desktop) */}
      <div className="hidden md:flex items-center px-4 py-4 border-b border-gray-200">
        <span className="text-xl font-bold text-red-600">vidz-frontend</span>
      </div>

      {/* MAIN LINKS */}
      <nav className="flex flex-col py-3 text-sm overflow-y-auto h-full">
        {/* SECTION 1 */}
        <div className="px-2">
          <SidebarItem
            to="/"
            icon={<Home className="w-5 h-5" />}
            label="Home"
          />
          <SidebarItem
            to="/you"
            icon={<User className="w-5 h-5" />}
            label="You"
          />
          <SidebarItem
            to="/history"
            icon={<Clock className="w-5 h-5" />}
            label="History"
          />
          <SidebarItem
            to="/playlists"
            icon={<ListVideo className="w-5 h-5" />}
            label="Playlists"
          />
          <SidebarItem
            to="/your-videos"
            icon={<Video className="w-5 h-5" />}
            label="Your videos"
          />
          <SidebarItem
            to="/courses"
            icon={<BookOpen className="w-5 h-5" />}
            label="Your courses"
          />
          <SidebarItem
            to="/watch-later"
            icon={<Bookmark className="w-5 h-5" />}
            label="Watch later"
          />
          <SidebarItem
            to="/liked"
            icon={<Heart className="w-5 h-5" />}
            label="Liked videos"
          />
          <SidebarItem
            to="/downloads"
            icon={<Download className="w-5 h-5" />}
            label="Downloads"
          />
        </div>

        {/* DIVIDER */}
        <div className="my-3 border-t border-gray-200" />

        {/* EXPLORE SECTION */}
        <div className="px-4 pb-2 text-xs font-semibold text-gray-500 uppercase">
          Explore
        </div>

        <div className="px-2 flex flex-col">
          {exploreItems.map((item) => (
            <button
              key={item}
              className="text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-lg text-left"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

const SidebarItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <Link
    to={to}
    className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-700
      hover:bg-gray-100 transition-all"
  >
    {icon}
    {label}
  </Link>
);

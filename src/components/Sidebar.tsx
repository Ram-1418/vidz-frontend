// components/Sidebar.tsx
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
    "Explore",
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
      className={`fixed top-0 left-0 h-full w-60 bg-white shadow-md transform transition-transform duration-300 z-40
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Close Button for mobile */}
      <div className="flex justify-end p-4 md:hidden">
        <X className="w-6 h-6 cursor-pointer" onClick={closeSidebar} />
      </div>

      {/* Logo */}
      <div className="px-4 py-3 border-b border-gray-200">
        <span className="text-xl font-bold text-red-600">vidz-frontend</span>
      </div>

      {/* Explore Section */}

      {/* Main Links */}
      <nav className="flex flex-col gap-2 p-4 text-sm font-medium overflow-y-auto">
        <Link
          to="/getAllVideo()"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <Home className="w-5 h-5" /> Home
        </Link>
        <Link
          to="/you"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <User className="w-5 h-5" /> You
        </Link>
        <Link
          to="/history"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <Clock className="w-5 h-5" /> History
        </Link>
        <Link
          to="/playlists"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <ListVideo className="w-5 h-5" /> Playlists
        </Link>
        <Link
          to="/your-videos"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <Video className="w-5 h-5" /> Your videos
        </Link>
        <Link
          to="/courses"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <BookOpen className="w-5 h-5" /> Your courses
        </Link>
        <Link
          to="/watch-later"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <Bookmark className="w-5 h-5" /> Watch later
        </Link>
        <Link
          to="/liked"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <Heart className="w-5 h-5" /> Liked videos
        </Link>
        <Link
          to="/downloads"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <Download className="w-5 h-5" /> Downloads
        </Link>
      </nav>
      <nav className="flex flex-col gap-1 p-4 border-b border-gray-200">
        {exploreItems.map((item) => (
          <div
            key={item}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded text-sm font-medium"
          >
            {item}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

// components/Sidebar.tsx
import React from "react";
import { Home, Compass, Clock, PlaySquare, X } from "lucide-react";
import { Link } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-60 bg-white shadow-md transform transition-transform duration-300 z-40
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Close Button for mobile */}
      <div className="flex justify-end p-4 md:hidden">
        <X className="w-6 h-6 cursor-pointer" onClick={closeSidebar} />
      </div>

      <nav className="flex flex-col gap-4 p-4">
        <Link to="/" className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded">
          <Home /> Home
        </Link>
        <Link to="/explore" className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded">
          <Compass /> Explore
        </Link>
        <Link to="/subscriptions" className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded">
          <PlaySquare /> Subscriptions
        </Link>
        <Link to="/history" className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded">
          <Clock /> History
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

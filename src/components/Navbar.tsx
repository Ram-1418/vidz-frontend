// components/Navbar.tsx
import React, { useState, useEffect, useRef } from "react";
import { Menu, Search, Bell, User, Mic, PlayCircle } from "lucide-react";

type NavbarProps = {
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3); // example unread notifications
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 shadow-md bg-white sticky top-0 z-50">
      {/* Left - Logo + Menu */}
      <div className="flex items-center gap-2">
        <Menu className="w-6 h-6 cursor-pointer" onClick={toggleSidebar} />
        <PlayCircle className="w-7 h-7 text-red-600" />
        <span className="text-xl font-bold text-red-600">vidz-frontend</span>
      </div>

      {/* Middle - Search + Mic */}
      <div className="flex items-center w-1/2 gap-2">
        <div className="flex flex-1">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none"
          />
          <button className="bg-gray-100 border border-gray-300 rounded-r-full px-4 py-2">
            <Search className="w-5 h-5" />
          </button>
        </div>
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <Mic className="w-5 h-5" />
        </button>
      </div>

      {/* Right - Bell + User */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {/* Bell */}
        <div className="relative cursor-pointer" onClick={toggleNotifications}>
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Notifications Dropdown */}
        {isNotificationsOpen && (
          <div className="absolute right-0 mt-5 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-50">
            <h3 className="font-semibold p-2 border-b border-gray-200">
              Notifications
            </h3>
            <ul className="max-h-60 overflow-y-auto">
              <li className="p-2 hover:bg-gray-100 cursor-pointer">
                New video uploaded!
              </li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">
                Your comment got a reply.
              </li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">
                New subscriber!
              </li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">
                Another notification example
              </li>
            </ul>
          </div>
        )}

        {/* User */}
        <User className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;

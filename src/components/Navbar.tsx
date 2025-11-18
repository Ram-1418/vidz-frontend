// components/Navbar.tsx
import React, { useState, useEffect, useRef } from "react";
import { Menu, Search, Bell, User, Mic, PlayCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);

  const [unreadCount, setUnreadCount] = useState(3);
  const navigate = useNavigate();

  // Toggle notifications
  const toggleNotifications = () =>
    setIsNotificationsOpen(!isNotificationsOpen);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }

      if (
        createRef.current &&
        !createRef.current.contains(event.target as Node)
      ) {
        setOpenCreate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 shadow-md bg-white sticky top-0 z-50">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <Menu className="w-6 h-6 cursor-pointer" onClick={toggleSidebar} />
        <PlayCircle className="w-8 h-8 text-red-600" />
        <span className="text-xl font-bold text-red-600">vidz-frontend</span>
      </div>

      {/* Middle Search */}
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

      {/* Right Section */}
      <div className="flex items-center gap-5">
        
        {/* Create Button */}
        <div className="relative" ref={createRef}>
          <button
            onClick={() => setOpenCreate(!openCreate)}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <Plus className="w-6 h-6" />
          </button>

          {openCreate && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border border-gray-200 p-3 transition-all duration-200">
              <button
                onClick={() => navigate("/fileupload")}
                className="block w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                Upload Video
              </button>
              <button className="block w-full text-left px-4 py-3 hover:bg-gray-100">
                Go Live
              </button>
              <button
                onClick={() => navigate("/tweet")}
                className="block w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                Create Post
              </button>
            </div>
          )}
        </div>

        {/* Bell */}
        <div className="relative cursor-pointer" ref={dropdownRef}>
          <Bell className="w-6 h-6" onClick={toggleNotifications} />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}

          {isNotificationsOpen && (
            <div className="absolute right-0 top-full mt-3 w-64 bg-white shadow-xl border rounded-lg z-50">
              <h3 className="font-semibold p-2 border-b text-center">
                Notifications
              </h3>
              <ul className="max-h-60 overflow-y-auto text-center">
                <li className="p-3 hover:bg-gray-100 cursor-pointer">
                  New video uploaded!
                </li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">
                  Your comment got a reply.
                </li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">
                  New subscriber!
                </li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">
                  Another notification example.
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* User Icon */}
      <div>
          <User className="w-6 h-6 cursor-pointer" />
      </div>

      <div>
        <p className="rounded-3xl bg-white text-black font-bold text-xl">R</p>
      </div>
      </div>
     
    </div>
  );
};

export default Navbar;

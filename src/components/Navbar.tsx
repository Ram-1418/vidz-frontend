// components/Navbar.tsx
import React from 'react'
import { Menu, Search, Bell, User, Mic } from "lucide-react"

type NavbarProps = {
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <div className='flex items-center justify-between px-4 py-2 shadow-md bg-white sticky top-0 z-50'>
      {/* Left - Logo */}
      <div className='flex items-center gap-2'>
        <Menu className='w-6 h-6 cursor-pointer' onClick={toggleSidebar} />
        <span className='text-xl font-bold text-red-600'>MyTube</span>
      </div>

      {/* Middle - Search + Mic */}
      <div className='flex items-center w-1/2 gap-2'>
        <div className="flex flex-1">
          <input
            type="text"
            placeholder='Search'
            className='w-full border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none'
          />
          <button className="bg-gray-100 border border-gray-300 rounded-r-full px-4 py-2">
            <Search className="w-5 h-5" />
          </button>
        </div>
        {/* Mic Button */}
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <Mic className="w-5 h-5" />
        </button>
      </div>

      {/* Right - Icons */}
      <div className='flex items-center gap-2'>
        <Bell className='w-6 h-6 cursor-pointer' />
        <User className='w-6 h-6 cursor-pointer' />
      </div>
    </div>
  )
}

export default Navbar

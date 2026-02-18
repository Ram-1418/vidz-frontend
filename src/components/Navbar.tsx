import { Search, Bell, User } from "lucide-react";

interface Props {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: Props) => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-2xl font-bold">
          ☰
        </button>
        <h1 className="text-xl font-bold text-red-600">YouTube</h1>
      </div>

      {/* Middle Section */}
      <div className="flex items-center w-[40%]">
        <input
          type="text"
          placeholder="Search"
          className="w-full border rounded-l-full px-4 py-2 outline-none"
        />
        <button className="bg-gray-100 border border-l-0 rounded-r-full px-4 py-2">
          <Search />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <Bell className="cursor-pointer" />
        <User className="cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;

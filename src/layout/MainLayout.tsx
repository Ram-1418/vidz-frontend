import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

      <div className="flex">
        <Sidebar isOpen={isOpen} />

        <div
          className={`flex-1 pt-3 transition-all duration-300 ${
            isOpen ? "ml-60" : "ml-20"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
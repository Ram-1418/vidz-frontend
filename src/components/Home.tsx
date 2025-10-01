// src/pages/Home.tsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 p-6 ${
          isSidebarOpen ? "ml-60" : "ml-0 md:ml-60"
        }`}
      >
        {/* Nested routes will be rendered here */}
        <Outlet />
      </main>
    </div>
  );
};

export default Home;

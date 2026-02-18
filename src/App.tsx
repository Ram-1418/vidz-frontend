import { Outlet } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* Navbar */}
        <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

        <div className="flex">
          {/* Sidebar */}
          <Sidebar isOpen={isOpen} />

          {/* Page Content */}
          <div
            className={`flex-1 pt-16 transition-all duration-300 ${
              isOpen ? "ml-60" : "ml-20"
            }`}
          >
            <Outlet />
          </div>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

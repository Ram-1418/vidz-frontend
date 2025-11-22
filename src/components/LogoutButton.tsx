import { logoutUser } from "@/apiServices/userAuth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (!confirmLogout) return;

      await logoutUser();
      window.location.href = "/login";
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      className="px-5 py-2 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md 
                 transition-all hover:scale-105 active:scale-95"
    >
      <LogOut size={18} />
      Logout
    </Button>
  );
};

export default LogoutButton;

import { Outlet } from "react-router-dom";
import Providers from "./providers/providers";
const AuthLayout = () => {
  return (
    <Providers>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Outlet />
      </div>
    </Providers>
  );
};

export default AuthLayout;

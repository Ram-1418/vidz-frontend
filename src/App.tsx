import { Outlet } from "react-router-dom";
import AuthProvider from "./context/AuthContext";

const App = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
};

export default App;

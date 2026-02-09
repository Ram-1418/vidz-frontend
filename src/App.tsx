import { Outlet } from "react-router-dom";
import AuthProvider from "./context/AuthContext";

const App = () => {
  return (
    <div className="">
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
};

export default App;

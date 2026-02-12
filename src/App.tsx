import { Outlet } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;

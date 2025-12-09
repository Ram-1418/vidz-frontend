import React from "react";
import StoreProvider from "./store-provider";
import AuthProvider from "./AuthProvider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <AuthProvider>{children}</AuthProvider>
    </StoreProvider>
  );
}

export default Providers;

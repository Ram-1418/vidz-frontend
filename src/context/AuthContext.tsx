import React, { createContext, useContext, useState } from "react";
import { User } from "@/types/user.types";

type AuthContext = {
  isLoading?: boolean;
  isLoggedin: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const authContext = createContext<AuthContext | undefined>({
  isLoading: true,
  isLoggedin: false,
  user: null,
  setUser: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedin = !!user;

  return (
    <authContext.Provider value={{ user, isLoggedin, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(authContext);
  if (!ctx) {
    throw new Error("Use useAuth() inside AuthProvider");
  }
  return ctx;
};
export default AuthProvider;

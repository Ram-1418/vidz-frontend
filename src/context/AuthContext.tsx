import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/apiServices/userAuth";

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
  setUser: () => { },
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedin = !!user;
  const { data, isLoading } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
  });
  useEffect(() => {
    if (!user) {
      setUser(data)
    }
  }, [data, isLoading])
  if (isLoading) {
    return <div>Loading...</div>
  }

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

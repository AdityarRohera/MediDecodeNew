"use client";

import { getCurrentUser } from "@/services/operations/user/auth";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  

  const fetchUser = async () => {

    try {

      const response = await getCurrentUser();

      console.log("Geting user inside context -----------> " , response);

      setUser(response.user);

    } catch (error) {

      console.error("Fetch User Error:", error);
      setUser(null);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
            user,
            loading,
            setUser,
            fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
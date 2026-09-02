"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { getCurrentUser } from "@/services/operations/user/auth";

/*
    The profile API returns the raw database row, so the field
    names are the uppercase column names.
*/
export interface User {
  USER_ID: string;
  NAME: string;
  EMAIL: string;
  CREATED_AT?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

/*
    Signed in pages are rendered by a server layout that already
    resolves the user, so this provider never fetches on its own.
    It holds whatever the app hands it, and the auth forms refresh
    it after a sign in.
*/
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const response = await getCurrentUser();

      setUser(response?.user ?? null);
    } catch (error) {
      console.error("Fetch user error:", error);

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

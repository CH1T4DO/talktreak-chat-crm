import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { connectSocket, disconnectSocket } from "@/lib/socket";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("tt_token"));

  const login = useCallback((t: string) => {
    localStorage.setItem("tt_token", t);
    setToken(t);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("tt_token");
    disconnectSocket();
    setToken(null);
  }, []);

  useEffect(() => {
    if (token) connectSocket();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

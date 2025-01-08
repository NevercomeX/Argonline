'use client';

import { createContext } from "react";
import Cookies from 'js-cookie';

interface User {
    id: number;
    email: string;
    [key: string]: any;
  }

interface AuthContextType {
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const login = (user: User, token: string) => {
    Cookies.set("token", token);
    Cookies.set("user", JSON.stringify(user));
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
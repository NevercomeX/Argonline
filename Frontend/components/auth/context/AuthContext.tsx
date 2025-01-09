'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextProps {
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  console.log(context);

  if (!context) {
    throw new Error('useAuth debe estar dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const savedToken = Cookies.get('accessToken');
    if (savedToken) {
      fetch('/api/auth/validate-token', { headers: { Authorization: `Bearer ${savedToken}` } })
        .then((res) => res.ok ? setToken(savedToken) : logout());
    }
  }, []);

  const login = (token: string, user: User) => {
    setToken(token);
    Cookies.set('accessToken', token, { expires: 7, secure: true, sameSite: 'Strict' });
    setIsAuthenticated(true);
    // Opcional: guardar el usuario en un estado separado si es necesario
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    Cookies.remove('accessToken');
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

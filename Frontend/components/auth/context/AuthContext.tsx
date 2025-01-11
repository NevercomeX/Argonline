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
  isLoading: boolean; // Nuevo estado para el proceso de carga
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe estar dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado
  const router = useRouter();

  useEffect(() => {
    let isMounted = true; // Bandera para evitar actualizaciones en componentes desmontados
  
    const verifyToken = async () => {
      const savedToken = Cookies.get('accessToken');
      if (!savedToken) {
        setIsLoading(false);
        return;
      }
  
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authV2/verify-session`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        });
  
        if (isMounted && res.ok) {
          setToken(savedToken);
          setIsAuthenticated(true);
        } else if (isMounted) {
          logout();
        }
      } catch (err) {
        console.error('Error verifying session:', err);
        if (isMounted) logout();
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
  
    verifyToken();
  
    return () => {
      isMounted = false; // Evita actualizaciones si el componente se desmonta
    };
  }, []);
  
  const login = (token: string, user: User) => {
    setToken(token);
    Cookies.set('accessToken', token, { expires: 7, secure: true, sameSite: 'Strict' });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    Cookies.remove('accessToken');
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

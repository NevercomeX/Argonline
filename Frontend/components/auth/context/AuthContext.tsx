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
  getUserId: () => void;
  token: string | null;
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_LOGIN_URL}/authV2/verify-session`, {
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
  

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    Cookies.remove('accessToken');
    router.push('/auth');
  };

  // get user ID from token in UserSession table in DB
  // fetch user data from User table in DB
  // set user state with user data
  // return user data

  
  const getUserId = async () => {
    const token = Cookies.get('refreshToken'); // Cambiar por el nombre correcto de la cookie

    console.log(" authcontext ============",token);

    if (!token) {
      return;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOGIN_URL}/authV2/users/getUserIdFromToken`, {
        method: 'POST', // Cambiamos el método a POST
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Enviar el token también en los headers si es necesario
        },
        body: JSON.stringify({ token }), // Enviamos el token en el cuerpo
      });
  
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

 

  return (
    <AuthContext.Provider value={{ token, logout, isAuthenticated, isLoading, getUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = Cookies.get('token');
    const savedUser = Cookies.get('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (token: string, user: User) => {
    setToken(token);
    setUser(user);
    Cookies.set('token', token, { expires: 7 }); // Token en cookies (expira en 7 días)
    Cookies.set('user', JSON.stringify(user), { expires: 7 });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    Cookies.remove('token');
    Cookies.remove('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

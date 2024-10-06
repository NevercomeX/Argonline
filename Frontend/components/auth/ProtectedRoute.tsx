// src/components/ProtectedRoute.tsx
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Si el usuario no está autenticado, redirigir al login
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Mostrar nada o un loader mientras redirige
  }

  return <>{children}</>;
};

export default ProtectedRoute;

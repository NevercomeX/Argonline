// src/components/ProtectedRoute.tsx
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  console.log(isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {

      // Si el usuario no está autenticado, redirigir al login
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {

    return null; // Mostrar nada o un loader mientras redirige
  }

  return <>{children}</>;
};

export default ProtectedRoute;

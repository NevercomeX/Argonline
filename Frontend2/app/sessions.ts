// app/sessions.ts
import { createCookieSessionStorage, Session } from "@remix-run/node"; // Importa el tipo Session

// Crea almacenamiento de sesión basado en cookies
const sessionSecret = process.env.SESSION_SECRET || "super-secret-key";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "session",
    secure: process.env.NODE_ENV === "production", // true solo en producción
    secrets: [sessionSecret], // Usar una clave secreta para firmar la cookie
    sameSite: "lax", // Protege la cookie contra CSRF
    path: "/",
    httpOnly: true, // No accesible desde JavaScript del cliente
    maxAge: 60 * 60 * 24 * 7, // Duración de la sesión de una semana
  },
});

// Función para obtener la sesión
export const getSession = (cookieHeader: string | null): Promise<Session> => {
  return sessionStorage.getSession(cookieHeader);
};

// Función para destruir la sesión
export const destroySession = (session: Session): Promise<string> => {
  return sessionStorage.destroySession(session);
};

// Función para guardar la sesión
export const commitSession = (session: Session): Promise<string> => {
  return sessionStorage.commitSession(session);
};

"use server";

import { get } from "./api/api";
import { cookies } from "next/headers";

// Tipos para las cookies
interface Cookie {
  name: string;
  value: string;
  maxAge: number;
  path: string;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none";
  secure?: boolean;
}

// Tipos para la respuesta del servidor
interface ServerResponse {
  success: boolean;
  cookies?: {
    accessCookie: Cookie;
    refreshCookie: Cookie;
  };
}

// Tipo genérico de respuesta del fetcher

// Función para validar la sesión
const validateSession = async (): Promise<ServerResponse> => {
  try {
    // Verificar la sesión
    let response = await get<ServerResponse>(`/authV2/verify-session`);

    // Si la sesión no es válida, intenta refrescarla
    if (!response.success) {
      const cookie = cookies();
      const refreshToken = cookie.get("refreshToken")?.value;

      // Solo incluye el header si refreshToken existe
      const headers: Record<string, string> = refreshToken
        ? { "x-refresh-token": refreshToken }
        : {};

      response = await get<ServerResponse>(`/authV2/refresh-session`, {
        headers,
      });

      if (response.success && response.cookies) {
        const { accessCookie, refreshCookie } = response.cookies;

        response.cookies = {
          accessCookie: {
            name: "accessToken",
            value: accessCookie.value,
            maxAge: accessCookie.maxAge,
            path: "/",
            httpOnly: true,
            sameSite: "lax",
          },
          refreshCookie: {
            name: "refreshToken",
            value: refreshCookie.value,
            maxAge: refreshCookie.maxAge,
            path: "/",
            httpOnly: true,
            sameSite: "lax",
          },
        };
      }
    }

    return response;
  } catch (error) {
    console.error("Error validating session:", error);
    return { success: false };
  }
};

export default validateSession;

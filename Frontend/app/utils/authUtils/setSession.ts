"use server";

import { post } from "./api/api";
import { cookies } from "next/headers";

// Tipos para los datos de entrada y salida
interface LoginRequest {
    email: string;
    password: string;
}

interface SessionResponse {
    success: boolean;
    message: string;
    cookies?: {
        accessCookie: {
            value: string;
            maxAge: number;
        };
        refreshCookie: {
            value: string;
            maxAge: number;
        };
    };
}

// Función para establecer la sesión
const setSession = async (request: LoginRequest): Promise<SessionResponse> => {
    const { email, password } = request;

    if (!email) {
        return {
            success: false,
            message: "No email provided.",
        };
    }

    if (!password) {
        return {
            success: false,
            message: "No password provided.",
        };
    }

    try {
        // Obtén la sesión desde el servidor
        const response = await post<SessionResponse>(`/api/login`, { email, password });

        if (!response.success) {
            return {
                success: false,
                message: response.message,
            };
        }

        // Si la sesión es válida, establece las cookies
        if (response.success && response.cookies) {
            const { accessCookie, refreshCookie } = response.cookies;

            cookies().set("accessToken", accessCookie.value, {
                maxAge: accessCookie.maxAge,
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                // secure: true, // Activa esto si usas HTTPS
            });

            cookies().set("refreshToken", refreshCookie.value, {
                maxAge: refreshCookie.maxAge,
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                // secure: true, // Activa esto si usas HTTPS
            });
        }

        return {
            success: true,
            message: response.message,
        };
    } catch (error) {
        console.error("Error in setSession:", error);
        return {
            success: false,
            message: "An error occurred while setting the session.",
        };
    }
};

export default setSession;

"use server";

import { cookies } from "next/headers";

const API = "http://localhost:4001";

// Define types for fetcher response
interface FetcherResponse<T> {
    statusCode: number;
    error?: string;
    success?: boolean; // Opcional para mapear correctamente
    data?: T;          // Los datos específicos de la respuesta
    message?: string;  // Mensaje de éxito o error
    cookies?: string;   // Cookie de la respuesta
}

// Define common config type
interface RequestConfig {
    cache?: RequestCache;
    headers?: Record<string, string>;
    type?: "multipart/form-data" | "application/json";
}

// Define fetcher function
const fetcher = async <T>(url: string, options: RequestInit): Promise<FetcherResponse<T> & { headers: Headers }> => {
    try {
        const response = await fetch(`${API}${url}`, options);
        const responseData = await response.json();

        return {
            statusCode: response.status,
            headers: response.headers,
            ...responseData,
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: new Headers(),
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};

// Define headers function
const getHeaders = (): Record<string, string> => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const commonHeaders: Record<string, string> = {
        /** Add any default headers here */
    };

    return {
        Authorization: `Bearer ${accessToken}`,
        ...commonHeaders,
    };
};

// GET method
export const get = async <T>(
    url: string,
    config: { cache?: RequestCache; headers?: Record<string, string> } = {}
): Promise<T> => {
    const headers = getHeaders();

    const requestOptions: RequestInit = {
        method: "GET",
        cache: config.cache || "no-store",
        headers: {
            ...headers,
            ...config.headers,
        },
    };

    const response = await fetcher<T>(url, requestOptions);



    // Verificar si hay errores
    if (response.statusCode >= 400 || response.error) {
        throw new Error(response.error || `Request failed with status ${response.statusCode}`);
    }

    // Si la respuesta contiene `user`, retórnalo directamente
    if ('user' in response) {

        return (response as any).user; // Retorna solo la propiedad user
    }

    // Si no contiene `user`, retorna la data completa
    return response.data as T;
};

// POST method
export const post = async <T = any>(
    url: string,
    body: any,
    config: RequestConfig = {}
): Promise<FetcherResponse<T>> => {
    const headers = getHeaders();

    const requestOptions: RequestInit = {
        method: "POST",
        cache: config.cache || "no-store",
        headers: {
            ...headers,
            ...config.headers,
        },
    };

    if (config.type === "multipart/form-data") {
        requestOptions.body = body;
    } else {
        (requestOptions.headers as Record<string, string>)["Content-Type"] = "application/json";     
        requestOptions.body = JSON.stringify(body);
    }

    const response = await fetcher<T>(url, requestOptions);
    return response;
};

// PUT method
export const put = async <T = any>(
    url: string,
    body: any,
    config: RequestConfig = {}
): Promise<FetcherResponse<T>> => {
    const headers = getHeaders();

    const requestOptions: RequestInit = {
        method: "PUT",
        cache: config.cache || "no-store",
        headers: {
            ...headers,
            ...config.headers,
        },
    };

    if (config.type === "multipart/form-data") {
        requestOptions.body = body;
    } else {
        (requestOptions.headers as Record<string, string>)["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
    }

    const response = await fetcher<T>(url, requestOptions);
    return response;
};

// DELETE method
export const remove = async <T = any>(
    url: string,
    config: RequestConfig = {}
): Promise<FetcherResponse<T>> => {
    const headers = getHeaders();

    const requestOptions: RequestInit = {
        method: "DELETE",
        cache: config.cache || "no-store",
        headers: {
            ...headers,
            ...config.headers,
        },
    };

    const response = await fetcher<T>(url, requestOptions);
    return response;
};

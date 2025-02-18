"use server";

import { get } from "./api/api";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";

/**
 * @description Get the session data from db
 * @example
 * import { getSession } from "@/session";
 * const session = await getSession();
 */

const getSession = async () => {
  try {
    const response = await get<{ user: { id: number; email: string } }>(
      "/authV2/get-session",
    );
    return response;
  } catch (error) {
    console.error("Error en getSession:", error);
    return null;
  }
};

/**
 * @description Get the session data from cookie
 * @example
 * import { getLocalSession } from "@/session";
 * const session = await getLocalSession();
 */
const getLocalSession = async () => {
  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;

  if (!token) return;

  try {
    const decoded = decodeJwt(token);
    return {
      user: {
        id: decoded.id,
        email: decoded.email,
      },
    };
  } catch (err) {
    return;
  }
};

export { getSession, getLocalSession };

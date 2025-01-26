"use server";

import { cookies } from "next/headers";

const destroySession = async () => {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  try {
    if (refreshToken) {
      await fetch(`${process.env.NEXT_PUBLIC_API_LOGIN_URL}/authV2/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
    }

    // Elimina cookies
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    // Devuelve un estado de redirección
    return { redirect: "/auth" };
  } catch (error) {
    console.error("Error during destroySession:", error);
    return { redirect: "/auth", error: true };
  }
};

export default destroySession;

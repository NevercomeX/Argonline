"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const destroySession = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value; // Usa refreshToken, no token ni accessToken

    if (refreshToken) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authV2/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`, // Envía el refreshToken al servidor
        },
      });
    }

    // Limpia todas las cookies relacionadas
    cookies().delete("accessToken");
    cookies().delete("refreshToken");

    // Redirige al usuario al login
    return redirect("/auth");
  } catch (error) {
    console.error("Error during destroySession:", error);
    return redirect("/auth");
  }
};

export default destroySession;

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./app/utils/authUtils/getSession";

const publicRoutes = ["/auth"];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  // Permitir acceso a rutas públicas
  if (publicRoutes.includes(url)) {
    return NextResponse.next();
  }

  // Obtener la sesión desde las cookies
  const session = await getSession();

  console.log("Session in middleware:", session);

  // Redirigir al login si no hay sesión
  if (!session) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Continuar si la sesión es válida
  return NextResponse.next();
}

export const config = {
  matcher: ["/characters/:path*", "/equipment/:path*","/" ], // Rutas protegidas
};

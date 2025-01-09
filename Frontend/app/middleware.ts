// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/auth"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.pathname;

  // Permitir el acceso a rutas públicas
  if (publicRoutes.includes(url)) {
    return NextResponse.next();
  }

  // Redirigir al login si no hay token
  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/characters/:path*", "/equipment/:path*", "/:path*"], // Rutas protegidas
};

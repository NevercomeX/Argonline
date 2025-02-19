// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/Auth/context/AuthContext";
import { ClientProviders } from "@/components/ClientProviders";
import { Providers } from "../provicder/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NevercomeX",
  description: "Admin dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <ClientProviders>{children}</ClientProviders>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}

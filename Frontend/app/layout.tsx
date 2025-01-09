import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/components/auth/context/AuthContext';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NevercomeX',
  description: 'Admin dashboard',

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang='en'>
      <head>

<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"></link>

</head>

      <body className={inter.className}>
        <AuthProvider>  
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={true}
          storageKey='dashboard-theme'
        >
          {children}
          <Toaster />
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

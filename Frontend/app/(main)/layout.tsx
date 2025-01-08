
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { getSession } from '../utils/authUtils/getSession';
import { AuthProvider } from '../utils/authUtils/authProvider';

export default async function MainLayout({ children }: { children: React.ReactNode, user: { id: number; email: string }  }) {
  const user = await getSession();

  return (
<>
  <Navbar  />
  <div className="flex">

    {/* Sidebar */}
    <div className="hidden md:block h-[100vh] w-[300px]">
      <Sidebar />
    </div>

    {/* Contenedor para centrar el contenido */}
    <div className="flex-grow flex justify-center">
      {/* Contenido */}
      <AuthProvider>
      <div className="p-5 w-full md:max-w-[1140px] md:ml-8">{children}</div>
      </AuthProvider>
    </div>
    
  </div>
</>
  );
};



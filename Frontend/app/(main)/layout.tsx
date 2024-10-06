
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
<>
  <Navbar />
  <div className="flex">

    {/* Sidebar */}
    <div className="hidden md:block h-[100vh] w-[300px]">
      <Sidebar />
    </div>

    {/* Contenedor para centrar el contenido */}
    <div className="flex-grow flex justify-center">
      {/* Contenido */}
      <div className="p-5 w-full md:max-w-[1140px] md:ml-8">{children}</div>
    </div>
    
  </div>
</>
  );
};

export default MainLayout;


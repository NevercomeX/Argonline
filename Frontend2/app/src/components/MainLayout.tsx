// src/components/MainLayout.tsx
import React from "react";
import { Link } from "@remix-run/react";

// Definir los tipos correctos para las props
interface MainLayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean; // Añadimos la propiedad isAuthenticated
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, isAuthenticated }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/logo-dark.png" alt="Logo" className="w-12 h-12" />
          <h1 className="text-2xl font-bold">Game Database</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/mobs" className="hover:text-gray-300">Combat</Link></li>
                <li><Link to="/" className="hover:text-gray-300">Stats</Link></li>
                <li><Link to="/characters" className="hover:text-gray-300">Characters</Link></li>
                <li><Link to="/characters/new" className="hover:text-gray-300">Create Character</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
                <li><Link to="/register" className="hover:text-gray-300">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </header>

      {/* Layout principal */}
      <div className="flex flex-1">
        {/* Panel izquierdo */}
        <aside className="w-64 bg-gray-100 p-4 hidden md:block">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li><Link to="/mobs" className="block hover:bg-gray-200 p-2 rounded">Monsters</Link></li>
            <li><Link to="/items" className="block hover:bg-gray-200 p-2 rounded">Items</Link></li>
            <li><Link to="/characters" className="block hover:bg-gray-200 p-2 rounded">Characters</Link></li>
          </ul>
        </aside>

        {/* Contenido principal dinámico */}
        <main className="flex-1 bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

// app/routes/routes.tsx
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

// Definir el tipo de las rutas
type Route = {
  path: string;
  method: string;
};

// Loader para obtener las rutas desde el servidor Express
export const loader: LoaderFunction = async () => {
  const res = await fetch("http://localhost:4001/api/routes");
  const routes: Route[] = await res.json(); // Tipamos el resultado de la API
  return json(routes);
};

// Meta function (opcional si deseas agregar SEO)
export const meta: MetaFunction = () => {
  return [
    { title: "Rutas del Servidor" },
    { name: "description", content: "Visualiza todas las rutas disponibles en el servidor Express" },
  ];
};

// Componente que muestra las rutas
export default function RoutesPage() {
  const routes = useLoaderData<Route[]>(); // Obtenemos las rutas

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 ">
            Rutas disponibles en el servidor
          </h1>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 ">
          <p className="leading-6 text-gray-700 ">
            Aquí están las rutas del servidor:
          </p>
          {/* Contenedor scrolleable */}
          <ul className="h-64 w-96 overflow-y-scroll border border-gray-300 rounded-lg p-4">
            {routes.map(({ path, method }, index) => (
              <li key={index} className="mb-2">
                {/* No usar encodeURIComponent aquí */}
                <Link
                  className="group flex items-center gap-3 p-3 leading-normal text-blue-700 hover:underline "
                  to={`/routes${path}`}  // Usamos el path directamente
                >
                  <span>{method.toUpperCase()}</span> - <span>{path}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

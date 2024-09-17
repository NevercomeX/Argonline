// app/routes/routes.$path.tsx
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Link, useParams } from "@remix-run/react";

// Definir el tipo de las rutas
type RouteDetail = {
  path: string;
  method: string;
  description: string; // Supón que tienes una descripción de la ruta
};

// Loader para obtener los detalles de la ruta seleccionada
export const loader: LoaderFunction = async ({ params }) => {
  const path = decodeURIComponent(params.path || "");

  // Simulamos que estamos buscando detalles adicionales de la ruta.
  const res = await fetch(`http://localhost:3000/api/routes`);
  const routes: RouteDetail[] = await res.json();

  const routeDetail = routes.find((route) => route.path === path);

  if (!routeDetail) {
    throw new Response("Ruta no encontrada", { status: 404 });
  }

  return json(routeDetail);
};

// Componente que muestra los detalles de la ruta
export default function RouteDetailPage() {
  const { path } = useParams();
  const route = useLoaderData<RouteDetail>(); // Obtenemos los detalles de la ruta seleccionada

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Detalles de la ruta: {route.path}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          <strong>Método:</strong> {route.method.toUpperCase()}
        </p>
        <p className="text-md text-gray-500 dark:text-gray-400">
          {route.description || "No hay descripción disponible para esta ruta."}
        </p>

        {/* Enlace para regresar a la lista de rutas */}
        <Link
          className="mt-4 text-blue-700 hover:underline dark:text-blue-500"
          to="/routes"
        >
          Volver a la lista de rutas
        </Link>
      </div>
    </div>
  );
}

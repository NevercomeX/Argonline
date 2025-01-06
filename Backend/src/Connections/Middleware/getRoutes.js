// src/Middleware/getRoutes.js
const getRoutes = (router) => {
    const routes = [];
  
    // Función auxiliar para obtener el path del subrouter
    const getPathFromRegexp = (regexp) => {
      const match = regexp.toString().match(/\/\^\\\/(.*?)\\\/\?\(\?=\//);
      return match ? `/${match[1]}` : '';
    };
  
    router.stack.forEach((middleware) => {
      if (middleware.route) {
        // Rutas estándar
        routes.push({
          path: middleware.route.path,
          method: Object.keys(middleware.route.methods)[0].toUpperCase(),
        });
      } else if (middleware.name === 'router') {
        // Subrouters
        const basePath = getPathFromRegexp(middleware.regexp); // Obtenemos el path base correctamente
        middleware.handle.stack.forEach((nestedMiddleware) => {
          if (nestedMiddleware.route) {
            routes.push({
              path: `${basePath}${nestedMiddleware.route.path}`,
              method: Object.keys(nestedMiddleware.route.methods)[0].toUpperCase(),
            });
          }
        });
      }
    });
  
    return routes;
  };
  
  export { getRoutes };
  
module.exports = {
    async headers() {
      return [
        {
          source: '/api/:path*',  // Aplica esto a todas las rutas de la API
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, max-age=0',  // Deshabilita la caché en las peticiones a la API
            },
          ],
        },
        {
          source: '/equipment',  // O solo aplica a la página de equipo
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, max-age=0',  // Deshabilita la caché en la página de equipo
            },
          ],
        },
      ];
    },
  };
  
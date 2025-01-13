module.exports = {
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: '/api/:path*',  // Aplica esto a todas las rutas de la API
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate',  // Deshabilita completamente la caché en las API
          },
        ],
      },
      {
        source: '/equipment',  // O solo aplica a la página de equipo
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate',  // Deshabilita completamente la caché en la página de equipo
          },
        ],
      },
    ];
  },
};

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
    async redirects() {
    return [
      {
        source: '/serie/:id/episode/:slug', // Captura cualquier ID dinámico
        destination: '/',
        permanent: true,
      },
      {
        source: '/serie/:id/episodie/:slug', // Captura cualquier ID dinámico
        destination: '/',
        permanent: true,
      },
      {
        source: '/serie/:id/:slug', // Captura cualquier ID dinámico
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

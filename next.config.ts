import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@supabase/supabase-js', 'sharp', 'three'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.clerk.dev',
      },
      {
        protocol: 'https',
        hostname: 'eoimages.gsfc.nasa.gov',
      },
      {
        protocol: 'https',
        hostname: 'www.solarsystemscope.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Configuración para Turbopack (Next.js 16)
  turbopack: {},
};

export default nextConfig;

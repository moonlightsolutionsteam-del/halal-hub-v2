import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Adding allowed origins to prevent dev-time cross-origin warnings in cloud environments
    allowedDevOrigins: [
      '6000-firebase-studio-1771602950413.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev',
      'localhost:9002'
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/account/dashboard',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

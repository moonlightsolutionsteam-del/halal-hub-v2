import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
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
  experimental: {
    allowedDevOrigins: ['6000-firebase-studio-1771602950413.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev'],
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


import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  allowedDevOrigins: [
    '6000-firebase-studio-1771602950413.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev',
    'localhost:9002',
    '0.0.0.0:9002'
  ],
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
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
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

export default withSentryConfig(nextConfig, {
  org: "moonlight-soluyions",
  project: "halal-hub-v2",
  // Suppress non-error output during builds
  silent: !process.env.CI,
  // Upload wider set of source files for better stack traces
  widenClientFileUpload: true,
  // Annotate React components with display names for Sentry traces
  reactComponentAnnotation: { enabled: true },
  // Proxy Sentry traffic through Next.js to bypass ad blockers
  tunnelRoute: "/monitoring",
  // Hide Sentry source maps from browser DevTools
  sourcemaps: { disable: true },
  // Remove Sentry debug logging from production bundle
  disableLogger: true,
  // Auto-instrument Vercel Cron Monitors
  automaticVercelMonitors: true,
})

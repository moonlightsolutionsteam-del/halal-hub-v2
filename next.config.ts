
import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co https://js.razorpay.com https://*.sentry.io",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://picsum.photos https://placehold.co https://randomuser.me https://lh3.googleusercontent.com https://firebasestorage.googleapis.com https://www.openstreetmap.org",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.sentry.io https://api.aladhan.com",
      "frame-src 'self' https://www.openstreetmap.org https://js.razorpay.com",
      "media-src 'self' https://*.supabase.co",
      "worker-src 'self' blob:",
    ].join("; "),
  },
]

const nextConfig: NextConfig = {
  typescript: {
    // TODO: Set to false once all 27k TS errors are resolved (tracked separately)
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
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

import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'us-east-1.tixte.net',
        pathname: '/uploads/**',
      },
    ],
    unoptimized: true,
  },
};

const config = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/us-east-1\.tixte\.net\/uploads\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'uploaded-images',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
  ],
})(nextConfig);

export default config;
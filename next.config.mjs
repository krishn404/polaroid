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
  dest: '.next/static/worker',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  buildExcludes: [/chunks\/.*$/],
  publicExcludes: ['!sw.js', '!workbox-*.js'],
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
    {
      urlPattern: /\/_next\/image\?url=.+/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'next-images',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      urlPattern: /\/_next\/static\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-resources',
      },
    },
    {
      urlPattern: /\.(?:eot|ttf|woff|woff2)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-fonts',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
  ],
})(nextConfig);

export default config;
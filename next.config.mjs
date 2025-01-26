import path from 'path';
import withPWA from 'next-pwa';

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
    },
    webpack(config, { isServer }) {
      // Ensure the service worker is not bundled by Next.js
      if (!isServer) {
        config.resolve.alias['sw.js'] = path.resolve('./public/sw.js');
      }
      return config;
    },
  };
  
const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

export default withPWAConfig(nextConfig);
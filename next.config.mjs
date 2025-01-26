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
};

export default nextConfig;
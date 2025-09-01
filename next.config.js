/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  images: {
    domains: ['images.unsplash.com', 'developers.google.com'],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:5000',
  },
};

module.exports = nextConfig;
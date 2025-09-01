/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'developers.google.com'],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:5000',
  },
};

module.exports = nextConfig;

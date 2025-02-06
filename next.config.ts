/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org', 'img.youtube.com'], // Add 'img.youtube.com' here
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during the build process
  },
};

module.exports = nextConfig;


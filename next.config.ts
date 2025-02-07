/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org', 'img.youtube.com']
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

module.exports = nextConfig;


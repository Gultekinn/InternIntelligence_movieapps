/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'], // TMDB'nin resimlerini yüklemeye izin ver
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint yoxlamasını build mərhələsində deaktiv edir
  },
};

module.exports = nextConfig;

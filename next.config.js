/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: './',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  
}

module.exports = nextConfig

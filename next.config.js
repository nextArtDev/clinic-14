/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mye-commerce.storage.iran.liara.space',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
// mye-commerce.storage.iran.liara.space

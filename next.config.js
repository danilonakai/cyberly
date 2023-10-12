/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://cyberly.vercel.app/api/:path*',
      },
    ]
  },

  reactStrictMode: true,
}

module.exports = nextConfig
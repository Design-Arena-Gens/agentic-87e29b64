/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost"],
    },
    typedRoutes: true,
  },
};

export default nextConfig;

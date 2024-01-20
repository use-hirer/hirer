/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [
      "@react-email/render",
      "@react-email/tailwind",
    ],
  },
};

module.exports = nextConfig;

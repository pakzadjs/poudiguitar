/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    domains: ["poudiguitar.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.poudiguitar.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

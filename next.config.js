/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  staticGeneration: false ,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
};

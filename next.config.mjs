/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.gateway.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

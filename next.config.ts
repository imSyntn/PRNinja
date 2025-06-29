import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.freepik.com",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.clerk.com",
      },
    ],
  }
};

export default nextConfig;

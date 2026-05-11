import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone", // Important for Docker optimization
  images: {
    domains: ["localhost", "s3.amazonaws.com"], // Example for Storage
  },
};

export default withPWA(nextConfig);

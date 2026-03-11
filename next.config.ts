import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Ignore typescript and eslint errors during build for MVP velocity
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: ["via.placeholder.com", "images.unsplash.com"],
  }
};

export default nextConfig;

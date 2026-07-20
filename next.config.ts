import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Omit `search` so cache-busting query strings (?v=…) are allowed.
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

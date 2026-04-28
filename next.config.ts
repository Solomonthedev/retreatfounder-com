import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: '*.airtableusercontent.com' },
      { hostname: 'i.ytimg.com' },
    ],
  },
};

export default nextConfig;

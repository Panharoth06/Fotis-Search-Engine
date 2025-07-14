import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // images: {
  //   domains: ['imgs.search.brave.com', 'assets.echoapi.com', 'cdn.apifox.com', '/**'],
  // },
};

export default nextConfig;

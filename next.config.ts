import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    ".space.z.ai",
    ".space.chatglm.site",
  ],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

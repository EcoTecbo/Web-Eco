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
  // Redirección 301 permanente del dominio antiguo al nuevo
  // ecotaxi-bo.com -> ecotaxi.com.bo
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.ecotaxi-bo.com",
          },
        ],
        destination: "https://www.ecotaxi.com.bo/:path*",
        permanent: true, // 301
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "ecotaxi-bo.com",
          },
        ],
        destination: "https://www.ecotaxi.com.bo/:path*",
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;

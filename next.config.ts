import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow external access for mobile testing
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "linapoint.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "seonmgpsyyzbpcsrzjxi.supabase.co",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

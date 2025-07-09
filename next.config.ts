import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "8uigv4wggcfgnln3.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default withPayload(nextConfig);

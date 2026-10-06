import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Contact is now section 06 of the single page; /gallery was cut in the redesign.
  async redirects() {
    return [
      { source: "/contact", destination: "/#contact", permanent: false },
      { source: "/gallery", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;

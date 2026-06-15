import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://public-gallery-portfolio-app.s3.us-west-2.amazonaws.com/**",
      ),
      new URL("https://i.scdn.co/image/**"),
    ],
  },
};

export default nextConfig;

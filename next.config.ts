import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static build -> `out/` folder, deployable to S3 + CloudFront (or any static host).
  output: "export",
  // Emits /insights/slug/index.html so S3/CloudFront can serve clean URLs.
  trailingSlash: true,
  // The Next.js image optimizer needs a server; static export serves images as-is.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

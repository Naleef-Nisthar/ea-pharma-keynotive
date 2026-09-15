import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` emits a fully prerendered site to `out/`,
  // deployable to any static host with no Node runtime.
  output: "export",

  images: {
    // Required by `output: "export"` — there is no server to optimise on.
    unoptimized: true,
    remotePatterns: [],
  },
};

export default nextConfig;

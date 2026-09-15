import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No `output: "export"`. Every route here is statically prerendered anyway
  // (see the build output — all routes are marked ○ Static), so the deployed
  // result is the same set of prebuilt pages. Letting the platform's own
  // Next.js builder handle it keeps image optimisation working and leaves the
  // door open to server features later; a static export closes both off and,
  // on Vercel, needs `framework: null` or the builder looks for a
  // routes-manifest.json that an export never emits.
  //
  // To go back to a portable, host-anywhere build: add `output: "export"`,
  // set `images.unoptimized: true`, and point the host at `out/`.

  images: {
    remotePatterns: [],
  },
};

export default nextConfig;

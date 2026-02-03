import type { NextConfig } from "next";
import { existsSync } from "fs";

import "./src/env";

// Detect if running in monorepo context (turbo.json exists at repo root)
const isMonorepo = existsSync("../../turbo.json");

const nextConfig: NextConfig = {
  compiler: {
    // Remove console.log in production, but keep console.error and console.warn
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  images: {
    remotePatterns: [
      {
        hostname: "arweave.net",
        protocol: "https",
      },
      {
        hostname: "**.ipfs.nftstorage.link",
        protocol: "https",
      },
      {
        hostname: "cloudflare-ipfs.com",
        protocol: "https",
      },
      {
        hostname: "ipfs.io",
        protocol: "https",
      },
      {
        hostname: "**.ipfs.dweb.link",
        protocol: "https",
      },
      {
        hostname: "crossmint.myfilebase.com",
        protocol: "https",
      },
      {
        hostname: "img.hi-hi.vip",
        protocol: "https",
      },
      {
        hostname: "**.myfilebase.com",
        protocol: "https",
      },
      {
        hostname: "picsum.photos",
        protocol: "https",
      },
    ],
  },
  // In monorepo: transpile workspace packages from source for live updates
  // In standalone: empty array, use pre-built packages from npm
  transpilePackages: isMonorepo
    ? [
        "@Bitforge-LLC/ui",
        "@Bitforge-LLC/crypto",
        "@Bitforge-LLC/auth",
        "@Bitforge-LLC/devtools",
        "@Bitforge-LLC/email",
        "@Bitforge-LLC/payment",
        "@Bitforge-LLC/services",
        "@Bitforge-LLC/testing",
      ]
    : [],
  webpack: (config, { dev }) => {
    // In monorepo dev mode: enable "development" condition to resolve to src/
    if (dev && isMonorepo) {
      config.resolve.conditionNames = [
        "development",
        "module",
        "import",
        "require",
        "default",
      ];
    }
    return config;
  },
  // Turbopack config (Next.js 16+ uses Turbopack by default)
  // Empty config silences the warning about webpack config without turbopack config
  // Turbopack should automatically respect the "development" export condition
  turbopack: {},
};

export default nextConfig;

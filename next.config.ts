import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const configDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    // Lock Turbopack resolution to the actual project directory.
    root: configDir,
  },
  experimental: {
    // Reduce the dev server's initial memory footprint on startup.
    preloadEntriesOnStart: false,
  },
};

export default nextConfig;

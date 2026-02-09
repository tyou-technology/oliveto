import { getCsp } from "./src/lib/config/csp.mjs";

const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Content-Security-Policy",
          value: getCsp(isDev),
        },
      ],
    },
  ],
};

export default nextConfig;

import { getCsp } from "./src/lib/config/csp.mjs";
import { getSecurityHeaders } from "./src/lib/config/security-headers.mjs";

const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(!isDev && { output: "export" }),
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
          value: getCsp(isDev, process.env.NEXT_PUBLIC_API_URL),
        },
        ...getSecurityHeaders(),
      ],
    },
  ],
};

export default nextConfig;

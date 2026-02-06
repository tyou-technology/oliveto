/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loaderFile: "./src/lib/image-loader.ts", // Ensure this path is correct
    unoptimized: true,
  },
};

export default nextConfig;

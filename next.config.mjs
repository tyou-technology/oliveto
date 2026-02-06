/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts", // Ensure this path is correct
  },
};

export default nextConfig;
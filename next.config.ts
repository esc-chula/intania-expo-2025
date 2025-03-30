import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "standalone",
  redirects: async () => [
    { source: "/workshops", destination: "/quest", permanent: true },
  ],
};

export default createMDX()(nextConfig);

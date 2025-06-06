import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "u9a6wmr3as.ufs.sh" }],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/fsw-donalds", // Altera para página inicial do restaurante
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

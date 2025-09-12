import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 빌드 시 ESLint 오류 무시
    ignoreDuringBuilds: true,
  },
  compilerOptions: {
    skipLibCheck: true,
    noEmitOnError: false,
  },
  typescript: {
    ignoreBuildErrors: true, // TS 오류 무시
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://34.158.210.111:4000/:path*",
      },
    ];
  },
};

export default nextConfig;

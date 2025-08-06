import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    domains: ['lpsjrlsmpkuvrzmqcnhp.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'lpsjrlsmpkuvrzmqcnhp.supabase.co',
        pathname: '/**'
      }
    ],
  },
};

export default nextConfig;

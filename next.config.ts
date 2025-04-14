import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'lh3.googleusercontent.com',
  //       port: '',
  //       pathname: '/account123/**',
  //       search: '',
  //     },
  //   ],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com'
      }
    ],
  }
};

export default nextConfig;

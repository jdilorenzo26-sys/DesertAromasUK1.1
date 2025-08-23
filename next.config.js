/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: { unoptimized: true }
};
module.exports = nextConfig;
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      // Supabase storage public URLs
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      // TikTok/CDN or any other domains you plan to use:
      // { protocol: "https", hostname: "cdn.yourdomain.com" },
    ],
  },
};

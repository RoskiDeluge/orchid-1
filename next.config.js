/** @type {import('next').NextConfig} */
// const nextConfig = {
//   // reactStrictMode: true,
//   images: {
//     domains: ['firebasestorage.googleapis.com'],
//   },
// };

// module.exports = nextConfig;

module.exports = {
  reactStrictMode: false,
  webpack: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

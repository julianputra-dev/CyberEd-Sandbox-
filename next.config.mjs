/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Static export is strictly active during production build ('npm run build')
  // In development ('next dev'), running without static export constraints ensures smooth HMR
  ...(isProd ? { output: 'export' } : {}),

  // Isolate development cache from production build artifacts to prevent chunk 404 desync
  distDir: isProd ? '.next' : '.next-dev',

  images: {
    unoptimized: true,
  },
};

export default nextConfig;

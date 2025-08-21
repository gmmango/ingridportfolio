import type { NextConfig } from 'next';

const repoName = 'ingridportfolio'; // Change to your GitHub repo name
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Skip ESLint errors during next build (CI)
  eslint: { ignoreDuringBuilds: true }, // official option
  // Skip TypeScript errors during next build (CI)
  typescript: { ignoreBuildErrors: true }, // official option
  basePath: isProd ? `/${repoName}` : '',
};

export default nextConfig;
import type { NextConfig } from 'next';

const repoName = 'my-portfolio'; // Change to your GitHub repo name
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  //trailingSlash: true, //ensures URLs work properly on GitHub Pages
  images: {
    unoptimized: true,
  },
  basePath: isProd ? `/${repoName}` : '',
};

export default nextConfig;
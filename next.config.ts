import type { NextConfig } from 'next';
const config: NextConfig = {
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  devIndicators: false,
  async redirects() {
    return [{ source: '/project/:slug', destination: '/projects/:slug', permanent: true }];
  },
};
export default config;
